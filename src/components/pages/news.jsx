import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
// Translations
import i18n from "../../i18n/index.js";
// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Styles
import "../../styles/news.css";
import "../../styles/news-article.css";

// Data
import news from "../../data/news.json";

import NewsTile from "../news_tile";

const newsImages = import.meta.glob("../../images/news_images/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const Footer = React.lazy(() => import("../sections/footer"));
const NavBar = React.lazy(() => import("../metatext/navbar"));

// "6 de octubre de 2026" / "October 6, 2026"
function formatLongDate(date, language) {
  const [year, month, day] = date.split("/").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(language === "es" ? "es-AR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Una nota (/news/:slug): cabecera del color de la rama, foto y texto.
// Una nota sin cuerpo (body) muestra solo la cabecera con el resumen.
function News() {
  const { slug } = useParams();
  window.scrollTo(0, 0);

  const item = news.find((entry) => entry.slug === slug);
  if (!item) return <Navigate to="/" />;

  let language = i18n.language.split("-")[0];
  if (language !== "es") language = "en";
  const text = item[language];
  const image = item.image && newsImages[`../../images/${item.image}`];
  // Seguir leyendo: las dos notas más nuevas, sin contar esta
  const more = news
    .filter((entry) => entry.slug !== slug)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 2);

  return (
    <React.Fragment>
      <NavBar />
      <main>
        <article className='cs-article cs-article--page'>
          <Link smooth to='/#news' className='cs-back'>
            <ArrowBackIcon />
            {i18n.t("go_back")}
          </Link>

          <header className={`cs-article__head cs-branch--${item.branch}`}>
            <p className='cs-article__meta'>
              <span>{i18n.t(`branch.${item.branch}`)}</span>
              <time dateTime={item.date.replace(/\//g, "-")}>{formatLongDate(item.date, language)}</time>
            </p>
            <h1 className='cs-article__title'>{text.title}</h1>
            <p className='cs-article__lead'>{text.lead || text.summary}</p>
          </header>

          {image && (
            <figure className='cs-article__figure'>
              <img src={image} alt={text.image_alt} />
              {text.image_caption && <figcaption>{text.image_caption}</figcaption>}
            </figure>
          )}

          {text.body && (
            <div className='cs-article__body'>
              {text.body.map((block, index) =>
                typeof block === "string" ? <p key={index}>{block}</p> : <h2 key={index}>{block.h2}</h2>
              )}
            </div>
          )}

          <div className='cs-article__more'>
            <h2>{i18n.t("news.read_on")}</h2>
            <div className='cs-news cs-news--white cs-news--bare'>
              <ol className='cs-news-grid'>
                {more.map((entry) => (
                  <NewsTile key={entry.slug} item={entry} tile='sm' />
                ))}
              </ol>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default News;
