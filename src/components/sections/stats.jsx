import React from 'react';
// Translations
import i18n from '../../i18n/index.js';

// Data
import stats from '../../data/stats.json'

// Components
const Section = React.lazy(() => import('../section'));

function Stats () {
  return (<Section id="about-us" bgColor="bg-brand_primary" sizeMobile="full" size="third" sizeLg="third" flex="only">
      <div className="flex flex-col w-full sm:flex-row items-center justify-center">
        {stats.map(stat => {
          return (
            <div className="flex flex-col items-center w-full sm:w-6/12 md:w-4/12 mb-16 sm:mb-0">
              <h2 className="text-highlight leading-highlight font-bold">{i18n.t(stat.stat)}</h2>
              <p className="text-h3 leading-h3">{i18n.t(stat.title)}</p>
            </div>
          )
        })}
      </div>
    </Section>)
}

export default Stats;