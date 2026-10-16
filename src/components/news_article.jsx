import React from "react";
// Translations
import i18n from "../i18n/index.js";

// Styles
import "../styles/news.css";
import "../styles/news-article.css";

import { parseBlock } from "../data/newsFormat.js";

const newsImages = import.meta.glob("../images/news_images/*", {
  eager: true,
  query: "?url",
  import: "default",
});

// "6 de octubre de 2026" / "October 6, 2026"
function formatLongDate(date, language) {
  const [year, month, day] = date.split("/").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(language === "es" ? "es-AR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Nodos de parseInline → elementos de React (nunca HTML crudo)
function renderInline(nodes) {
  return nodes.map((node, index) => {
    if (typeof node === "string") return node;
    const children = renderInline(node.children);
    if (node.type === "a") return <a key={index} href={node.href}>{children}</a>;
    return React.createElement(node.type, { key: index }, children);
  });
}

// Un bloque de texto del cuerpo: párrafos y listas. Un texto sin marcas queda como <p>texto</p>, igual que antes.
function renderBlock(text) {
  return parseBlock(text).map((part, index) =>
    part.type === "ul" ? (
      <ul key={index}>
        {part.items.map((item, itemIndex) => (
          <li key={itemIndex}>{renderInline(item)}</li>
        ))}
      </ul>
    ) : (
      <p key={index}>{renderInline(part.children)}</p>
    )
  );
}

// Cabecera del color de la rama, foto y cuerpo de una nota. La usan /news/:slug y la vista previa del admin.
function NewsArticle({ item, language }) {
  const text = item[language];

  const image = item.image?.startsWith("http")
  ? item.image
  : newsImages[`../images/${item.image}`];

  return (
    <React.Fragment>
      <header className={`cs-article__head cs-branch--${item.branch}`}>
        <p className='cs-article__meta'>
          <span>{i18n.t(`branch.${item.branch}`, { lng: language })}</span>
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
          {text.body.map((block, index) => {
            if (typeof block === "string") return <React.Fragment key={index}>{renderBlock(block)}</React.Fragment>;
            return block.h3 !== undefined ? <h3 key={index}>{block.h3}</h3> : <h2 key={index}>{block.h2}</h2>;
          })}
        </div>
      )}
    </React.Fragment>
  );
}

export default NewsArticle;
