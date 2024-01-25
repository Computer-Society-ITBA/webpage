import React, { useEffect, useState } from 'react';
// Translations
import i18n from '../../i18n/index.js';
import classlist from '../../js/classlist';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

// Components
const Section = React.lazy(() => import('../section'));

function Stats () {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    getDoc(doc(db, "/stats/stats")).then((response) => {
      const data = response.data();

      setStats([
        {
          stat: `+${data.events}`,
          title: "stats.stat_events.title"
        },
        {
          stat: `+${data.participants}`,
          title: "stats.stat_participants.title"
        },
        {
          stat: `+${data.countries}`,
          title: "stats.stat_countries.title"
        }
      ])
    })
  }, [db]);

  return (<Section id="numbers" bgColor="bg-brand_primary" flex="only">
      <div className="flex flex-col w-full sm:flex-row items-baseline justify-center">
        {stats.map((stat, index) => {
          return (
            <div key={index} className={classlist([
              "flex flex-col items-center w-full sm:w-6/12 md:w-4/12 sm:mb-0",
              index < stats.length - 1 ? 'mb-16' : ''
              ])}>
              <h2 className="text-highlight leading-highlight font-bold">{i18n.t(stat.stat)}</h2>
              <p className="text-h3 leading-h3">{i18n.t(stat.title)}</p>
            </div>
          )
        })}
      </div>
    </Section>)
}

export default Stats;