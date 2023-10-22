import React from "react";
// Translations
import i18n from "../../i18n/index.js";

import usePastEvents from "../../hooks/usePastEvents.js";

// Components
const Section = React.lazy(() => import("../section"));
const PastEventCard = React.lazy(() => import("../past_event_card"));

function PastEvents() {

  const pastEvents = usePastEvents({ orderBy: "date", direction: "desc" });

  return (
    <Section bgColor="bg-white" textAlignment="center">
      <h2 className="pt-12">{i18n.t("past_events.title")}</h2>
      <div className="flex flex-col sm:flex-row sm:flex-wrap h-full w-full">
        {
          pastEvents.length == 0 ?
            <div className="loader" /> :
            pastEvents.map((event, index) => {
              return <PastEventCard key={index} event={event} index={index} />;
            })
        }
      </div>
    </Section>
  );
}

export default PastEvents;
