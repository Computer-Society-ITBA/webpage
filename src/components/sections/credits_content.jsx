import React from 'react';
// Translations
import i18n from '../../i18n/index.js';
// Data
import creditsData from '../../data/credits.json';

// Components
const Section = React.lazy(() => import('../section'));

function CreditsContent() {
  return (
    <Section id="credits" bgColor="bg-gradient-to-b from-white to-gray-50" className="w-full py-20">
      <div className="flex flex-col justify-center items-center w-full px-4 max-w-7xl mx-auto">
        <h2 className="mb-6 text-center">{i18n.t('credits.title')}</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-full mb-10"></div>
        <p className="w-full sm:w-10/12 lg:w-8/12 sm:text-h4 sm:leading-h4 text-center mb-16 text-gray-700">
          {i18n.t('credits.description')}
        </p>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {creditsData.team.map((name, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-100"
            >
              <p className="font-bold text-center text-lg text-gray-800">
                {name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default React.memo(CreditsContent);