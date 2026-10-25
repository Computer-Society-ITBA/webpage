import React from 'react';
// Translations
import i18n from '../../i18n/index.js';

import useWindowDimensions from "../../hooks/useWindowDimensions";
import usePastEvents from "../../hooks/usePastEvents";

// Styles
import "../../styles/past-events.css";

import PastEventRow from '../past_event_row';

// Components
const Section = React.lazy(() => import('../section'));
const LinkButton = React.lazy(() => import('../link_button'));

function PastEvents() {
  const { width } = useWindowDimensions();
  const events = usePastEvents(4);
  const n = width >= 640 ? 4 : 2


  return (
    <Section id="past-events" bgColor="bg-light" textAlignment="left" padding="no" className="cs-past cs-past--light">
      <div className="cs-past__inner">
        <h2 className="!mb-0 text-[2rem] !leading-[1.15] sm:text-[2.25rem]">{i18n.t('past_events.title')}</h2>
        <div className="mt-[18px] h-[3px] w-[50px] bg-brand_secondary" />
        {events === null ? (
          <div className="loader" />
        ) : (
          <ol className="cs-rail">
            {events.slice(0, n).map((event, index) => (
              <PastEventRow key={event.id} event={event} featured={index === 0} />
            ))}
          </ol>
        )}
        <div className="cs-past-more">
          <LinkButton href="/past-events/#" type="outlined-dark" text={i18n.t('past_events.button')} className="leading-base" />
        </div>
      </div>
    </Section>
  )
}

export default PastEvents;
