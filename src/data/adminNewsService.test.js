import { test } from "node:test";
import assert from "node:assert/strict";
import { AdminAuthError, listAdminNews, updateAdminNews, uploadAdminNewsImage } from "./adminNewsService.js";

test("sin sesión no se envían lecturas, guardados ni fotos", async (t) => {
  const fetch = t.mock.method(globalThis, "fetch", () => { throw new Error("No debe enviarse el pedido"); });
  await assert.rejects(listAdminNews(null), AdminAuthError);
  await assert.rejects(updateAdminNews(null, "noticia", {}), AdminAuthError);
  await assert.rejects(uploadAdminNewsImage(null, "noticia", new Blob()), AdminAuthError);
  assert.equal(fetch.mock.callCount(), 0);
});

test("un 401 rechaza el guardado sin reintentarlo automáticamente", async (t) => {
  const fetch = t.mock.method(globalThis, "fetch", async () => new Response("", { status: 401 }));
  await assert.rejects(updateAdminNews({ username: "usuario", password: "anterior" }, "noticia", {}), AdminAuthError);
  assert.equal(fetch.mock.callCount(), 1);
});

test("al reintentar se usan las credenciales nuevas y el mismo contenido", async (t) => {
  const fetch = t.mock.method(globalThis, "fetch", async () => new Response('{"ok":true}', { headers: { "Content-Type": "application/json" } }));
  const item = { es: { body: ["Edición conservada", { h3: "Detalle" }] } };
  await updateAdminNews({ username: "usuario", password: "nueva-ñ" }, "noticia", item);
  const [path, options] = fetch.mock.calls[0].arguments;
  assert.equal(path, "/api/admin/news/noticia");
  assert.equal(options.headers.Authorization, "Basic " + Buffer.from("usuario:nueva-ñ").toString("base64"));
  assert.deepEqual(JSON.parse(options.body), item);
  assert.equal(options.credentials, "omit");
  assert.equal(options.cache, "no-store");
});
