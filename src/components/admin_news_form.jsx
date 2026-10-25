import React, { useEffect, useRef, useState } from "react";

import { AdminAuthError, createAdminNews, getAdminNews, updateAdminNews, uploadAdminNewsImage } from "../data/adminNewsService.js";
import { bodyToText, slugify, textToBody } from "../data/newsFormat.js";
import NewsArticle from "./news_article";

import { AdminHeader, BRANCHES, formatDate, newsImage, NewsStatus } from "./admin_news_ui";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Lock from "@mui/icons-material/Lock";
import Check from "@mui/icons-material/Check";
import CheckCircle from "@mui/icons-material/CheckCircle";
import RadioButtonUnchecked from "@mui/icons-material/RadioButtonUnchecked";
import "../styles/news-archive.css";
import i18n from "../i18n/index.js";
const LANGS = { es: "Español", en: "English" };
// Textos de cada idioma, en el orden del formulario. Con rows es un textarea.
const TEXT_FIELDS = [
  { key: "title", label: "Título", limit: 60 },
  { key: "summary", label: "Resumen", rows: 3, limit: 140 },
  { key: "lead", label: "Bajada", rows: 2, optional: true },
  { key: "body", label: "Cuerpo", rows: 9 },
  { key: "image_alt", label: "Texto alternativo de la imagen" },
  { key: "image_caption", label: "Epígrafe", optional: true },
];

const MAX_UPLOAD_BYTES = 30 * 1024 * 1024; // antes de achicar: lo que se sube pesa mucho menos
const MAX_IMAGE_WIDTH = 1600;

// Achica la foto antes de subirla: menos espacio en Storage y menos datos para cada visitante
async function shrinkImage(file) {
  const bitmap = await createImageBitmap(file); // respeta la orientación de las fotos del celular
  const scale = Math.min(1, MAX_IMAGE_WIDTH / bitmap.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const context = canvas.getContext("2d");
  context.fillStyle = "#fff"; // un PNG con transparencia no queda con fondo negro en JPG
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const toBlob = (type) => new Promise((resolve) => canvas.toBlob(resolve, type, 0.8));
  // Safari no sabe generar WebP: devuelve PNG, y en ese caso va JPG
  const webp = await toBlob("image/webp");
  return webp?.type === "image/webp" ? webp : toBlob("image/jpeg");
}

// Hoy en el formato del input date (YYYY-MM-DD), en hora local
function today() {
  const now = new Date();
  return [now.getFullYear(), now.getMonth() + 1, now.getDate()].map((n) => String(n).padStart(2, "0")).join("-");
}

// Noticia de Firestore → estado del formulario (todo texto)
function toForm(item = {}) {
  const texts = (lang) =>
    Object.fromEntries(
      TEXT_FIELDS.map(({ key }) => [key, key === "body" ? bodyToText(item[lang]?.body) : item[lang]?.[key] ?? ""])
    );
  return {
    date: item.date ? item.date.replaceAll("/", "-") : today(),
    branch: item.branch ?? "club",
    image: item.image ?? "",
    es: texts("es"),
    en: texts("en"),
  };
}

// Estado del formulario → noticia. Los textos vacíos los descarta la función.
function toItem(form, published) {
  const texts = (lang) =>
    Object.fromEntries(
      TEXT_FIELDS.map(({ key }) => {
        const value = form[lang][key].trim();
        return [key, key === "body" ? textToBody(value) : value];
      })
    );
  return { date: form.date.replaceAll("-", "/"), branch: form.branch, image: form.image, published, es: texts("es"), en: texts("en") };
}

// La noticia como la guarda la función, sin textos vacíos: así la vista previa es igual a la publicada
function asSaved(item) {
  const clean = (texts) => Object.fromEntries(Object.entries(texts).filter(([, value]) => value.length > 0));
  return { ...item, es: clean(item.es), en: clean(item.en) };
}

function confirmText(published, nextPublished) {
  if (nextPublished && published) return "La noticia está publicada: los cambios se van a ver en el sitio enseguida. ¿Guardar?";
  if (nextPublished) return "¿Publicar la noticia? Va a aparecer en el sitio.";
  if (published) return "¿Despublicar la noticia? Va a dejar de verse en el sitio.";
  return "";
}

function imageFilename(path) {
  try {
    return decodeURIComponent(path.split("?")[0]).split("/").pop();
  } catch {
    return path.split("/").pop();
  }
}

// Crear o editar una noticia. slug: null si es nueva.
function AdminNewsForm({ credentials, slug, onBack, onSessionClosed, onLogout }) {
  const [form, setForm] = useState(() => (slug ? null : toForm()));
  const [savedSlug, setSavedSlug] = useState(slug);
  const [published, setPublished] = useState(false);
  const [lang, setLang] = useState("es");
  const [previewMode, setPreviewMode] = useState("article");
  const [previewLang, setPreviewLang] = useState("es");
  const [imageInfo, setImageInfo] = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileInput = useRef(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null); // { text, error }
  const [loadError, setLoadError] = useState("");
  // El formulario tal como se guardó por última vez, para avisar si hay cambios sin guardar
  const saved = useRef(JSON.stringify(form));
  const dirty = !!form && JSON.stringify(form) !== saved.current;

  useEffect(() => {
    if (credentials) setMessage(null);
  }, [credentials]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  // Al volver a entrar, solo se recarga si todavía no había una edición abierta.
  useEffect(() => {
    if (!slug || form || !credentials) return;
    let cancelled = false;
    setLoadError("");
    getAdminNews(credentials, slug)
      .then((item) => {
        if (cancelled) return;
        const loaded = toForm(item);
        saved.current = JSON.stringify(loaded);
        setForm(loaded);
        setPublished(item.published === true);
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof AdminAuthError) {
          setLoadError("Volvé a ingresar para cargar la noticia.");
          onSessionClosed();
        } else setLoadError(err.status === 404 ? "La noticia no existe" : "No se pudo cargar la noticia");
      });
    return () => {
      cancelled = true;
    };
  }, [credentials, slug, form, onSessionClosed]);

  async function save(nextPublished) {
    const slugToSave = savedSlug || slugify(form.es.title);
    if (!slugToSave) {
      setMessage({ text: "Escribí el título en español para generar el slug", error: true });
      return;
    }
    const question = confirmText(published, nextPublished);
    if (question && !window.confirm(question)) return;

    setBusy(true);
    setMessage({ text: "Guardando…" });
    try {
      const item = toItem(form, nextPublished);
      if (savedSlug) await updateAdminNews(credentials, savedSlug, item);
      else await createAdminNews(credentials, { slug: slugToSave, ...item });
      saved.current = JSON.stringify(form);
      setSavedSlug(slugToSave);
      setPublished(nextPublished);
      setMessage({ text: nextPublished === published ? "Guardado" : nextPublished ? "Publicada" : "Despublicada" });
    } catch (err) {
      if (err instanceof AdminAuthError) {
        setMessage({ text: "No pudimos validar tu sesión. Tu edición se conserva; volvé a ingresar y reintentá guardar.", error: true });
        return onSessionClosed();
      }
      // 400, 404 y 409 traen un mensaje para mostrar; el resto es un problema de red o del servidor
      setMessage({ text: err.status < 500 ? err.message : "No se pudo guardar", error: true });
    } finally {
      setBusy(false);
    }
  }

  // La imagen se sube enseguida, pero queda en la noticia recién al guardar
  async function uploadImage(file) {
    const target = savedSlug || slugify(form.es.title); // antes del primer guardado, el slug que sale del título
    if (!file || busy || !target) return;
    if (!file.type.startsWith("image/") || file.size > MAX_UPLOAD_BYTES) {
      setMessage({ text: "Elegí una imagen de hasta 30 MB", error: true });
      return;
    }
    setBusy(true);
    setMessage({ text: "Subiendo imagen…" });
    try {
      const compressed = await shrinkImage(file);
      const url = await uploadAdminNewsImage(credentials, target, compressed);
      setImageInfo({ name: file.name, size: compressed.size });
      setForm((current) => ({ ...current, image: url })); // sin pisar lo que se escribió mientras subía
      setMessage({ text: "Imagen subida: guardá para que quede en la noticia" });
    } catch (err) {
      if (err instanceof AdminAuthError) {
        setMessage({ text: "No pudimos validar tu sesión. Tu edición se conserva; volvé a ingresar y elegí la imagen de nuevo.", error: true });
        return onSessionClosed();
      }
      setMessage({ text: err.status < 500 ? err.message : "No se pudo subir la imagen", error: true });
    } finally {
      setBusy(false);
    }
  }

  function leave(action) {
    if (busy || (dirty && !window.confirm("Hay cambios sin guardar. ¿Salir igual?"))) return;
    action();
  }

  const backButton = (
    <button type='button' onClick={() => leave(onBack)} disabled={busy} className='cs-admin-back'>
      <ArrowBack fontSize='small' /> Noticias
    </button>
  );

  if (!form) {
    return (
      <div className='cs-admin'>
        <AdminHeader onLogout={onLogout} />
        <main className='cs-admin-loading'>
          {backButton}
          <p role={loadError ? "alert" : "status"}>{loadError || "Cargando noticia…"}</p>
          {loadError && <button type='button' className='cs-admin-button' onClick={onBack}>Volver al listado</button>}
        </main>
      </div>
    );
  }

  const setText = (key, value) => setForm({ ...form, [lang]: { ...form[lang], [key]: value } });
  const complete = (language) => !!(form[language].title.trim() && form[language].summary.trim());
  const image = newsImage(form.image);
  const imageName = imageInfo?.name || imageFilename(form.image);
  const uploadSlug = savedSlug || slugify(form.es.title);
  const address = `/news/${uploadSlug || "…"}`;
  const previewItem = asSaved(toItem(form, published));
  const previewText = previewItem[previewLang];

  return (
    <div className='cs-admin cs-admin--editor'>
      <AdminHeader onLogout={() => leave(onLogout)} busy={busy} />
      <main className='cs-admin-editor'>
        <section className='cs-admin-form' aria-labelledby='admin-form-title'>
          {backButton}
          <h1 id='admin-form-title'>{savedSlug ? "Editar noticia" : "Nueva noticia"}</h1>
          <fieldset className='cs-admin-branches'>
            <legend>Rama</legend>
            <div>
              {Object.entries(BRANCHES).map(([value, label]) => (
                <label key={value} className={`cs-admin-branch-choice cs-branch--${value}`}>
                  <input type='radio' name='branch' value={value} checked={form.branch === value} onChange={() => setForm({ ...form, branch: value })} />
                  <span>{label}</span>
                  {form.branch === value ? <CheckCircle fontSize='small' /> : <RadioButtonUnchecked fontSize='small' />}
                </label>
              ))}
            </div>
          </fieldset>

          <div className='cs-admin-form__metadata'>
            <label className='cs-admin-field'>
              <span>Fecha</span>
              <input type='date' value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} />
            </label>
            <div className='cs-admin-field cs-admin-address'>
              <span>Dirección</span>
              <div title={address}><Lock fontSize='small' /><code>{address}</code></div>
              <p>{savedSlug ? "Queda fija desde que se creó la noticia, para no romper enlaces." : "Sale del título en español y queda fija al guardar el borrador."}</p>
            </div>
          </div>

          <div className='cs-admin-upload'>
            <span className='cs-admin-label'>Imagen</span>
            <div className={`cs-admin-upload__drop ${dragging ? "is-dragging" : ""}`}
              onDragOver={(event) => { event.preventDefault(); if (uploadSlug && !busy) setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(event) => { event.preventDefault(); setDragging(false); uploadImage(event.dataTransfer.files[0]); }}
            >
              {image ? (
                <div className='cs-admin-upload__file'>
                  <img key={image} src={image} alt='Imagen seleccionada' onLoad={(event) => {
                    const { naturalWidth: width, naturalHeight: height, src } = event.currentTarget;
                    const size = performance.getEntriesByName(src).at(-1)?.encodedBodySize;
                    setImageInfo((current) => ({ ...current, width, height, size: current?.size || size }));
                  }} />
                  <div><strong>{imageName}</strong>{imageInfo?.width && <p>{imageInfo.width} × {imageInfo.height} px{imageInfo.size ? ` · ${Math.round(imageInfo.size / 1024)} KB` : ""}</p>}</div>
                </div>
              ) : <p className='cs-admin-upload__empty'>Arrastrá una foto acá</p>}
              <input ref={fileInput} type='file' accept='image/*' hidden disabled={busy || !uploadSlug} aria-label='Elegir imagen' aria-describedby='image-help'
                onChange={(event) => { uploadImage(event.target.files[0]); event.target.value = ""; }} />
              <button type='button' className='cs-admin-button' onClick={() => fileInput.current.click()} disabled={busy || !uploadSlug}>{image ? "Reemplazar" : "Elegir archivo"}</button>
            </div>
            <p id='image-help' className='cs-admin-help'>{uploadSlug ? "Arrastrá otra foto o elegí un archivo. JPG, PNG o WebP de hasta 30 MB." : "Escribí el título en español para poder subir una imagen."}</p>
          </div>

          <div className='cs-admin-segments cs-admin-language' role='group' aria-label='Idioma del formulario'>
            {Object.entries(LANGS).map(([value, label]) => (
              <button key={value} type='button' aria-pressed={lang === value} onClick={() => setLang(value)}>
                {label}<span>{complete(value) ? <><Check fontSize='inherit' /> completo</> : "incompleto"}</span>
              </button>
            ))}
          </div>
          <div className='cs-admin-form__texts' key={lang}>
            {TEXT_FIELDS.map(({ key, label, rows, limit, optional }) => (
              <div key={key} className='cs-admin-field'>
                <label htmlFor={`admin-${key}`} className='cs-admin-field__label'>
                  <span>{label}{optional && <span className='cs-admin-optional'> · opcional</span>}</span>
                  {limit && <span className={`cs-admin-counter ${form[lang][key].length > limit ? "is-over" : ""}`}>{form[lang][key].length} / {limit}</span>}
                </label>
                {rows ? <textarea id={`admin-${key}`} rows={rows} value={form[lang][key]} onChange={(event) => setText(key, event.target.value)}
                  placeholder={key === "lead" ? "Si la dejás vacía, la nota muestra el resumen." : undefined} aria-describedby={key === "body" ? "body-help" : undefined} />
                  : <input id={`admin-${key}`} value={form[lang][key]} onChange={(event) => setText(key, event.target.value)} aria-describedby={key === "image_alt" ? "alt-help" : undefined} />}
                {key === "body" && <p id='body-help' className='cs-admin-format-help'>
                  <strong>Formato:</strong> <code>## Subtítulo</code> <code>### Sección</code> <code>**negrita**</code> <code>*cursiva*</code><br />
                  <code>[texto](https://…)</code> <code>- lista</code> <span>Línea en blanco entre párrafos.</span>
                </p>}
                {key === "image_alt" && <p id='alt-help' className='cs-admin-help'>Describí la escena para quien no la ve.</p>}
              </div>
            ))}
          </div>
        </section>

        <aside className='cs-admin-preview' aria-labelledby='admin-preview-title'>
          <div className='cs-admin-preview__toolbar'>
            <h2 id='admin-preview-title'>Vista previa</h2>
            <div className='cs-admin-segments' role='group' aria-label='Formato de vista previa'>
              {[["article", "Nota"], ["archive", "Tarjeta en /news"]].map(([value, label]) => (
                <button key={value} type='button' aria-pressed={previewMode === value} onClick={() => setPreviewMode(value)}>{label}</button>
              ))}
            </div>
            <div className='cs-admin-segments' role='group' aria-label='Idioma de la vista previa'>
              {["es", "en"].map((value) => <button key={value} type='button' aria-pressed={previewLang === value} onClick={() => setPreviewLang(value)}>{value.toUpperCase()}</button>)}
            </div>
          </div>
          <p className='cs-admin-preview__help'>Muestra lo que está en el formulario, aunque todavía no lo hayas guardado.</p>
          <div className='cs-admin-preview__stage' tabIndex={0} role='region' aria-label='Contenido de la vista previa'>
            {previewMode === "article" && <article className='cs-article'><NewsArticle item={previewItem} language={previewLang} /></article>}
            {previewMode === "archive" && <ul className='cs-news-archive cs-admin-preview__archive'>
              <li className='cs-news-archive__card' data-branch={form.branch}>
                {image && <figure className='cs-news-archive__photo'><img src={image} alt={previewText.image_alt || ""} /></figure>}
                <div className='cs-news-archive__text'>
                  <p className='cs-news-archive__meta'><span>{i18n.t(`branch.${form.branch}`, { lng: previewLang })}</span><time dateTime={form.date}>{formatDate(previewItem.date, previewLang)}</time></p>
                  <h3 className='cs-news-archive__title'>{previewText.title}</h3>
                  <p className='cs-news-archive__summary'>{previewText.summary}</p>
                </div>
              </li>
            </ul>}
          </div>
        </aside>
      </main>
      <footer className='cs-admin-savebar'>
        <div className='cs-admin-savebar__state'>
          <NewsStatus published={published} />
          <span className='cs-admin-dirty'>{dirty ? "Cambios sin guardar" : "Sin cambios pendientes"}</span>
          <span className='cs-admin-savebar__hint'>{published ? "Al guardar se actualiza en el sitio." : "El borrador no se muestra en el sitio."}</span>
        </div>
        {message && <p role={message.error ? "alert" : "status"} className={`cs-admin-savebar__message ${message.error ? "is-error" : ""}`}>{message.text}</p>}
        <div className='cs-admin-savebar__actions'>
          {published && <button type='button' className='cs-admin-button' disabled={busy} onClick={() => save(false)}>Despublicar</button>}
          <button type='button' className={`cs-admin-button ${published ? "cs-admin-button--primary" : ""}`} disabled={busy} onClick={() => save(published)}>{busy ? "Guardando…" : published ? "Guardar cambios" : "Guardar borrador"}</button>
          {!published && <button type='button' className='cs-admin-button cs-admin-button--primary' disabled={busy} onClick={() => save(true)}>Publicar</button>}
        </div>
      </footer>
    </div>
  );
}

export default AdminNewsForm;
