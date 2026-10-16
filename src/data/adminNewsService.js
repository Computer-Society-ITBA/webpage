// Cliente del backoffice. Las credenciales llegan por parámetro y no se guardan en ningún lado.
export class AdminAuthError extends Error {}

// Basic en UTF-8: btoa solo acepta Latin-1, y una "ñ" en la contraseña lo rompería
function basicAuth({ username, password }) {
  const bytes = new TextEncoder().encode(`${username}:${password}`);
  return "Basic " + btoa(String.fromCharCode(...bytes));
}

// Un error que no es 401 trae el mensaje del servidor y su status. Un Blob (una imagen) se manda tal cual.
async function request(credentials, path, { method = "GET", body } = {}) {
  const isFile = body instanceof Blob;
  const res = await fetch(path, {
    method,
    headers: { Authorization: basicAuth(credentials), ...(body && { "Content-Type": isFile ? body.type : "application/json" }) },
    body: body && (isFile ? body : JSON.stringify(body)),
    credentials: "omit",
    cache: "no-store",
  });
  if (res.status === 401) throw new AdminAuthError();

  // Si /api/admin no llega a la función, el servidor contesta index.html con un 200
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : null;
  if (!data) throw new Error(`Respuesta inesperada (${res.status})`);
  if (!res.ok) throw Object.assign(new Error(data.message || `Error ${res.status}`), { status: res.status });
  return data;
}

export async function listAdminNews(credentials) {
  const { news } = await request(credentials, "/api/admin/news");
  if (!Array.isArray(news)) throw new Error("Respuesta inesperada");
  return news;
}

export async function getAdminNews(credentials, slug) {
  const { news } = await request(credentials, `/api/admin/news/${slug}`);
  if (!news || typeof news !== "object") throw new Error("Respuesta inesperada");
  return news;
}

export function createAdminNews(credentials, item) {
  return request(credentials, "/api/admin/news", { method: "POST", body: item });
}

export function updateAdminNews(credentials, slug, item) {
  return request(credentials, `/api/admin/news/${slug}`, { method: "PUT", body: item });
}

// Sube la imagen ya achicada y devuelve su URL de descarga
export async function uploadAdminNewsImage(credentials, slug, image) {
  const { url } = await request(credentials, `/api/admin/news/${slug}/image`, { method: "POST", body: image });
  if (typeof url !== "string") throw new Error("Respuesta inesperada");
  return url;
}
