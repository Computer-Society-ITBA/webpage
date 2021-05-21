import React, { Component } from 'react';

const Hero = React.lazy(() => import('../hero'));
const Nosotros = React.lazy(() => import('../sections/nosotros'));

class Homepage extends Component {
  render() {
    return <React.Fragment>
        <Hero/>
        <Nosotros/>
    </React.Fragment>
  }
}

export default Homepage;