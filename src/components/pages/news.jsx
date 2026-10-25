import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
// Translations
import i18n from "../../i18n/index.js";
// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Styles
import "../../styles/news.css";
import "../../styles/news-article.css";

import { getNews, getNewsBySlug } from "../../data/newsService.js";
import NewsTile from "../news_tile";
import NewsArticle from "../news_article";

const Footer = React.lazy(() => import("../sections/footer"));
const NavBar = React.lazy(() => import("../metatext/navbar"));

// Una nota (/news/:slug): cabecera del color de la rama, foto y texto.
// Una nota sin cuerpo (body) muestra solo la cabecera con el resumen.
function News() {
  const { slug } = useParams();
  const [state, setState] = useState({ status: "loading", item: null, more: [] });

  useEffect(() => {
    window.scrollTo(0, 0);
    let cancelled = false;
    setState({ status: "loading", item: null, more: [] });

    Promise.all([getNewsBySlug(slug), getNews(3)])
      .then(([item, latest]) => {
        if (cancelled) return;
        if (!item) return setState({ status: "missing", item: null, more: [] });
        const more = latest.filter((e) => e.slug !== slug).slice(0, 2);
        setState({ status: "ready", item, more });
      })
      .catch(() => !cancelled && setState({ status: "error", item: null, more: [] }));

    return () => { cancelled = true; };
  }, [slug]);

  if (state.status === "loading") return null;
  if (state.status === "missing") return <Navigate to="/" />;
  if (state.status === "error") return <Navigate to="/" />;

  const { item, more } = state;

  let language = i18n.language.split("-")[0];
  if (language !== "es") language = "en";

  return (
    <React.Fragment>
      <NavBar />
      <main>
        <article className='cs-article cs-article--page'>
          <Link smooth to='/#news' className='cs-back'>
            <ArrowBackIcon />
            {i18n.t("go_back")}
          </Link>

          <NewsArticle item={item} language={language} />

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
