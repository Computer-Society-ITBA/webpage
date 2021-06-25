import React from 'react';
// Translations
import i18n from '../../i18n/index.js';

// Components
const Section = React.lazy(() => import('../section'));

function Contact () {
  return (<Section id="contact" bgColor="bg-brand_primary" textAlignment="center" sizeMobile="full" size="almost" sizeLg="almost">
      <h2>{i18n.t('contact.title')}</h2>
    </Section>)
}

export default Contact;