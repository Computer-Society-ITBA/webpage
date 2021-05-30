import React from "react";
// Translations
import i18n from "../../i18n/index.js";

import past_events from "../../data/past_events";

// Components
const Section = React.lazy(() => import("../section"));
const PastEventCard = React.lazy(() => import("../past_event_card"));

function PastEvents() {
  return (
    <Section bgColor="bg-white" textAlignment="center">
      <h2 className="pt-12">{i18n.t("past_events.title")}</h2>
      <div className="flex flex-col sm:flex-row sm:flex-wrap h-full w-full">
        {past_events.map((event, index) => {
          return <PastEventCard event={event} index={index} />;
        })}
      </div>
    </Section>
  );
}

export default PastEvents;
