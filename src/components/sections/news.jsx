import React from "react";
import { Link } from "react-router-dom";

// Translations
import i18n from "../../i18n/index.js";

// Styles
import "../../styles/news.css";

// Data
import news from "../../data/news.json";
const newsImages = import.meta.glob("../../images/news_images/*", {
  eager: true,
  query: "?url",
  import: "default",
});

// Components
const Section = React.lazy(() => import("../section"));
const LinkButton = React.lazy(() => import("../link_button"));

// Bloques del mosaico, en el orden de news.json
const tiles = ["lead", "sm", "sm", "wide"];

function formatDate(date) {
  const [year, month, day] = date.split("/");
  const months = i18n.t("news.months", { returnObjects: true });
  return `${Number(day)} ${months[Number(month) - 1]} ${year}`;
}

function News() {
  let language = i18n.language.split("-")[0];
  if (language !== "es") language = "en";

  return (
    <Section
      id='news'
      bgColor='bg-white'
      textAlignment='left'
      padding='no'
      className='cs-news cs-news--white'
    >
      <div className='cs-news__inner'>
        <h2 className='!mb-0 text-[2rem] !leading-[1.15] sm:text-[2.25rem]'>
          {i18n.t("news.title")}
        </h2>
        <div className='mt-[18px] h-[3px] w-[50px] bg-brand_secondary' />

        <ol className='cs-news-grid cs-news-grid--home'>
          {news.slice(0, tiles.length).map((item, index) => {
            const tile = tiles[index];
            const text = item[language];
            const image = tile !== "sm" && item.image && newsImages[`../../images/${item.image}`];
            return (
              <li key={item.slug} className={`cs-tile cs-tile--${tile} cs-branch--${item.branch}`}>
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
          })}
        </ol>

        <div className='cs-news-more'>
          <LinkButton
            href='/news'
            type='outlined-dark'
            text={i18n.t("news.all")}
            className='leading-base'
          />
        </div>
      </div>
    </Section>
  );
}

export default News;
