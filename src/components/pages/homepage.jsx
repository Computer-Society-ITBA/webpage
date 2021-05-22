import React, { Component } from 'react';

const Footer = React.lazy(() => import('../sections/footer'));
const Hero = React.lazy(() => import('../sections/hero'));
const MisionVision = React.lazy(() => import('../sections/mision_vision'));
const Nosotros = React.lazy(() => import('../sections/nosotros'));
const PastEvents = React.lazy(() => import('../sections/past_events'));
const Sponsors = React.lazy(() => import('../sections/sponsors'));
const Stats = React.lazy(() => import('../sections/stats'));
const Team = React.lazy(() => import('../sections/team'));
const UpcomingEvents = React.lazy(() => import('../sections/upcoming_events'));
const WorkWithUs = React.lazy(() => import('../sections/work_with_us'));

class Homepage extends Component {
  render() {
    return <React.Fragment>
        <Hero/>
        <Nosotros/>
        <MisionVision/>
        <UpcomingEvents/>
        <Stats/>
        <PastEvents/>
        <WorkWithUs/>
        <Team/>
        <Sponsors/>
        <Footer/>
    </React.Fragment>
  }
}

export default Homepage;