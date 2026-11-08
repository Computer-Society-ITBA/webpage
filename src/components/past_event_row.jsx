import React from "react";
// Translations
import i18n from "../i18n/index.js";
// Icons
import LanguageIcon from "@mui/icons-material/Language";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";

const linkIcons = {
  youtube: YouTubeIcon,
  instagram: InstagramIcon,
  web: LanguageIcon,
};

// El logo guardado no siempre es youtube/instagram/web: si no, se deduce del enlace
function linkType(link) {
  if (linkIcons[link.logo]) return link.logo;
  if (/youtube\.com|youtu\.be/.test(link.href)) return "youtube";
  if (/instagram\.com/.test(link.href)) return "instagram";
  return "web";
}

function PastEventRow({ event, featured }) {
  const [year, month, day] = event.date.split("/");
  const months = i18n.t("news.months", { returnObjects: true });
  const type = event.link?.href ? linkType(event.link) : null;
  const LinkIcon = type && linkIcons[type];

  return (
    <li className={`cs-rail-row cs-branch--${event.branch}${featured ? " cs-rail-row--featured" : ""}`}>
      <time className='cs-rail-date' dateTime={event.date.replace(/\//g, "-")}>
        <span className='cs-rail-date__dm'>{Number(day)} {months[Number(month) - 1]}</span>
        <span className='cs-rail-date__y'>{year}</span>
      </time>
      <span className='cs-rail-node' aria-hidden='true' />
      <article className={`cs-rail-body${event.photo ? " cs-rail-body--photo" : ""}`}>
        <div className='cs-rail-text'>
          <p className='cs-rail-meta'>
            <span className='cs-tag'>{i18n.t(`branch.${event.branch}`)}</span>
            {event.attendants > 0 && (
              <span>{i18n.t("past_events.inscriptions", { n: event.attendants })}</span>
            )}
          </p>
          <h3 className='cs-rail-title'>{event.title}</h3>
          {event.description && <p className='cs-rail-summary'>{event.description}</p>}
          {LinkIcon && (
            <a className='cs-rail-link' href={event.link.href} target='_blank' rel='noreferrer'>
              <LinkIcon />
              <span>{i18n.t(`past_events.link.${type}`)}</span>
            </a>
          )}
        </div>
        {event.photo && <img className='cs-rail-photo' src={event.photo} alt='' loading='lazy' />}
      </article>
    </li>
  );
}

export default PastEventRow;
