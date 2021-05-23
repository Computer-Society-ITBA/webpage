import React from "react";
import usePaging from "../../hooks/usePaging";
import { motion } from "framer-motion";
// Translations
import i18n from "../../i18n/index.js";

import upcomingEvents from "../../data/upcoming_events.json";

//Icons
import Icon from "@mdi/react";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";

// Components
const Section = React.lazy(() => import("../section"));

const cardWidth = 650;

function UpcomingEvents() {
  const [page, handleLeftClick, handleRightClick, pageLimit] = usePaging(
    cardWidth,
    upcomingEvents.length,
    1
  );
  return (
    <Section
      id="upcoming-events"
      bgColor="bg-white"
      textAlignment="center"
      sizeMobile="full"
      size="full"
      sizeLg="full"
      className="overflow-hidden"
    >
      <h2>{i18n.t("upcoming_events.title")}</h2>

      <motion.div
        className="flex flex-row flex-none"
        animate={{ x: -1 * page * cardWidth }}
      >
        {upcomingEvents.map((event, index) => {
          return (
            <div
              key={index}
              className="flex flex-col h-auto rounded-xl shadow-xl p-8 m-4 mb-6 upcoming-card items-start"
            >
              <h3 className="mt-5">{event.name}</h3>
              <p className="font-light opacity-60 font-medium mb-2 ">
                {event.date}
              </p>
              <p className="font-light text-left mb-2">{event.desc}</p>
              <button
                className="bg-brand_primary py-3 px-6 text-xl rounded-lg text-white mt-3 
              self-end hover:bg-brand_secondary duration-200 focus:outline-none"
              >
                ANOTARSE
              </button>
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

export default UpcomingEvents;
