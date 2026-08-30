import React, { useEffect, useState } from 'react';
// Translations
import i18n from '../../i18n/index.js';

//Imports from firebase
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';


// Components
const Section = React.lazy(() => import('../section'));

function Sponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [mainSponsors, setMainSponsors] = useState([]);

  useEffect(() => {
    async function fetchSponsors() {;
      const query = await getDocs(collection(db, 'sponsors'));
      const data = query.docs.map((doc) => doc.data());
      setSponsors(data);
    }
    async function fetchMainSponsors() {;
      const query = await getDocs(collection(db, 'main_sponsors'));
      const data = query.docs.map((doc) => doc.data());
      setMainSponsors(data);
    }
    fetchSponsors();
    fetchMainSponsors();
  }, []);



  return (
    <Section id='our-sponsors' bgColor='bg-white' textAlignment='center'>
      <h2>{i18n.t('sponsors.title')}</h2>
      <div className='flex flex-wrap justify-center gap-8 my-12 px-4'>
        {mainSponsors.map((sponsor, index) => (
          <div key={index} className='flex justify-center'>
            <a href={sponsor.url} rel='noreferrer' target='_blank' className='inline-block'>
              <div className='w-96 h-56 flex items-center justify-center hover:scale-105 transition-transform'>
                <img src={sponsor.src} alt={i18n.t('sponsors.logo').replace('{name}', sponsor.name)} className='max-w-full max-h-full object-contain' />
              </div>
            </a>
          </div>
        ))}
      </div>
      <h3 className='pt-20'>{i18n.t('sponsors.subtitle')}</h3>
      <div className='flex flex-wrap justify-center gap-8 my-12 px-4'>
        {sponsors.map((sponsor, index) => (
          <div key={index} className='flex items-center justify-center'>
            <a href={sponsor.link} rel='noreferrer' target='_blank'>
              <div className='w-40 h-20 flex items-center justify-center'>
                <img src={sponsor.src} alt={i18n.t('sponsors.logo').replace('{name}', sponsor.name)} className='max-w-full max-h-full object-contain' />
              </div>
            </a>
          </div>
        ))}
      </div>
    </Section>
  )
}


export default Sponsors;
