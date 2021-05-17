import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files
import en from './en';
import es from './es';

const options = {
  // order and from where user language should be detected
  // Set automatic setting by default, will take browser language
  order: ['navigator', 'querystring', 'cookie', 'localStorage', 'sessionStorage', 'htmlTag', 'path', 'subdomain'],

  // keys or params to lookup language from
  lookupQuerystring: 'lng',
}

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,
    detection: options,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      es: {translation: es},
      en: {translation: en},
    }
  });

export default i18n;