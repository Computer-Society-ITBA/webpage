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

            const fetchLimit = limit > 0 ? limit * 2 : undefined;

            let query;
            if (fetchLimit)
                query = fQuery(pastEventsRef, fOrderBy(orderBy, direction), fLimit(fetchLimit));
            else
                query = fQuery(pastEventsRef, fOrderBy(orderBy, direction));

            // Get current browser's language
            let language = i18n.language.split("-")[0];
            if (language !== "es") language = "en";

            const result = await getDocs(query);
            const data = result.docs.map((doc) => {
                const data = doc.data();
                const langData = data[language] || {};
                return {
                    "attendants": data.attendants,
                    "link": data.link,
                    "dateObj": data.date,
                    ...data[language],
                };
            }).filter(event => {
                const [year, month, day] = event.dateObj.split('/');
                const eventDate = new Date( year, month - 1, day);
                console.log(eventDate);
                console.log(event.dateObj)
                return eventDate < new Date();
            }).sort((a, b) => {
                const [ya, ma, da] = a.dateObj.split('/');
                const [yb, mb, db] = b.dateObj.split('/');
                const dateA = new Date(ya, ma - 1, da);
                const dateB = new Date(yb, mb - 1, db);
                return dateB - dateA;
            });
            const limitedData = data.slice(0, limit)
            setPastEvents(limitedData);
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