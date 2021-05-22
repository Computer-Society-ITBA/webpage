import React from 'react';
// Translations
import i18n from '../../i18n/index.js';

// Components
const Section = React.lazy(() => import('../section'));
const LinkButton = React.lazy(() => import('../link_button'));

function WorkWithUs () {
  return (<Section id="about-us" bgColor="bg-brand_primary" sizeMobile="third" size="third" sizeLg="third" flex="only" padding="large">
      <div className="flex flex-col lg:flex-row w-full items-center justify-center lg:justify-between">
        <h3 className="font-bold mb-8 lg:mb-0">{i18n.t('work_with_us.work')}</h3>
        <LinkButton href="#about-us" type="outlined-dark" text={i18n.t('work_with_us.button')} />
      </div>
    </Section>)
}

export default WorkWithUs;
