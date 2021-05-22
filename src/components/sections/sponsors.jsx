import React from 'react';
// Translations
import i18n from '../../i18n/index.js';

// Components
const Section = React.lazy(() => import('../section'));

function Sponsors () {
  return (<Section id="our-sponsors" bgColor="bg-white" textAlignment="center" sizeMobile="full" size="almost" sizeLg="almost">
      <h2>{i18n.t('sponsors.title')}</h2>
    </Section>)
}

export default Sponsors;