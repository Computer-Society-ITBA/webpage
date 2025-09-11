import React from 'react';
// Translations
import i18n from '../../i18n/index.js';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { motion } from 'framer-motion';
import { HashLink as Link } from 'react-router-hash-link';

import logo from '../../images/logo_nav.png';

// Components
const Section = React.lazy(() => import('../section'));

function GoBackNav() {
  return (
    <div className='flex justify-between p-2'>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Link smooth to='/#'>
          <img
            src={logo}
            alt='Computer Society Logo'
            className='w-12 ml-5'
          />
        </Link>
      </motion.div>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Link
          smooth
          to='/#'
          className='hover:text-brand_secondary py-4 px-8 flex flex-row gap-4 items-center w-auto'
        >
          <ArrowBackIcon fontSize='large' />
          {i18n.t('go_back')}
        </Link>
      </motion.div>
    </div>
  );
}

export default GoBackNav;
