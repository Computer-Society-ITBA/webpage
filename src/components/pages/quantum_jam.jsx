import React from 'react';
const Footer = React.lazy(() => import('../sections/footer'));
const GoBackNav = React.lazy(() => import('../sections/go_back_nav'));
import QuantumStarsBackground from '../QuantumStarsBackground';
import QHero from '../sections/quantumjam/qhero';
import QAbout from '../sections/quantumjam/qabout';
import QCountdown from '../sections/quantumjam/qcountdown';
import QSchedule from '../sections/quantumjam/qschedule';
import QWorkshops from '../sections/quantumjam/qworkshops';


function QuantumJam() {
  window.scrollTo(0, 0);
  return (
    <React.Fragment>
        <QuantumStarsBackground />
        <GoBackNav color="#ffffff" hoverColor="#c874d9" where='/#upcoming-events'/>
        <QHero />
        <QAbout />
        <QWorkshops/>
        <QCountdown />
        <QSchedule />
        <Footer color={'linear-gradient(90deg, #ff006e 0%, #8338ec 50%, #3a86ff 100%)'} textColor='black'/>
    </React.Fragment>
  );
}

export default QuantumJam;
