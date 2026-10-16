import React, { useRef, useState } from "react";

import { AdminAuthError, listAdminNews } from "../../data/adminNewsService.js";

// Backoffice de noticias. Las credenciales viven solo en memoria: al recargar hay que volver a entrar.
function Admin() {
  const credentials = useRef(null);
  const [news, setNews] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const attempt = { username: form.get("username"), password: form.get("password") };
    setLoading(true);
    setError("");
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

  function logout() {
    credentials.current = null;
    setNews(null);
  }

  if (news) {
    return (
      <main className='mx-auto max-w-3xl p-6 text-left'>
        <div className='flex items-center justify-between gap-4'>
          <p>Sesión iniciada · {news.length} noticias</p>
          <button type='button' onClick={logout} className='rounded border border-black px-4 py-2'>
            Salir
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className='mx-auto max-w-sm p-6 text-left'>
      <h1 className='mb-6 text-2xl font-bold'>Backoffice de noticias</h1>
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
