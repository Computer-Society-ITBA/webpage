import React from 'react';
// Translations
import i18n from '../../i18n/index.js';
// Data
import creditsData from '../../data/credits.json';

// Components
const Section = React.lazy(() => import('../section'));

function CreditsContent() {
  return (
    <Section id="credits" bgColor="bg-white" className="w-full py-16">
      <div className="flex flex-col justify-center items-center w-full px-4 max-w-6xl mx-auto">
        <h2 className="mb-8">{i18n.t('credits.title')}</h2>
        <p className="w-full sm:w-10/12 sm:text-h4 sm:leading-h4 text-center mb-12">
          {i18n.t('credits.description')}
        </p>
        <ul className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-h4 leading-h4 sm:text-h3 sm:leading-h3 list-none p-0">
          {creditsData.team.map((name, index) => (
            <li key={index} className="font-bold text-center">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export default React.memo(CreditsContent);