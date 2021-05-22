import React from 'react';
// Translations
import i18n from '../../i18n/index.js';

// Components
const Section = React.lazy(() => import('../section'));

function Team () {
  return (<Section id="our-team" bgColor="bg-white" textAlignment="center" sizeMobile="full" size="full" sizeLg="full">
      <h2>{i18n.t('team.title')}</h2>
    </Section>)
}

export default Team;