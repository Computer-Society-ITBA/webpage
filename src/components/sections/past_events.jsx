import React from 'react';
// Translations
import i18n from '../../i18n/index.js';

import useWindowDimensions from "../../hooks/useWindowDimensions";

import past_events from '../../data/past_events'

const filterNEvents = (n, events) => {
  events.sort((a, b) => {
    if(a.attendants === b.attendants) {
      return b.attendants;
    } else {
      return b.attendants - a.attendants;
    }
  });
  return events.slice(0, n)
} 
const past_events_copy = [...past_events]

// Components
const Section = React.lazy(() => import('../section'));
const LinkButton = React.lazy(() => import('../link_button'));
const PastEventCard = React.lazy(() => import('../past_event_card'));

function PastEvents () {
  const { width } = useWindowDimensions();
  const n = width >= 768 ? 6 : (width >= 640 ? 4 : 2)
  const filteredEvents = filterNEvents(n, past_events_copy)
  return (<Section id="past-events" bgColor="bg-white" textAlignment="center">
      <h2>{i18n.t('past_events.title')}</h2>
      <div className="flex flex-col sm:flex-row sm:flex-wrap h-full w-full">
        {
          filteredEvents.map((event, index) => {
            return (
              <PastEventCard key={index} event={event} index={index}/>
            )
          })
        }
      </div>
      <div className="flex flex-row w-full justify-center items-center mt-4">
      <LinkButton href="/past-events/#" type="outlined-dark" text={i18n.t('past_events.button')}/>
      </div>
    </Section>)
}

export default PastEvents;