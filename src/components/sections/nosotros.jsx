import React from 'react';
// Translations
import i18n from '../../i18n/index.js';
// Animations
import { motion } from 'framer-motion'
import { InView } from 'react-intersection-observer';

// Components
const Section = React.lazy(() => import('../section'));

function Nosotros () {
  return (<Section id="about-us" bgColor="bg-brand_primary" sizeMobile="full" size="almost" sizeLg="half" flex="only">
      <div className="flex flex-col sm:flex-row justify-between sm:justify-center">
        <InView threshold={0.5}>
          {({ref, inView}) => (
            <motion.div 
            ref={ref}
            className="text-left mb-4 sm:mb-0"
            initial='hidden'
            animate={inView ? {opacity: 1} : {opacity: 0}}
            transition={{duration: 0.5}}
            >
              <h2>{i18n.t('about_us.we_are')}</h2>
              <p>{i18n.t('about_us.we_are_text')}</p>
            </motion.div>
          )}
        </InView>
        <InView threshold={0.75}>
          {({ref, inView}) => (
            <motion.div 
            ref={ref}
            className="border-typography_primary border-b sm:border-r sm:border-b-0 my-4 sm:mx-8 sm:my-0 w-full sm:h-full sm:w-0"
            initial={{scale: 0}}
            animate={inView ? {scale: 1} : {scale: 0}}
            transition={{duration: 1}}
            />
          )}
        </InView>
        <InView threshold={0.5}>
          {({ref, inView}) => (
            <motion.div 
            ref={ref}
            className="text-right"
            initial='hidden'
            animate={inView ? {opacity: 1} : {opacity: 0}}
            transition={{duration: 0.5}}
            >
              <h2>{i18n.t('about_us.we_do')}</h2>
              <p>{i18n.t('about_us.we_do_text')}</p>
            </motion.div>
          )}
        </InView>
      </div>
    </Section>)
}

export default Nosotros;