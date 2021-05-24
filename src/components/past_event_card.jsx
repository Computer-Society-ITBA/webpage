import React from 'react';
// Translations
import i18n from '../i18n/index.js';
// Icons
import Icon from "@mdi/react";
import { mdiYoutube } from "@mdi/js";

function LinkButton (props) {
    const {event, index} = props
    return (
    <div key={index} className="flex flex-col w-full sm:w-6/12 md:w-4/12 h-3/6">
        <div className="flex flex-col rounded-xl items-center text-left shadow-xl h-full p-4 m-4 mb-6">
          <h3 className="font-bold mb-2 flex flex-row">
            {event.title}
            {event.youtube ? (<a
              href={event.youtube}
              target="_blank"
              rel="noreferrer"
              className="animate-pulse hover:animate-none focus:animate-none text-typography_primary transform cursor-pointer duration-100 hover:text-red-700 focus:text-red-700 focus:outline-none"
            >
              <Icon
                path={mdiYoutube}
                size={1.5}
                className="ml-1 text-h5 leading-h5 focus:outline-none"
              />
            </a>) : null}
          </h3>
          <div className="flex flex-row justify-between mb-4 w-full">
            <p className="font-light">{i18n.t(event.date)}</p>
            <p className="text-brand_primary">{i18n.t('past_events.inscriptions', {n: event.attendants})}</p>
          </div>
          <p>{i18n.t(event.description)}</p>
        </div>
    </div>
    )
}

export default LinkButton; 