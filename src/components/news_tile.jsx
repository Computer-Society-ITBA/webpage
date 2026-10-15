import React from "react";
import { Link } from "react-router-dom";
// Translations
import i18n from "../i18n/index.js";

const newsImages = import.meta.glob("../images/news_images/*", {
  eager: true,
  query: "?url",
  import: "default",
});

function formatDate(date) {
  const [year, month, day] = date.split("/");
  const months = i18n.t("news.months", { returnObjects: true });
  return `${Number(day)} ${months[Number(month) - 1]} ${year}`;
}

// Un bloque del mosaico: "lead" y "wide" llevan la foto de la nota, "sm" es solo texto
function NewsTile({ item, tile }) {
  let language = i18n.language.split("-")[0];
  if (language !== "es") language = "en";
  const text = item[language];
  const image = tile !== "sm" && item.image && newsImages[`../images/${item.image}`];

  return (
    <li className={`cs-tile cs-tile--${tile} cs-branch--${item.branch}`}>
      {image && (
        <figure className='cs-tile__photo'>
          <img src={image} alt={text.image_alt} loading='lazy' />
        </figure>
      )}
      <div className='cs-tile__text'>
        <p className='cs-tile__label'>
          <span>{i18n.t(`branch.${item.branch}`)}</span>
          <time dateTime={item.date.replace(/\//g, "-")}>{formatDate(item.date)}</time>
        </p>
        <h3 className='cs-tile__title'>
          <Link to={`/news/${item.slug}`}>{text.title}</Link>
        </h3>
        <p className='cs-tile__summary'>{text.summary}</p>
      </div>
    </li>
  );
}

export default NewsTile;
