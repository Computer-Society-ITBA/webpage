import React from 'react';
// Translations
import i18n from '../../i18n/index.js';
// Animations
import { motion } from 'framer-motion'
import { InView } from 'react-intersection-observer';

// Components
const Section = React.lazy(() => import('../section'));

function MisionVision () {
  return (<Section id="mision-vision" bgColor="bg-white" sizeMobile="full" size="almost" sizeLg="almost" flex="only" padding="no">
      <div className="flex flex-col w-full relative overflow-hidden">
        <div className="bg-white w-full h-3/6 sm:h-4/6 px-8 py-8 sm:px-12 sm:py-12 text-right">
          <h3 className="font-bold">{i18n.t('mision_vision.mision_text')}</h3>
          <p className="text-h4 leading-h4 mt-8">{i18n.t('mision_vision.mision')}</p>
        </div>
        {/* transform skew-y-6 md:skew-y-3 translate-x-4 -translate-y-16 sm:-translate-y-6 md:-translate-y-8 */}
        <InView threshold={0.5}>
          {({ref, inView}) => (
            <motion.div 
            className="bg-brand_secondary w-full h-3/6 bottom-0 absolute z-10 md:hidden"
            ref={ref}
            initial={{y: 0, skewY: 0, translateX: 0}}
            animate={inView ? {y: -64, skewY: 6, translateX: 16} : {y: 0, skewY: 0, translateX: 0}}
            transition={{duration: 0.5}}
            >
            </motion.div>
          )}
        </InView>
        <InView threshold={0.5}>
          {({ref, inView}) => (
            <motion.div 
            className="bg-brand_secondary w-full h-3/6 bottom-0 absolute z-10 invisible sm:visible"
            ref={ref}
            initial={{y: 32, skewY: 0, translateX: 0}}
            animate={inView ? {y: -32, skewY: 3, translateX: 16} : {y: 32, skewY: 0, translateX: 0}}
            transition={{duration: 0.5}}
            >
            </motion.div>
          )}
        </InView>
        <div className="bg-brand_primary w-full h-3/6 bottom-0 absolute z-20 transform -translate-y-12 sm:-translate-y-0 md:-translate-y-4 skew-y-6 md:skew-y-3">
        </div>
        <div className="bg-brand_primary w-full h-3/6 sm:h-3/6 z-30 self-end px-8 pb-8 sm:px-12 sm:pb-12 text-left flex flex-col justify-end">
          <p className="text-h4 leading-h4 -mt-8 mb-8">{i18n.t('mision_vision.vision')}</p>
          <h3 className="font-bold mb-0">{i18n.t('mision_vision.vision_text')}</h3>
        </div>
      </div>
    </Section>)
}

export default MisionVision;