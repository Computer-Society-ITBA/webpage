import React from 'react';
import i18n from '../../i18n/index.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';
import { HashLink as Link } from 'react-router-hash-link';
import logo from '../../images/logo_nav.png';

function GoBackNav({ color = '#212121', hoverColor = '#F98A04', where='/' }) {
  return (
    <div
      className="flex justify-between p-2"
      style={{ '--nav-color': color, '--nav-hover': hoverColor }}
    >
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Link smooth to="/#">
          <img src={logo} alt="Computer Society Logo" className="w-12 ml-5" />
        </Link>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Link
          smooth
          to={where}
          className="py-4 px-8 flex flex-row gap-4 items-center w-auto transition-colors duration-200 text-[var(--nav-color)] hover:text-[var(--nav-hover)]"
        >
          <ArrowBackIcon fontSize="large" />
          {i18n.t('go_back')}
        </Link>
      </motion.div>
    </div>
  );
}

export default GoBackNav;
