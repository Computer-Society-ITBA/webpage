import React, { useEffect, useState } from "react";
import { getFirestore, getDoc, doc, collection, getDocs, query as fQuery, orderBy as fOrderBy, limit as fLimit } from "firebase/firestore";
import { app } from "../../firebase";

// Translations
import i18n from "../../i18n/index.js";

import quantum from "../../images/banner_quantum.png";

// Components
const Section = React.lazy(() => import("../section"));
const LinkButton = React.lazy(() => import("../link_button"));

const db = getFirestore(app);

const fetchStartDate = async () => {
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
};

function UpcomingEvents() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
      async function getUpcomingEvents() {
          const pastEventsRef = collection(db, "past_events");

          let limit = 0;
          let orderBy = "date";
          let direction = "desc";

          let query;
          if (limit > 0)
              query = fQuery(pastEventsRef, fOrderBy(orderBy, direction), fLimit(limit));
          else
              query = fQuery(pastEventsRef, fOrderBy(orderBy, direction));

          let language = i18n.language.split("-")[0];
          if (!(language === "en" || language === "es")) language = "en";

          const result = await getDocs(query);
          const data = result.docs.map((doc) => {
              const data = doc.data();
              return {
                attendants: data.attendants,
                link: data.link?.href || "",
                ...data[language],
                src: data.img?.src || data[language]?.img?.src || "",
                alt: data.img?.alt || data[language]?.img?.alt || data[language]?.title || "Event image",
                date: data.date,
              };
          }).filter(event => {
          console.log(event, ": ", event.date, new Date().toISOString().split("T")[0], event.date > new Date("2025-01-01"));//new Date().toISOString().split("T")[0]);
              const eventDate = new Date(event.date?.seconds ? event.date.toDate() : event.date);
              return eventDate > new Date(new Date("2026-01-01"));
          });
          setUpcomingEvents(data);
          console.log("Upcoming Events:", upcomingEvents);
          console.log("Upcoming Events data:", data);
      }
      getUpcomingEvents();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = {};
      const now = new Date();
      upcomingEvents.forEach(event => {
        const eventDate = new Date(event.date?.seconds ? event.date.toDate() : event.date);
        const diff = eventDate - now;
        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / (1000 * 60)) % 60);
          const seconds = Math.floor((diff / 1000) % 60);
          newTimeLeft[event.title] = { days, hours, minutes, seconds };
        } else {
          newTimeLeft[event.title] = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [upcomingEvents]);

  return (
    (<Section
      id='upcoming-events'
      bgColor='bg-white'
      textAlignment='center'
      className='overflow-hidden'
    >
      <h2>{i18n.t("upcoming_events.title")}</h2>
      <div className='upcoming-event-frame'>
        {upcomingEvents.map((event, index) => {
          return (
            (<div
              key={index}
              className='bg-tan overflow-hidden flex flex-col h-auto rounded-xl shadow-xl pb-10 mr-2 lg:mr-4 mb-6 upcoming-card items-center'
            >
              <a href={`${event.link}`} target='_blank'>
                <img
                  className='w-full mb-6 object-contain'
                  src={event.src}
                  alt={event.alt}
                />
              </a>
              <h3 className='font-bold text-2xl mb-4 mt-4'>{event.title}</h3>
              <p className='font-light  mb-4'>
                <span>
                  {timeLeft[event.title]
                    ? `${timeLeft[event.title].days}d ${timeLeft[event.title].hours}h ${timeLeft[event.title].minutes}m ${timeLeft[event.title].seconds}s`
                    : "Calculando..."}
                </span>
              </p>
              <p className='text-left mx-6 md:mx-12 lg:mx-32'>{i18n.t(event.description)}</p>
              {event.link && (
                <LinkButton 
                  className='text-xl mt-3 self-center'
                  href={event.link}
                  type='quantum'
                  external={false}
                  text={i18n.t("upcoming_events.sign_up")}
                />
              )}
            </div>)
          );
        })}
      </div>
    </Section>)
  );
}

export default UpcomingEvents;
