import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "../../firebase"; // Import your Firebase app instance

// Translations
import i18n from "../../i18n/index.js";

import upcomingEvents from "../../data/upcoming_events.json";

import hackit from "../../images/banner_hackit.png";

// Components
const Section = React.lazy(() => import("../section"));
const LinkButton = React.lazy(() => import("../link_button"));

const db = getFirestore(app);

const fetchStartDate = async () => {
  try {
    const docRef = doc(db, "config", "submissions"); // Path: config/submissions
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("Start Date:", data.start);
      return data.start;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching start date:", error);
  }
};

function UpcomingEvents() {
  const calculateTimeLeft = () => {
    // let startDate = fetchStartDate();

    let difference = new Date(2025, 2, 28, 12) - new Date();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = null;
    }
    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });
  return (
    <Section
      id='upcoming-events'
      bgColor='bg-white'
      textAlignment='center'
      className='overflow-hidden'
    >
      <h2>{i18n.t("upcoming_events.title")}</h2>

      <div className='upcoming-event-frame'>
        {upcomingEvents.map((event, index) => {
          return (
            <div
              key={index}
              className='bg-tan overflow-hidden flex flex-col h-auto rounded-xl shadow-xl pb-10 mr-2 lg:mr-4 mb-6 upcoming-card items-center'
            >
              <img
                className='w-full mb-6 object-contain '
                src={hackit}
                alt='hackit-logo-banner'
              />

              <p className='font-light  mb-4'>
                {timeLeft ? (
                  <span>
                    {i18n
                      .t("upcoming_events.timer")
                      .replace("{days}", `${timeLeft.days}`)
                      .replace(
                        "{timer}",
                        `${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`
                      )}
                  </span>
                ) : (
                  <span>{i18n.t("upcoming_events.timeOut")}</span>
                )}
              </p>
              <p className='text-left mx-32'>{i18n.t(event.description)}</p>
              {event.link && (
                <LinkButton
                  className='text-xl mt-3 self-center'
                  href={event.link}
                  type='full-primary'
                  external={true}
                  text={i18n.t("upcoming_events.sign_up")}
                />
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export default UpcomingEvents;
