import { createHash, timingSafeEqual } from "node:crypto";
import { onRequest } from "firebase-functions/https";
import { defineSecret } from "firebase-functions/params";
import { logger } from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const USERNAME = defineSecret("QUANTUMJAM_ADMIN_USERNAME");
const PASSWORD = defineSecret("QUANTUMJAM_ADMIN_PASSWORD");

initializeApp();
const db = getFirestore(); // base (default), donde están las noticias

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
      if (req.method === "GET" && req.path === "/api/admin/news") {
        const snapshot = await db.collection("news").get();
        res.json({ news: snapshot.docs.map((doc) => toModel(doc.data())) });
        return;
      }
      res.status(404).json({ error: "not-found" });
    } catch (error) {
      logger.error("csitbaAdminApi", error);
      res.status(500).json({ error: "internal" });
    }
  }
);
