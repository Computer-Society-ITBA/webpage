import React from 'react';
// Translations
import i18n from '../../i18n/index.js';

// Data
import sponsors from '../../data/sponsors'

// Images
const sponsorImages = require.context("../../images/sponsors/", true, /^.*$/)

// Components
const Section = React.lazy(() => import('../section'));

function Sponsors () {
  return (<Section id="our-sponsors" bgColor="bg-white" textAlignment="center" sizeLg="almost">
      <h2>{i18n.t('sponsors.title')}</h2>
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center w-full h-full">
        {
          sponsors.map((sponsor, index) => {
            return (
              <div key={index} className="w-full md:w-4/12 lg:w-3/12 h-2/6 sm:h-3/6 p-2 flex flex-col justify-center items-center">
                <img className="max-h-full max-w-full object-contain" src={sponsorImages(`./${sponsor.src}`).default} alt={i18n.t(sponsor.alt)} />
              </div>
            )
          })
        }
      </div>
    </Section>)
}

export default Sponsors;