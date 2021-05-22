import React from 'react';
// Translations
import i18n from '../../i18n/index.js';

// Icons
import Icon from '@mdi/react'
import { mdiInstagram, mdiLinkedin, mdiWeb } from '@mdi/js';

import team from '../../data/team'
const teamImages = require.context("../../images/team/", true, /^.*$/)

// Components
const Section = React.lazy(() => import('../section'));

function Team () {
  return (<Section id="our-team" bgColor="bg-white" textAlignment="center" className="h-full">
      <h2>{i18n.t('team.title')}</h2>
      <div className="flex flex-row flex-wrap h-full">
        {
          team.map((person, index) => {
            return (
              <div key={index} className="flex flex-col w-6/12 sm:w-4/12 md:w-3/12 lg:w-2/10 h-auto">
                <div className="flex flex-col rounded-xl items-center shadow-xl p-2 m-4 mb-6 h-full">
                  <img className="rounded-full w-9/12" src={teamImages(`./${person.image.src}`).default} alt={i18n.t(person.image.alt)} />
                  <h4>{person.name}</h4>
                  <p className="font-light uppercase opacity-75 mb-2">{i18n.t(person.title)}</p>
                  <div className="flex flex-row justify-center items-center w-full mt-auto">
                    {person.social.map((item, index) => {
                      let icon = undefined
                      let className = "px-2 text-typography_primary transform duration-100 "

                      switch (item.logo) {
                        case 'web': 
                          icon = mdiWeb
                          className = className + "hover:text-red-700 hover:scale-125 focus:text-red-700 focus:scale-125 focus:outline-none"
                        break;
                        case 'linkedin': 
                          icon = mdiLinkedin
                          className = className + "hover:text-blue-700 hover:scale-125 focus:text-blue-700 focus:scale-125 focus:outline-none"
                        break;
                        case 'instagram': 
                        default:
                          icon = mdiInstagram
                          className = className + "hover:text-purple-700 hover:scale-125 focus:text-purple-700 focus:scale-125 focus:outline-none"
                      }

                      return (
                        <a key={index} href={item.href} target="_blank" rel="noreferrer" className={className}>
                            <Icon path={icon}
                            size={1}
                            className="focus:outline-none"
                            />
                        </a>
                        )
                    })}
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </Section>)
}

export default Team;