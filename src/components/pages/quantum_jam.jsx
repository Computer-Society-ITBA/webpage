import React from 'react';
const Footer = React.lazy(() => import('../sections/footer'));
const GoBackNav = React.lazy(() => import('../sections/go_back_nav'));
import QuantumStarsBackground from '../QuantumStarsBackground';
import QHero from '../sections/quantumjam/qhero';
import QAbout from '../sections/quantumjam/qabout';


function QuantumJam() {
  window.scrollTo(0, 0);
  return (
    <React.Fragment>
        <QuantumStarsBackground />
        <GoBackNav color="#ffffff" hoverColor="#c874d9" />
        <QHero />
        <QAbout />
        <Footer color={'linear-gradient(90deg, #ff006e 0%, #8338ec 50%, #3a86ff 100%)'}/>
    </React.Fragment>
  );
}

export default QuantumJam;
