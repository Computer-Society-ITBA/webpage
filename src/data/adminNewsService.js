// Cliente del backoffice. Las credenciales llegan por parámetro y no se guardan en ningún lado.
export class AdminAuthError extends Error {}

// Basic en UTF-8: btoa solo acepta Latin-1, y una "ñ" en la contraseña lo rompería
function basicAuth({ username, password }) {
  const bytes = new TextEncoder().encode(`${username}:${password}`);
  return "Basic " + btoa(String.fromCharCode(...bytes));
}

export async function listAdminNews(credentials) {
  const res = await fetch("/api/admin/news", {
    headers: { Authorization: basicAuth(credentials) },
    credentials: "omit",
    cache: "no-store",
  });
  if (res.status === 401) throw new AdminAuthError();

  // Si /api/admin no llega a la función, el servidor contesta index.html con un 200
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const body = isJson ? await res.json() : null;
  if (!res.ok || !Array.isArray(body?.news)) throw new Error(`Respuesta inesperada (${res.status})`);
  return body.news;
}
