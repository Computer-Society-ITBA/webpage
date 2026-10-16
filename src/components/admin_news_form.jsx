import React, { useEffect, useRef, useState } from "react";

import { AdminAuthError, createAdminNews, getAdminNews, updateAdminNews, uploadAdminNewsImage } from "../data/adminNewsService.js";
import { bodyToText, slugify, textToBody } from "../data/newsFormat.js";

const BRANCHES = { club: "Computer Society", hackit: "hackITBA", quantum: "Quantum Jam", gamejam: "Game Jam" };
const LANGS = { es: "Español", en: "English" };
// Textos de cada idioma, en el orden del formulario. Con rows es un textarea.
const TEXT_FIELDS = [
  { key: "title", label: "Título" },
  { key: "summary", label: "Resumen", rows: 2 },
  { key: "lead", label: "Bajada", rows: 2 },
  { key: "body", label: "Cuerpo", rows: 14 },
  { key: "image_alt", label: "Texto alternativo de la imagen" },
  { key: "image_caption", label: "Epígrafe de la imagen" },
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

function confirmText(published, nextPublished) {
  if (nextPublished && published) return "La noticia está publicada: los cambios se van a ver en el sitio enseguida. ¿Guardar?";
  if (nextPublished) return "¿Publicar la noticia? Va a aparecer en el sitio.";
  if (published) return "¿Despublicar la noticia? Va a dejar de verse en el sitio.";
  return "";
}

// Crear o editar una noticia. slug: null si es nueva.
function AdminNewsForm({ credentials, slug, onBack, onSessionClosed }) {
  const [form, setForm] = useState(() => (slug ? null : toForm()));
  const [savedSlug, setSavedSlug] = useState(slug);
  const [published, setPublished] = useState(false);
  const [lang, setLang] = useState("es");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null); // { text, error }
  const [loadError, setLoadError] = useState("");
  // El formulario tal como se guardó por última vez, para avisar si hay cambios sin guardar
  const saved = useRef(JSON.stringify(form));

  // Se carga una sola vez: el slug no cambia mientras el formulario está abierto
  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
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
        if (err instanceof AdminAuthError) onSessionClosed();
        else setLoadError(err.status === 404 ? "La noticia no existe" : "No se pudo cargar la noticia");
      });
    return () => {
      cancelled = true;
    };
  }, []);

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
      if (err instanceof AdminAuthError) return onSessionClosed();
      // 400, 404 y 409 traen un mensaje para mostrar; el resto es un problema de red o del servidor
      setMessage({ text: err.status < 500 ? err.message : "No se pudo guardar", error: true });
    } finally {
      setBusy(false);
    }
  }

  // La imagen se sube enseguida, pero queda en la noticia recién al guardar
  async function uploadImage(event) {
    const file = event.target.files[0];
    event.target.value = ""; // para poder volver a elegir el mismo archivo
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > MAX_UPLOAD_BYTES) {
      setMessage({ text: "Elegí una imagen de hasta 30 MB", error: true });
      return;
    }
    setBusy(true);
    setMessage({ text: "Subiendo imagen…" });
    try {
      const url = await uploadAdminNewsImage(credentials, savedSlug, await shrinkImage(file));
      setForm((current) => ({ ...current, image: url })); // sin pisar lo que se escribió mientras subía
      setMessage({ text: "Imagen subida: guardá para que quede en la noticia" });
    } catch (err) {
      if (err instanceof AdminAuthError) return onSessionClosed();
      setMessage({ text: err.status < 500 ? err.message : "No se pudo subir la imagen", error: true });
    } finally {
      setBusy(false);
    }
  }

  function back() {
    if (form && JSON.stringify(form) !== saved.current && !window.confirm("Hay cambios sin guardar. ¿Salir igual?")) return;
    onBack();
  }

  const backButton = (
    <button type='button' onClick={back} disabled={busy} className='rounded border border-black px-4 py-2 disabled:opacity-50'>
      Volver al listado
    </button>
  );

  if (!form) {
    return (
      <main className='mx-auto max-w-3xl p-6 text-left'>
        {loadError ? (
          <p role='alert' className='mb-4 text-red-700'>
            {loadError}
          </p>
        ) : (
          <p className='mb-4'>Cargando…</p>
        )}
        {backButton}
      </main>
    );
  }

  const setText = (key, value) => setForm({ ...form, [lang]: { ...form[lang], [key]: value } });
  const inputClass = "rounded border border-gray-400 px-3 py-2";

  return (
    <main className='mx-auto max-w-3xl p-6 text-left'>
      <div className='mb-2 flex flex-wrap items-center justify-between gap-4'>
        <h1 className='text-2xl font-bold'>{savedSlug ? "Editar noticia" : "Nueva noticia"}</h1>
        {backButton}
      </div>
      <p className='mb-6 break-all text-sm'>
        {published ? "Publicada" : "Borrador"} · Slug: <code>{savedSlug || slugify(form.es.title) || "—"}</code>
        {!savedSlug && " (sale del título en español y queda fijo al guardar)"}
      </p>

      <div className='mb-6 flex flex-wrap gap-4'>
        <label className='flex flex-col gap-1'>
          Rama
          <select value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })} className={inputClass}>
            {Object.entries(BRANCHES).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className='flex flex-col gap-1'>
          Fecha
          <input type='date' value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputClass} />
        </label>
      </div>

      <div className='mb-6 flex flex-col gap-2'>
        <label className='flex flex-col gap-1'>
          Imagen
          <input type='file' accept='image/*' onChange={uploadImage} disabled={busy || !savedSlug} aria-describedby='image-help' />
        </label>
        <p id='image-help' className='text-sm text-gray-600'>
          {savedSlug
            ? "Una foto de hasta 30 MB. Se achica a 1600 px de ancho antes de subirla."
            : "Guardá el borrador para poder subir una imagen."}
        </p>
        {form.image.startsWith("http") ? (
          <img src={form.image} alt='Vista previa de la imagen' className='max-h-48 max-w-full self-start rounded border border-gray-400' />
        ) : (
          form.image && (
            <p className='text-sm'>
              Imagen actual: <code>{form.image}</code>
            </p>
          )
        )}
      </div>

      <div role='group' aria-label='Idioma' className='mb-4 flex gap-2'>
        {Object.entries(LANGS).map(([value, label]) => (
          <button
            key={value}
            type='button'
            aria-pressed={lang === value}
            onClick={() => setLang(value)}
            className={`rounded border border-black px-4 py-2 ${lang === value ? "bg-black text-white" : ""}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className='flex flex-col gap-4'>
        {TEXT_FIELDS.map(({ key, label, rows }) => (
          <React.Fragment key={key}>
            <label className='flex flex-col gap-1'>
              {label} ({lang.toUpperCase()})
              {rows ? (
                <textarea
                  rows={rows}
                  value={form[lang][key]}
                  onChange={(e) => setText(key, e.target.value)}
                  aria-describedby={key === "body" ? "body-help" : undefined}
                  className={`${inputClass} ${key === "body" ? "font-mono text-sm" : ""}`}
                />
              ) : (
                <input value={form[lang][key]} onChange={(e) => setText(key, e.target.value)} className={inputClass} />
              )}
            </label>
            {key === "body" && (
              <p id='body-help' className='-mt-3 text-sm text-gray-600'>
                Párrafos separados por una línea en blanco. <code>## Subtítulo</code>, <code>**negrita**</code>,{" "}
                <code>*cursiva*</code>, <code>[link](https://...)</code> y listas con <code>- </code>.
              </p>
            )}
          </React.Fragment>
        ))}
      </div>

      {message && (
        <p role={message.error ? "alert" : "status"} className={`mt-6 ${message.error ? "text-red-700" : ""}`}>
          {message.text}
        </p>
      )}

      <div className='mt-6 flex flex-wrap gap-2'>
        <button
          type='button'
          onClick={() => save(published)}
          disabled={busy}
          className='rounded border border-black px-4 py-2 disabled:opacity-50'
        >
          {published ? "Guardar cambios" : "Guardar borrador"}
        </button>
        <button
          type='button'
          onClick={() => save(!published)}
          disabled={busy}
          className='rounded bg-black px-4 py-2 text-white disabled:opacity-50'
        >
          {published ? "Despublicar" : "Publicar"}
        </button>
      </div>
    </main>
  );
}

export default AdminNewsForm;
