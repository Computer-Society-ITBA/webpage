import React, { Component } from 'react';

const Hero = React.lazy(() => import('../hero'));
const Nosotros = React.lazy(() => import('../sections/nosotros'));
const WorkWithUs = React.lazy(() => import('../sections/work_with_us'));

class Homepage extends Component {
  render() {
    return <React.Fragment>
        <Hero/>
        <Nosotros/>
        <WorkWithUs/>
    </React.Fragment>
  }
}

export default Homepage;