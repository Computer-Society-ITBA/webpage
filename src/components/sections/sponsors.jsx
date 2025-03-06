import React, { useEffect, useState } from 'react';
// Translations
import i18n from '../../i18n/index.js';

//Imports from firebase
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';


// Components
const Section = React.lazy(() => import('../section'));
import Marquee from 'react-fast-marquee';

function Sponsors() {
  const settings = {
    gradient: 'true',
    direction: 'left',
    speed: 70,
  }

  const [sponsors, setSponsors] = useState([]);
  const [mainSponsors, setMainSponsors] = useState([]);

  useEffect(() => {
    async function fetchSponsors() {;
      const query = await getDocs(collection(db, 'sponsors'));
      const data = query.docs.map((doc) => doc.data());
      setSponsors(data);
      console.log('all sponsors', data)
    }
    async function fetchMainSponsors() {;
      const query = await getDocs(collection(db, 'main_sponsors'));
      const data = query.docs.map((doc) => doc.data());
      setMainSponsors(data);
      console.log('main sponsor', data)
    }
    fetchSponsors();
    fetchMainSponsors();
  }, []);



  return (
    <Section id='our-sponsors' bgColor='bg-white' textAlignment='center'>
      <h2>{i18n.t('sponsors.title')}</h2>
        {mainSponsors.map((sponsor, index) => (
          <div key={index} className='mx-5' >
            <a href={sponsor.url} rel='noreferrer' target='_blank' className='inline-block'>
              <img src={sponsor.src} alt={i18n.t('sponsors.logo').replace('{name}', sponsor.name)} className=' h-48 mx-auto my-4' />
            </a>
          </div>
        ))}
      <h3 className='pt-20'>{i18n.t('sponsors.subtitle')}</h3>
      <Marquee {...settings}>
        {sponsors.map((sponsor, index) => (
          <div key={index} className='py-10 px-5 mx-10' >
            <a href={sponsor.link} rel='noreferrer' target='_blank'>
              <img src={sponsor.src} alt={i18n.t('sponsors.logo').replace('{name}', sponsor.name)} className=' h-16 my-0 mx-auto' />
            </a>
          </div>
        ))}
      </Marquee>
    </Section>
  )
}


export default Sponsors;
