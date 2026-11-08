import React from "react";

// Translations
import i18n from "../../i18n/index.js";

// Styles
import "../../styles/news.css";

// Data
import useNews from "../../hooks/useNews.js";

import NewsTile from "../news_tile";

// Components
const Section = React.lazy(() => import("../section"));
const LinkButton = React.lazy(() => import("../link_button"));

// Bloques del mosaico, en el orden de más nueva a más vieja
const tiles = ["lead", "wide", "sm", "sm"];

function News() {
  const { news } = useNews(tiles.length);

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
          {news.map((item, index) => (
            <NewsTile key={item.slug} item={item} tile={tiles[index]} />
          ))}
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
