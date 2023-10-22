import React from 'react';
// Translations
import i18n from '../../i18n/index.js';

import useWindowDimensions from "../../hooks/useWindowDimensions";

// Components
const Section = React.lazy(() => import('../section'));
const LinkButton = React.lazy(() => import('../link_button'));
const PastEventsList = React.lazy(() => import('../past_events_list'));

function PastEvents() {
  const { width } = useWindowDimensions();
  const n = width >= 768 ? 6 : (width >= 640 ? 4 : 2)


  return (
    <Section id="past-events" bgColor="bg-white" textAlignment="center">
      <h2>{i18n.t('past_events.title')}</h2>
      <div className="flex flex-col sm:flex-row sm:flex-wrap h-full w-full">
        <PastEventsList orderBy="attendants" direction="desc" limit={n} />
      </div>
      <div className="flex flex-row w-full justify-center items-center mt-4">
        <LinkButton href="/past-events/#" type="outlined-dark" text={i18n.t('past_events.button')} />
      </div>
    </Section>
  )
}

export default PastEvents;