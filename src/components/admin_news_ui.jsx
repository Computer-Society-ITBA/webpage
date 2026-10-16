import React from "react";
import Logout from "@mui/icons-material/Logout";
import logo from "../images/logo_icon.png";
import i18n from "../i18n/index.js";

export const BRANCHES = { club: "Computer Society", hackit: "hackITBA", quantum: "Quantum Jam", gamejam: "Game Jam" };

const images = import.meta.glob("../images/news_images/*", { eager: true, query: "?url", import: "default" });

export function newsImage(path) {
  return /^https?:\/\//.test(path || "") ? path : images[`../images/${path}`];
}

export function formatDate(date, language = "es") {
  if (!/^\d{4}\/\d{2}\/\d{2}$/.test(date || "")) return date || "—";
  const [year, month, day] = date.split("/").map(Number);
  const months = i18n.t("news.months", { lng: language, returnObjects: true });
  return `${day} ${months[month - 1]} ${year}`;
}

export function AdminHeader({ onLogout, busy = false }) {
  return (
    <header className='cs-admin-header'>
      <div className='cs-admin-header__brand'>
        <img src={logo} alt='' width='36' height='36' />
        <span>Computer Society ITBA</span>
      </div>
      <span className='cs-admin-header__label'>Backoffice de noticias</span>
      {onLogout && <button type='button' className='cs-admin-button' onClick={onLogout} disabled={busy}><Logout fontSize='small' />Salir</button>}
    </header>
  );
}

export function NewsStatus({ published }) {
  return <span className={`cs-admin-status ${published ? "is-published" : "is-draft"}`}>{published ? "Publicada" : "Borrador"}</span>;
}
