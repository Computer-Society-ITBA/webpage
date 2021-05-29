import React from 'react';
// Translations
import i18n from '../../i18n/index.js';

import Icon from "@mdi/react";
import {
  mdiInstagram,
  mdiLinkedin,
  mdiYoutube
} from "@mdi/js";

import social from '../../data/social'

// Components
const Section = React.lazy(() => import('../section'));
const ContactForm = React.lazy(() => import('../contact_form'));

function ContactUs () {
  return (<Section id="contact-us" bgColor="bg-brand_primary" textAlignment="center">
      <h2>{i18n.t('contact_us.title')}</h2>
      <div className="flex flex-col sm:flex-row w-full h-full">
        <div className="flex flex-col w-full sm:w-6/12 h-full">
          <h3>{i18n.t('contact_us.email')}</h3>
          <ContactForm/>
        </div>
        <div className="flex flex-col w-full sm:w-6/12 mt-4 sm:mt-0 h-full items-center">
          <h3>{i18n.t('contact_us.networks')}</h3>
          <div className="flex flex-col w-auto items-start">
            {social.map((item, index) => {
              let icon = undefined
              let className = "mr-2 text-typography_primary transform duration-100 "
              let textClassName = "group flex flex-row items-center text-typography_primary text-h4 leading-h4 my-2 transform duration-100 "
              switch (item.logo) {
                  case 'youtube': 
                    icon = mdiYoutube
                    className = className + "group-hover:text-red-700 group-hover:scale-125 group-focus:text-red-700 group-focus:scale-125 group-focus:outline-none"
                    textClassName = textClassName + "hover:text-red-700 active:text-red-700 focus:text-red-700 focus:outline-none"
                  break;
                  case 'linkedin': 
                    icon = mdiLinkedin
                    className = className + "group-hover:text-blue-700 group-hover:scale-125 group-focus:text-blue-700 group-focus:scale-125 group-focus:outline-none"
                    textClassName = textClassName + "hover:text-blue-700 active:text-blue-700 focus:text-blue-700 focus:outline-none"
                  break;
                  case 'instagram': 
                  default:
                    icon = mdiInstagram
                    className = className + "group-hover:text-purple-700 group-hover:scale-125 group-focus:text-purple-700 group-focus:scale-125 group-focus:outline-none"
                    textClassName = textClassName + "hover:text-purple-700 active:text-purple-700 focus:text-purple-700 focus:outline-none"
              }
              return (
                <a key={index} href={item.href} target="_blank" rel="noreferrer" className={textClassName}>
                    <Icon path={icon}
                    size={1.5}
                    className={className}
                    />
                    {item.text}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </Section>)
}

export default ContactUs;