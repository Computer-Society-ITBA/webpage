import React from "react";
// Translations
import i18n from "../../i18n/index.js";

// Components
const Section = React.lazy(() => import("../section"));
const PastEventsList = React.lazy(() => import("../past_events_list"));

function PastEvents() {
  return (
    <Section bgColor="bg-white" textAlignment="center">
      <h2 className="pt-12">{i18n.t("past_events.title")}</h2>
      <div className="flex flex-col sm:flex-row sm:flex-wrap h-full w-full">
        <PastEventsList orderBy="date" direction="desc" />
      </div>
    </Section>
  );
}

export default PastEvents;
