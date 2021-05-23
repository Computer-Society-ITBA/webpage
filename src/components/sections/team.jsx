import React, { useState } from "react";
import usePaging from "../../hooks/usePaging";
import { motion } from "framer-motion";
// Translations
import i18n from "../../i18n/index.js";

// Icons
import Icon from "@mdi/react";
import {
  mdiInstagram,
  mdiLinkedin,
  mdiWeb,
  mdiGithub,
  mdiChevronLeft,
  mdiChevronRight,
} from "@mdi/js";

import team from "../../data/team";
const teamImages = require.context("../../images/team/", true, /^.*$/);

// Components
const Section = React.lazy(() => import("../section"));

const cardWidth = 225;

function Team() {
  const [page, handleLeftClick, handleRightClick, pageLimit] = usePaging(
    cardWidth,
    team.length,
    2
  );

  return (
    <Section
      id="our-team"
      bgColor="bg-white"
      textAlignment="center"
      className="h-full overflow-hidden"
    >
      <h2>{i18n.t("team.title")}</h2>
      <motion.div
        className="grid grid-rows-2 grid-flow-col w-full"
        animate={{ x: -1 * page * cardWidth }}
      >
        {team.map((person, index) => {
          return (
            <div key={index} className="flex flex-col h-auto team-card">
              <div className="flex flex-col rounded-xl items-center shadow-xl p-2 m-4 mb-6 h-full">
                <img
                  className="rounded-full w-9/12"
                  src={teamImages(`./${person.image.src}`).default}
                  alt={i18n.t(person.image.alt)}
                />
                <h4>{person.name}</h4>
                <p className="font-light uppercase opacity-75 mb-2">
                  {i18n.t(person.title)}
                </p>
                <div className="flex flex-row justify-center items-center w-full mt-auto">
                  {person.social.map((item, index) => {
                    let icon = undefined;
                    let className =
                      "px-2 text-typography_primary transform duration-100 ";

                    switch (item.logo) {
                      case "web":
                        icon = mdiWeb;
                        className =
                          className +
                          "hover:text-red-700 hover:scale-125 focus:text-red-700 focus:scale-125 focus:outline-none";
                        break;
                      case "linkedin":
                        icon = mdiLinkedin;
                        className =
                          className +
                          "hover:text-blue-700 hover:scale-125 focus:text-blue-700 focus:scale-125 focus:outline-none";
                        break;
                      case "github":
                        icon = mdiGithub;
                        className =
                          className +
                          "hover:text-green-700 hover:scale-125 focus:text-green-700 focus:scale-125 focus:outline-none";
                        break;
                      case "instagram":
                      default:
                        icon = mdiInstagram;
                        className =
                          className +
                          "hover:text-purple-700 hover:scale-125 focus:text-purple-700 focus:scale-125 focus:outline-none";
                    }

                    return (
                      <a
                        key={index}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className={className}
                      >
                        <Icon
                          path={icon}
                          size={1}
                          className="focus:outline-none"
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>
      <div className="flex flex-row w-full items-center justify-center">
        <button
          disabled={page === 0}
          onClick={handleLeftClick}
          className={
            "focus:outline-none mr-4 rounded-full bg-light " +
            (page === 0
              ? "opacity-50"
              : "transition duration-150 hover:text-brand_primary")
          }
        >
          <Icon path={mdiChevronLeft} size={3} />
        </button>
        <button
          disabled={page >= pageLimit}
          onClick={handleRightClick}
          className={
            "focus:outline-none rounded-full bg-light " +
            (page >= pageLimit
              ? "opacity-50"
              : "transition duration-150 hover:text-brand_primary")
          }
        >
          <Icon path={mdiChevronRight} size={3} />
        </button>
      </div>
    </Section>
  );
}

export default Team;
