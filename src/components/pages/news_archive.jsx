import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import news from "../../data/news.json";
import "../../styles/news-archive.css";

const Footer = React.lazy(() => import("../sections/footer"));
const NavBar = React.lazy(() => import("../metatext/navbar"));
const branches = ["club", "hackit", "quantum", "gamejam"];

// La imagen y su descripción vienen de news.json, igual que en la home y la nota.
const localImages = import.meta.glob("../../images/news_images/*", {
  eager: true,
  query: "?url",
  import: "default",
});

function NewsArchive() {
  const { t, i18n } = useTranslation();
  const language = i18n.language.split("-")[0] === "es" ? "es" : "en";
  const [selectedBranch, setSelectedBranch] = useState("all");
  const labels = language === "es"
    ? { all: "Todas", filter: "Filtrar por evento", empty: "No hay noticias de este evento por ahora." }
    : { all: "All", filter: "Filter by event", empty: "There are no news stories for this event yet." };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const visibleNews = news
    .filter((item) => selectedBranch === "all" || item.branch === selectedBranch)
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
  const years = [...new Set(visibleNews.map((item) => item.date.slice(0, 4)))];
  const months = t("news.months", { returnObjects: true });

  function formatDate(date) {
    const [year, month, day] = date.split("/");
    return `${Number(day)} ${months[Number(month) - 1]} ${year}`;
  }

  return (
    <React.Fragment>
      {/* La barra del sitio, igual que en la home: va fuera de .cs-news-archive-page para no heredar su tipografía */}
      <NavBar />
      <div className="cs-news-archive-page">
        <main className="cs-news-archive" aria-labelledby="news-archive-title">
          <div className="cs-news-archive__inner">
            <h1 id="news-archive-title" className="cs-news-archive__heading">{t("news.title")}</h1>
            <div className="cs-news-archive__rule" aria-hidden="true" />

            <div className="cs-news-archive__filters" role="group" aria-label={labels.filter}>
              {["all", ...branches].map((branch) => (
                <button
                  key={branch}
                  type="button"
                  className="cs-news-archive__chip"
                  data-branch={branch}
                  aria-pressed={selectedBranch === branch}
                  onClick={() => setSelectedBranch(branch)}
                >
                  {branch !== "all" && <span className="cs-news-archive__dot" aria-hidden="true" />}
                  {branch === "all" ? labels.all : t(`branch.${branch}`)}
                </button>
              ))}
            </div>

            <div className="cs-news-archive__results" aria-live="polite" aria-atomic="true">
              {years.map((year) => (
                <section key={year} className="cs-news-archive__year" aria-labelledby={`news-year-${year}`}>
                  <h2 id={`news-year-${year}`}>{year}</h2>
                  <ol className="cs-news-archive__grid">
                    {visibleNews.filter((item) => item.date.startsWith(year)).map((item) => {
                      const text = item[language];
                      const image = localImages[`../../images/${item.image}`] || (/^https?:\/\//.test(item.image || "") ? item.image : null);
                      return (
                        <li key={item.slug} className="cs-news-archive__card" data-branch={item.branch}>
                          {image && (
                            <figure className="cs-news-archive__photo">
                              <img src={image} alt={text.image_alt || text.title} loading="lazy" />
                            </figure>
                          )}
                          <div className="cs-news-archive__text">
                            <p className="cs-news-archive__meta">
                              <span>{t(`branch.${item.branch}`)}</span>
                              <time dateTime={item.date.replace(/\//g, "-")}>{formatDate(item.date)}</time>
                            </p>
                            <h3 className="cs-news-archive__title">
                              <Link to={`/news/${item.slug}`}>{text.title}</Link>
                            </h3>
                            <p className="cs-news-archive__summary">{text.summary}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </section>
              ))}
              {visibleNews.length === 0 && <p className="cs-news-archive__empty">{labels.empty}</p>}
            </div>
          </div>
        </main>
        <Footer color="#2b2b2b" />
      </div>
    </React.Fragment>
  );
}

export default NewsArchive;
