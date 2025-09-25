import React from 'react';

const ContactUs = React.lazy(() => import('../sections/contact_us'));
const Footer = React.lazy(() => import('../sections/footer'));
const Hero = React.lazy(() => import('../sections/hero'));
const MisionVision = React.lazy(() => import('../sections/mision_vision'));
const NavBar = React.lazy(() => import('../metatext/navbar'));
const Nosotros = React.lazy(() => import('../sections/nosotros'));
const PastEvents = React.lazy(() => import('../sections/past_events'));
const Sponsors = React.lazy(() => import('../sections/sponsors'));
const Stats = React.lazy(() => import('../sections/stats'));
const Team = React.lazy(() => import('../sections/team'));
const UpcomingEvents = React.lazy(() => import('../sections/upcoming_events'));
const WorkWithUs = React.lazy(() => import('../sections/work_with_us'));
const OurEvents = React.lazy(() => import('../sections/our_events'));

function Homepage () {
  return (<React.Fragment>
      <NavBar/>
      <Hero/>
      <Nosotros/>
      <OurEvents/>
      <MisionVision/>
      <UpcomingEvents/>
      <Stats/>
      <PastEvents/>
      <WorkWithUs/>
      <Team/>
      <Sponsors/>
      <ContactUs/>
      <Footer IMBQuantumLogo={true} />
  </React.Fragment>)
}

export default Homepage;
