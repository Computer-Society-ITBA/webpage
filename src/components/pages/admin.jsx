import React, { useEffect, useRef, useState } from "react";

import { AdminAuthError, listAdminNews } from "../../data/adminNewsService.js";
import AdminNewsForm from "../admin_news_form";
import { AdminHeader, BRANCHES, formatDate, newsImage, NewsStatus } from "../admin_news_ui";
import Add from "@mui/icons-material/Add";
import Search from "@mui/icons-material/Search";
import "../../styles/admin.css";

const SESSION_CLOSED = "Tu sesión se cerró: el usuario o la contraseña ya no son válidos. Volvé a entrar.";

// Backoffice de noticias. Las credenciales viven solo en memoria: al recargar hay que volver a entrar.
function Admin() {
  const credentials = useRef(null);
  const loginDialog = useRef(null);
  const [needsLogin, setNeedsLogin] = useState(false);
  const [news, setNews] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [branch, setBranch] = useState("all");
  const [editing, setEditing] = useState(null); // null: listado; { slug }: formulario (slug null = nueva)

  useEffect(() => {
    if (needsLogin) loginDialog.current?.showModal();
  }, [needsLogin]);

  function requireLogin() {
    credentials.current = null;
    setError("");
    setNeedsLogin(true);
  }

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
      setNeedsLogin(false);
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
    setNeedsLogin(false);
    setNews(null);
    setQuery("");
    setStatus("all");
    setBranch("all");
    setEditing(null);
    setError("");
    setNotice(message);
    setLoading(false);
  }

  const loginForm = (
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
      <button type='submit' disabled={loading} className='cs-admin-button cs-admin-button--primary'>
        {loading ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );

  if (news && editing) {
    return (
      <>
        <AdminNewsForm
          credentials={credentials.current}
          slug={editing.slug}
          onBack={() => {
            setEditing(null);
            refresh();
          }}
          onSessionClosed={requireLogin}
          onLogout={() => logout()}
        />
        {needsLogin && (
          <dialog ref={loginDialog} className='cs-admin cs-admin-reauth' aria-labelledby='reauth-title' aria-describedby='reauth-description'
            onCancel={(event) => { event.preventDefault(); if (!loading) setNeedsLogin(false); }}>
            <h2 id='reauth-title'>Volver a ingresar</h2>
            <p id='reauth-description'>No pudimos validar tu sesión. Tu edición sigue abierta en esta pestaña. Ingresá de nuevo y después reintentá guardar o subir la imagen.</p>
            {loginForm}
            <button type='button' className='cs-admin-button cs-admin-reauth__back' disabled={loading} onClick={() => setNeedsLogin(false)}>Volver al editor</button>
          </dialog>
        )}
      </>
    );
  }

  if (news) {
    // Las fechas YYYY/MM/DD se ordenan bien como texto
    const sorted = [...news].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    const drafts = news.filter((item) => !item.published).length;
    const normalize = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const visible = sorted.filter((item) =>
      (status === "all" || (status === "published" ? item.published : !item.published)) &&
      (branch === "all" || item.branch === branch) &&
      normalize(item.es?.title || item.slug).includes(normalize(query.trim()))
    );
    return (
      <div className='cs-admin'>
        <AdminHeader onLogout={() => logout()} />
        <main className='cs-admin-list'>
          <div className='cs-admin-list__heading'>
            <div><h1>Noticias</h1><span>{news.length} noticias · {drafts} borradores</span></div>
            <button type='button' onClick={() => setEditing({ slug: null })} className='cs-admin-button cs-admin-button--primary'>
              <Add fontSize='small' /> Nueva noticia
            </button>
          </div>
          <div className='cs-admin-filters'>
            <label className='cs-admin-search'>
              <Search aria-hidden='true' />
              <input type='search' value={query} onChange={(event) => setQuery(event.target.value)} placeholder='Buscar por título' aria-label='Buscar por título' />
            </label>
            <div className='cs-admin-segments' role='group' aria-label='Filtrar por estado'>
              {[["all", "Todas", news.length], ["draft", "Borradores", drafts], ["published", "Publicadas", news.length - drafts]].map(([value, label, count]) => (
                <button key={value} type='button' aria-pressed={status === value} onClick={() => setStatus(value)}>{label} · {count}</button>
              ))}
            </div>
            <select className='cs-admin-branch-filter' value={branch} onChange={(event) => setBranch(event.target.value)} aria-label='Filtrar por rama'>
              <option value='all'>Rama: todas</option>
              {Object.entries(BRANCHES).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </div>
          {error && <p role='alert' className='cs-admin-message is-error'>{error} <button type='button' onClick={refresh} disabled={loading}>Reintentar</button></p>}
          <table className='cs-admin-table' aria-busy={loading}>
            <caption className='sr-only'>Noticias ordenadas de la más nueva a la más vieja</caption>
            <thead>
              <tr>
                <th scope='col'><span className='sr-only'>Imagen</span></th>
                <th scope='col'>Título</th>
                <th scope='col'>Rama</th>
                <th scope='col'>Fecha</th>
                <th scope='col'>Estado</th>
                <th scope='col'><span className='sr-only'>Acciones</span></th>
              </tr>
            </thead>
            <tbody>
              {visible.map((item) => {
                const image = newsImage(item.image);
                const edit = () => setEditing({ slug: item.slug });
                return (
                  <tr key={item.slug}>
                    <td className='cs-admin-table__image'>
                      {image ? <img src={image} alt='' loading='lazy' /> : <span className='cs-admin-no-photo'>Sin foto</span>}
                    </td>
                    <td className='cs-admin-table__title'>
                      <button type='button' onClick={edit}>{item.es?.title || item.slug}</button>
                      <span>/news/{item.slug}</span>
                    </td>
                    <td className='cs-admin-table__branch'><span className={`cs-admin-branch cs-branch--${item.branch}`}>{BRANCHES[item.branch] || item.branch}</span></td>
                    <td className='cs-admin-table__date'><time dateTime={item.date?.replaceAll("/", "-")}>{formatDate(item.date)}</time></td>
                    <td className='cs-admin-table__status'><NewsStatus published={item.published} /></td>
                    <td className='cs-admin-table__action'><button type='button' onClick={edit} aria-label={`Editar ${item.es?.title || item.slug}`} className='cs-admin-button'>Editar</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {visible.length === 0 && <p className='cs-admin-empty'>{news.length ? "No hay noticias que coincidan con los filtros." : "Todavía no hay noticias."}</p>}
          <p className='cs-admin-list__count' role='status'>{visible.length} {visible.length === 1 ? "noticia" : "noticias"}, de la más nueva a la más vieja.</p>
        </main>
      </div>
    );
  }

  return (
    <div className='cs-admin'><AdminHeader /><main className='cs-admin-login'>
      <h1>Ingresar al backoffice</h1>
      {notice && (
        <p role='status' className='mb-4 text-amber-800'>
          {notice}
        </p>
      )}
      {loginForm}
    </main></div>
  );
}

export default Admin;
