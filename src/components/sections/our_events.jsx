import React from 'react';

// Translations
import i18n from '../../i18n/index.js';

import ourEvents from '../../data/our_events.json';

import gamejam_logo from '../../images/gamejam_logo_alt.png';
import hackitba_logo from '../../images/hackitba_logo.png';

import PlaceIcon from '@mui/icons-material/Place';
import Groups3Icon from '@mui/icons-material/Groups3';
import DateRangeIcon from '@mui/icons-material/DateRange';

// Components
const Section = React.lazy(() => import('../section'));
const LinkButton = React.lazy(() => import('../link_button'));

function OurEvents() {
  return (
    <Section
      id='our-events'
      bgColor='bg-white'
      textAlignment='left'
      className='overflow-hidden'
    >
      <h2 className='text-center'>{i18n.t('our_events.title')}</h2>

      <div className='our-events flex flex-col lg:flex-row gap-8 mt-10 '>
            {
                ourEvents.map((event, index) => {
                    return (
                        <div key={index} className='rounded-3xl shadow-xl items-center w-full flex flex-col gap-8 pb-8'>
                            <div className='bg-cover bg-center w-full h-40 rounded-t-3xl flex justify-center items-center'>
                                <img className={index==0 ? 'w-80' : 'w-60 mt-4'} src={index==0 ? hackitba_logo : gamejam_logo} alt={i18n.t(event.logo_alt)}/>
                            </div>

                            <div className='px-14 flex flex-col w-full gap-4'>
                                <div className='grid lg:grid-cols-2'>
                                    <div className='flex flex-row gap-3'>
                                        <DateRangeIcon className='text-gray-400 pb-1' />
                                        <p className='text-gray-400'>{i18n.t(event.date_prompt)}</p>
                                    </div>
                                    <div>
                                        <p >{i18n.t(event.date)}</p>
                                    </div>
                                </div>
                                <div className='grid lg:grid-cols-2'>
                                    <div className='flex flex-row gap-3'>
                                        <PlaceIcon className='text-gray-400 pb-1' />
                                        <p className='text-gray-400'>{i18n.t(event.location_prompt)}</p>
                                    </div>
                                    <div>
                                        <p >{i18n.t(event.location)}</p>
                                    </div>
                                </div>
                                <div className='grid lg:grid-cols-2'>
                                    <div className='flex flex-row gap-3'>
                                        <Groups3Icon className='text-gray-400 pb-1' />
                                        <p className='text-gray-400'>{i18n.t(event.participants_prompt)}</p>
                                    </div>
                                    <div>
                                        <p >{i18n.t(event.participants)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='px-8 flex grow justify-self-end'>
                                <LinkButton smooth href={event.cta_link} target='blank' className='w-40 self-end h-max text-center' text={i18n.t(event.cta_prompt)} />
                            </div>
                        </div>
                    )
                })
            }
      </div>
    </Section>
  );
}

export default OurEvents;
