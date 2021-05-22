import React, { Component } from 'react';

const Hero = React.lazy(() => import('../hero'));
const MisionVision = React.lazy(() => import('../sections/mision_vision'));
const Nosotros = React.lazy(() => import('../sections/nosotros'));
const Stats = React.lazy(() => import('../sections/stats'));
const WorkWithUs = React.lazy(() => import('../sections/work_with_us'));

class Homepage extends Component {
  render() {
    return <React.Fragment>
        <Hero/>
        <Nosotros/>
        <MisionVision/>
        <Stats/>
        <WorkWithUs/>
    </React.Fragment>
  }
}

export default Homepage;