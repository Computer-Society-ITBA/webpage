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
      <div className="flex flex-col rounded-2xl items-center text-left shadow-xl h-full p-4 m-2 mb-4 sm:m-4 sm:mb-6 border border-gray-200 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-shadow duration-300">
        <h3 className="font-bold mb-2 w-full flex flex-row justify-between self-start">
          {event.title}
          {event.link ? (
            <a
              href={event.link.href}
              target="_blank"
              rel="noreferrer"
              className={`${className} transform hover:scale-110 transition-transform duration-150`}
            >
              <Icon
                path={icon}
                size={1.5}
                className="ml-1 text-h5 leading-h5 focus:outline-none"
              />
            </a>
          ) : null}
        </h3>
        <div className="flex flex-row justify-between mb-2 w-full">
          <p className="font-light">{event.date}</p>
          <p className="font-semibold text-brand_primary">
            {i18n.t("past_events.inscriptions", { n: event.attendants })}
          </p>
        </div>
        <hr className="w-full border-t border-gray-200 my-2" />
        <p>{event.description}</p>
      </div>
    </div>
  );
}

export default LinkButton;