import { collection, getDocs, limit as fLimit, orderBy as fOrderBy, query as fQuery } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import i18n from "../i18n";
import { db } from "../firebase";

const PastEventCard = React.lazy(() => import("./past_event_card"));

export default function PastEventsList({ orderBy, direction, limit }) {
    if (direction !== "asc" && direction !== "desc") direction = "asc";

    const [pastEvents, setPastEvents] = useState([]);

    useEffect(() => {
        async function getPastEvents() {
            const pastEventsRef = collection(db, "past_events");

            let query;
            if (limit > 0)
                query = fQuery(pastEventsRef, fOrderBy(orderBy, direction), fLimit(limit))
            else
                query = fQuery(pastEventsRef, fOrderBy(orderBy, direction))

            // Get current browser's language
            let language = i18n.language.split("-")[0];
            if (!(language === "en" || language === "es")) language = "en";

            const result = await getDocs(query);
            const data = result.docs.map((doc) => {
                const data = doc.data();
                return {
                    "attendants": data.attendants,
                    "link": data.link,
                    ...data[language],
                };
            });
            setPastEvents(data);
        }
        getPastEvents();
    }, []);

    return (
        pastEvents.length == 0 ?
            <div className="loader" /> :
            pastEvents.map((event, index) => {
                return <PastEventCard key={index} event={event} index={index} />
            })
    );
}