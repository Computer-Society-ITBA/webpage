import React from "react";
// Translations
import i18n from "../i18n/index.js";
// Icons
import Icon from "@mdi/react";
import { mdiYoutube, mdiWeb, mdiInstagram } from "@mdi/js";

function LinkButton(props) {
  const { event, index } = props;
  let className =
    "animate-pulse hover:animate-none focus:animate-none focus:outline-none text-typography_primary transform cursor-pointer duration-100 ";
  let icon = null;
  if (event.link) {
    switch (event.link.logo) {
      case "web":
        icon = mdiWeb;
        className = className + "hover:text-pink-700 focus:text-pink-700";
        break;
      case "youtube":
        icon = mdiYoutube;
        className = className + "hover:text-red-700 focus:text-red-700";
        break;
      case "instagram":
      default:
        icon = mdiInstagram;
        className = className + "hover:text-purple-700 focus:text-purple-700";
    }
  }

  return (
    <div
      key={index}
      className="flex flex-col w-full sm:w-6/12 lg:w-4/12 h-auto"
    >
      <div className="flex flex-col rounded-xl items-center text-left shadow-xl h-full p-4 m-2 mb-4 sm:m-4 sm:mb-6">
        <h3 className="font-bold mb-2 w-full flex flex-row justify-between self-start">
          {i18n.t(event.title)}
          {event.link ? (
            <a
              href={event.link.href}
              target="_blank"
              rel="noreferrer"
              className={className}
            >
              <Icon
                path={icon}
                size={1.5}
                className="ml-1 text-h5 leading-h5 focus:outline-none"
              />
            </a>
          ) : null}
        </h3>
        <div className="flex flex-row justify-between mb-4 w-full">
          <p className="font-light">{i18n.t(event.date)}</p>
          <p className="text-brand_primary">
            {i18n.t("past_events.inscriptions", { n: event.attendants })}
          </p>
        </div>
        <p>{i18n.t(event.description)}</p>
      </div>
    </div>
  );
}

export default LinkButton;
