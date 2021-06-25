import React from 'react';
// Translations
import i18n from '../../i18n/index.js';

// Components
const Section = React.lazy(() => import('../section'));

function CreditsContent () {
  return (<Section id="credits" bgColor="bg-white" className="h-screen w-full">
      <div className="flex flex-col justify-center items-center h-full w-full">
        <h2 className="mb-12">{i18n.t('credits.title')}</h2>
        <p className="w-full sm:w-8/12 sm:text-h4 sm:leading-h4">{i18n.t('credits.description')}</p>
        <ul className="mt-8 text-h4 leading-h4 sm:text-h3 sm:leading-h3">
          <li className="m-4 font-bold">Gonzalo Hirsch</li>
          <li className="m-4 font-bold">Juan Pablo Oriana</li>
          <li className="m-4 font-bold">Gian Luca Pecile</li>
        </ul>
      </div>
    </Section>)
}

export default CreditsContent;