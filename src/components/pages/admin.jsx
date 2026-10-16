import React, { useRef, useState } from "react";

import { AdminAuthError, listAdminNews } from "../../data/adminNewsService.js";

const SESSION_CLOSED = "Tu sesión se cerró: el usuario o la contraseña ya no son válidos. Volvé a entrar.";

// "2026/10/06" → "6 oct 2026"; una fecha con otro formato se muestra tal cual
function formatDate(date) {
  if (!/^\d{4}\/\d{2}\/\d{2}$/.test(date || "")) return date || "—";
  const [year, month, day] = date.split("/").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" });
}

// Backoffice de noticias. Las credenciales viven solo en memoria: al recargar hay que volver a entrar.
function Admin() {
  const credentials = useRef(null);
  const [news, setNews] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const attempt = { username: form.get("username"), password: form.get("password") };
    setLoading(true);
    setError("");
    setNotice("");
    try {
      const items = await listAdminNews(attempt);
      credentials.current = attempt;
      setNews(items);
    } catch (err) {
      setError(err instanceof AdminAuthError ? "Usuario o contraseña incorrectos" : "No se pudo conectar");
    } finally {
      setLoading(false);
    }
  }

  async function refresh() {
    // Si salís mientras carga, la respuesta que llega después se descarta
    const session = credentials.current;
    setLoading(true);
    setError("");
    try {
      const items = await listAdminNews(session);
      if (credentials.current === session) setNews(items);
    } catch (err) {
      if (credentials.current !== session) return;
      if (err instanceof AdminAuthError) logout(SESSION_CLOSED);
      else setError("No se pudo cargar la lista");
    } finally {
      if (credentials.current === session) setLoading(false);
    }
  }

  function logout(message = "") {
    credentials.current = null;
    setNews(null);
    setError("");
    setNotice(message);
    setLoading(false);
  }

  if (news) {
    // Las fechas YYYY/MM/DD se ordenan bien como texto
    const sorted = [...news].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    return (
      <main className='mx-auto max-w-4xl p-6 text-left'>
        <div className='mb-6 flex flex-wrap items-center justify-between gap-4'>
          <h1 className='text-2xl font-bold'>Noticias</h1>
          <div className='flex flex-wrap gap-2'>
            <button type='button' disabled title='Próximamente' className='rounded bg-black px-4 py-2 text-white disabled:opacity-50'>
              Nueva noticia
            </button>
            <button type='button' onClick={refresh} disabled={loading} className='rounded border border-black px-4 py-2 disabled:opacity-50'>
              {loading ? "Actualizando…" : "Actualizar"}
            </button>
            <button type='button' onClick={() => logout()} className='rounded border border-black px-4 py-2'>
              Salir
            </button>
          </div>
        </div>

        {error && (
          <p role='alert' className='mb-4 text-red-700'>
            {error}
          </p>
        )}

        {sorted.length === 0 ? (
          <p>Todavía no hay noticias.</p>
        ) : (
          // En celular cada fila se apila como tarjeta; desde 640px (sm) es una tabla común
          <table className='block w-full border-collapse sm:table' aria-busy={loading}>
            <thead className='hidden sm:table-header-group'>
              <tr className='border-b border-black text-left'>
                <th scope='col' className='py-2 pr-4'>Título</th>
                <th scope='col' className='py-2 pr-4'>Fecha</th>
                <th scope='col' className='py-2 pr-4'>Estado</th>
                <th scope='col' className='py-2'>
                  <span className='sr-only'>Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className='block sm:table-row-group'>
              {sorted.map((item) => (
                <tr key={item.slug} className='block border-b border-gray-300 py-3 sm:table-row sm:py-0'>
                  <td className='block font-bold sm:table-cell sm:py-2 sm:pr-4 sm:font-normal'>{item.es?.title || item.slug}</td>
                  <td className='mr-3 inline-block sm:table-cell sm:whitespace-nowrap sm:py-2 sm:pr-4'>{formatDate(item.date)}</td>
                  <td className='inline-block sm:table-cell sm:py-2 sm:pr-4'>{item.published ? "Publicada" : "Borrador"}</td>
                  <td className='mt-2 block sm:mt-0 sm:table-cell sm:py-2 sm:text-right'>
                    <button type='button' disabled title='Próximamente' className='rounded border border-black px-3 py-1 disabled:opacity-50'>
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    );
  }

  return (
    <main className='mx-auto max-w-sm p-6 text-left'>
      <h1 className='mb-6 text-2xl font-bold'>Backoffice de noticias</h1>
      {notice && (
        <p role='status' className='mb-4 text-amber-800'>
          {notice}
        </p>
      )}
      <form onSubmit={login} className='flex flex-col gap-4'>
        <label className='flex flex-col gap-1'>
          Usuario
          <input name='username' autoComplete='username' required className='rounded border border-gray-400 px-3 py-2' />
        </label>
        <label className='flex flex-col gap-1'>
          Contraseña
          <input
            name='password'
            type='password'
            autoComplete='current-password'
            required
            className='rounded border border-gray-400 px-3 py-2'
          />
        </label>
        {error && (
          <p role='alert' className='text-red-700'>
            {error}
          </p>
        )}
        <button type='submit' disabled={loading} className='rounded bg-black px-4 py-2 text-white disabled:opacity-50'>
          {loading ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </main>
  );
}

export default Admin;
