import React from "react";

// Translations
import i18n from "../../i18n/index.js";

import upcomingEvents from "../../data/upcoming_events.json";

import gamejam from "../../images/GameJam.png";

// Components
const Section = React.lazy(() => import("../section"));
const LinkButton = React.lazy(() => import("../link_button"));

function UpcomingEvents() {
  return (
    <Section
      id="upcoming-events"
      bgColor="bg-white"
      textAlignment="center"
      className="overflow-hidden"
    >
      <h2>{i18n.t("upcoming_events.title")}</h2>

      <div className="upcoming-event-frame">
        {upcomingEvents.map((event, index) => {
          return (
            <div
              key={index}
              className="bg-tan flex flex-col h-auto rounded-xl shadow-xl p-8 mr-2 lg:mr-4 mb-6 upcoming-card items-center"
            >
              <h3 className="text-left mt-5 mb-2 font-bold">
                {i18n.t(event.title)}
              </h3>

              <img
                className="h-62 mb-6 w-46 object-contain"
                src={gamejam}
                alt="gamejam-logo-banner"
              />

              <p className="font-light mb-4">{i18n.t(event.date)}</p>
              <p className="text-left mb-2">{i18n.t(event.description)}</p>
              {/* {event.link && (
                <LinkButton
                  className="text-xl mt-3 self-end"
                  href={event.link}
                  type="full-primary"
                  external={true}
                  text={i18n.t("upcoming_events.sign_up")}
                />
              )} */}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export default UpcomingEvents;
