import React, {useEffect, useState} from "react";

// Translations
import i18n from "../../i18n/index.js";

import upcomingEvents from "../../data/upcoming_events.json";

import gamejam from "../../images/GameJam.png";

// Components
const Section = React.lazy(() => import("../section"));
const LinkButton = React.lazy(() => import("../link_button"));

function UpcomingEvents() {
    const calculateTimeLeft = () => {
        let difference = new Date(2024, 9, 18, 12) - new Date();

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        else {
            timeLeft = null;
        }
        return timeLeft;
    }
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
            }, 1000);
        return () => clearTimeout(timer);
    });
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

              <p className="font-light mb-4">{timeLeft ? <span>{i18n.t('upcoming_events.timer').replace('{days}', `${timeLeft.days}`).replace('{timer}', `${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`)}</span> : <span>{i18n.t('upcoming_events.timeOut')}</span>}</p>
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
