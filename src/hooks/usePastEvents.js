import { collection, getDocs, limit as fLimit, orderBy as fOrderBy, query as fQuery } from "firebase/firestore";
import { useEffect, useState } from "react";
import i18n from "../i18n";
import { db } from "../firebase";

export default function usePastEvents({ orderBy, direction, limit }) {
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
            if (language !== "en" || language !== "es") language = "en";

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

    return pastEvents;
}