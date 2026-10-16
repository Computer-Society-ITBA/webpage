import { createHash, randomUUID, timingSafeEqual } from "node:crypto";
import { onRequest } from "firebase-functions/https";
import { defineSecret } from "firebase-functions/params";
import { logger } from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { getDownloadURL, getStorage } from "firebase-admin/storage";

// En el emulador, si falta el de Firestore o el de Storage, el Admin SDK escribiría en producción
if (process.env.FUNCTIONS_EMULATOR === "true" && !(process.env.FIRESTORE_EMULATOR_HOST && process.env.FIREBASE_STORAGE_EMULATOR_HOST)) {
  throw new Error("Faltan emuladores: levantá Firestore, Storage y Functions juntos");
}

const USERNAME = defineSecret("QUANTUMJAM_ADMIN_USERNAME");
const PASSWORD = defineSecret("QUANTUMJAM_ADMIN_PASSWORD");

initializeApp();
const db = getFirestore(); // base (default), donde están las noticias
const bucket = getStorage().bucket("webpage-36e40.appspot.com"); // compartido con otros sitios: solo se escribe en news_cs/

const IMAGE_EXTENSIONS = { "image/jpeg": "jpg", "image/webp": "webp" };
const MAX_IMAGE_BYTES = 2 * 1024 * 1024; // llega achicada en el navegador: una foto de 1600 px pesa bastante menos

// Los primeros bytes tienen que ser los del formato que dice el Content-Type
function isImage(data, type) {
  if (!Buffer.isBuffer(data)) return false;
  if (type === "image/jpeg") return data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff;
  return data.toString("latin1", 0, 4) === "RIFF" && data.toString("latin1", 8, 12) === "WEBP";
}

// Campos del modelo de una noticia: lo demás no sale de la función
const FIELDS = ["slug", "date", "branch", "published", "image", "es", "en"];
const TEXT_FIELDS = ["title", "summary", "lead", "body", "image_alt", "image_caption"];

function pick(object, keys) {
  return Object.fromEntries(keys.filter((key) => object?.[key] !== undefined).map((key) => [key, object[key]]));
}

function toModel(data) {
  const item = pick(data, FIELDS);
  for (const lang of ["es", "en"]) if (item[lang]) item[lang] = pick(item[lang], TEXT_FIELDS);
  return item;
}

const BRANCHES = ["club", "hackit", "quantum", "gamejam"];
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const isObject = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
const isHeading = (block) => isObject(block) && Object.keys(block).length === 1 && (typeof block.h2 === "string" || typeof block.h3 === "string");
// Los textos vacíos no se guardan: las noticias que ya existen no tienen campos vacíos
const isEmpty = (value) => value === undefined || value === "" || (Array.isArray(value) && value.length === 0);
const withoutEmpty = (object = {}) => Object.fromEntries(Object.entries(object).filter(([, value]) => !isEmpty(value)));

// Primer problema del pedido, en español, o "" si está bien. slug: el de la URL (PUT) o undefined (POST)
function validate(item, slug) {
  if (!isObject(item)) return "El pedido tiene que ser un objeto JSON";
  const extra = Object.keys(item).filter((key) => !FIELDS.includes(key));
  if (extra.length) return `Campos no permitidos: ${extra.join(", ")}`;
  if (!slug && !(typeof item.slug === "string" && SLUG.test(item.slug))) return "El slug solo puede tener minúsculas, números y guiones";
  if (slug && item.slug !== undefined && item.slug !== slug) return "El slug no se puede cambiar";
  if (typeof item.date !== "string" || !/^\d{4}\/\d{2}\/\d{2}$/.test(item.date)) return "La fecha tiene que tener el formato AAAA/MM/DD";
  if (!BRANCHES.includes(item.branch)) return `La rama tiene que ser una de: ${BRANCHES.join(", ")}`;
  if (typeof item.published !== "boolean") return "published tiene que ser true o false";
  if (item.image !== undefined && typeof item.image !== "string") return "image tiene que ser un texto";

  for (const lang of ["es", "en"]) {
    const text = item[lang] ?? {};
    if (!isObject(text)) return `${lang} tiene que ser un objeto`;
    const extraText = Object.keys(text).filter((key) => !TEXT_FIELDS.includes(key));
    if (extraText.length) return `Campos no permitidos en ${lang}: ${extraText.join(", ")}`;
    for (const key of TEXT_FIELDS) {
      const value = text[key];
      const valid =
        value === undefined ||
        (key === "body"
          ? Array.isArray(value) && value.every((block) => typeof block === "string" || isHeading(block))
          : typeof value === "string");
      if (!valid) return `${lang}.${key} tiene un formato inválido`;
    }
    if (item.published && !(text.title?.trim() && text.summary?.trim())) {
      return `Para publicar hacen falta el título y el resumen en ${lang.toUpperCase()}`;
    }
  }
  return "";
}

// PUT: reemplaza los campos del modelo (un texto vacío o ausente se borra) y no toca los que el modelo no conoce
function toChanges(item) {
  const changes = { date: item.date, branch: item.branch, published: item.published };
  if (item.image !== undefined) changes.image = isEmpty(item.image) ? FieldValue.delete() : item.image;
  for (const lang of ["es", "en"]) {
    for (const key of TEXT_FIELDS) {
      const value = item[lang]?.[key];
      changes[`${lang}.${key}`] = isEmpty(value) ? FieldValue.delete() : value;
    }
  }
  return changes;
}

// sha256 de los dos lados: mismo largo para timingSafeEqual, sin revelar el largo real
function sameText(a, b) {
  const hash = (text) => createHash("sha256").update(text).digest();
  return timingSafeEqual(hash(a), hash(b));
}

function isAuthorized(header = "") {
  const [scheme, encoded = ""] = header.split(" ");
  const decoded = Buffer.from(encoded, "base64").toString("utf8");
  const separator = decoded.indexOf(":");
  const username = separator === -1 ? "" : decoded.slice(0, separator);
  const password = separator === -1 ? "" : decoded.slice(separator + 1);
  // Las dos comparaciones corren siempre, para no delatar cuál falló
  const usernameOk = sameText(username, USERNAME.value());
  const passwordOk = sameText(password, PASSWORD.value());
  return scheme === "Basic" && separator !== -1 && usernameOk && passwordOk;
}

export const csitbaAdminApi = onRequest(
  // maxInstances: tope de copias en paralelo; frena intentos masivos de contraseña y el costo
  { region: "southamerica-east1", secrets: [USERNAME, PASSWORD], maxInstances: 2 },
  async (req, res) => {
    res.set("Cache-Control", "private, no-store");

    if (!USERNAME.value() || !PASSWORD.value()) {
      res.status(500).json({ error: "not-configured" });
      return;
    }
    // Sin header WWW-Authenticate: si no, el navegador abre su propia ventana de login
    if (!isAuthorized(req.get("Authorization"))) {
      res.status(401).json({ error: "unauthorized" });
      return;
    }

    try {
      // /api/admin/news/<slug>/image: el archivo llega crudo, con el Content-Type de la imagen
      const upload = req.path.match(/^\/api\/admin\/news\/([a-z0-9-]+)\/image$/);
      if (upload && req.method === "POST") {
        const type = req.get("Content-Type");
        if (!IMAGE_EXTENSIONS[type] || !isImage(req.rawBody, type)) {
          res.status(400).json({ error: "invalid", message: "La imagen tiene que ser JPG o WebP" });
          return;
        }
        if (req.rawBody.length > MAX_IMAGE_BYTES) {
          res.status(400).json({ error: "invalid", message: "La imagen pesa más de 2 MB" });
          return;
        }
        // La noticia puede no existir todavía: la foto se sube antes del primer guardado.
        // Nunca se pisa ni se borra: cada subida es un archivo nuevo
        const file = bucket.file(`news_cs/${upload[1]}/${Date.now()}.${IMAGE_EXTENSIONS[type]}`);
        await file.save(req.rawBody, {
          contentType: type,
          metadata: {
            cacheControl: "public, max-age=31536000",
            // getDownloadURL no crea el token: lo lee de acá
            metadata: { firebaseStorageDownloadTokens: randomUUID() },
          },
        });
        res.status(201).json({ url: await getDownloadURL(file) });
        return;
      }

      // /api/admin/news o /api/admin/news/<slug>
      const route = req.path.match(/^\/api\/admin\/news(?:\/([a-z0-9-]+))?$/);
      const slug = route?.[1];

      if (route && !slug && req.method === "GET") {
        const snapshot = await db.collection("news").get();
        res.json({ news: snapshot.docs.map((doc) => toModel(doc.data())) });
        return;
      }
      if (route && slug && req.method === "GET") {
        const doc = await db.collection("news").doc(slug).get();
        if (doc.exists) res.json({ news: toModel(doc.data()) });
        else res.status(404).json({ error: "not-found", message: "La noticia no existe" });
        return;
      }
      if (route && ((!slug && req.method === "POST") || (slug && req.method === "PUT"))) {
        const message = validate(req.body, slug);
        if (message) {
          res.status(400).json({ error: "invalid", message });
          return;
        }
        const item = req.body;
        // create() falla si el slug ya existe y update() si no existe: ver el catch
        if (slug) {
          await db.collection("news").doc(slug).update(toChanges(item));
        } else {
          const doc = { ...withoutEmpty(item), es: withoutEmpty(item.es), en: withoutEmpty(item.en) };
          await db.collection("news").doc(item.slug).create(doc);
        }
        res.status(slug ? 200 : 201).json({ ok: true });
        return;
      }
      res.status(404).json({ error: "not-found" });
    } catch (error) {
      // Códigos de Firestore: 6 = ALREADY_EXISTS (create), 5 = NOT_FOUND (update)
      if (error.code === 6) {
        res.status(409).json({ error: "already-exists", message: "Ya existe una noticia con ese slug: cambiá el título" });
        return;
      }
      if (error.code === 5) {
        res.status(404).json({ error: "not-found", message: "La noticia no existe" });
        return;
      }
      logger.error("csitbaAdminApi", error);
      res.status(500).json({ error: "internal" });
    }
  }
);
