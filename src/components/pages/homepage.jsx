import React, { Component } from 'react';

const Hero = React.lazy(() => import('../hero'));

class Homepage extends Component {
  render() {
    return <React.Fragment>
        <Hero/>
    </React.Fragment>
  }
}

export default Homepage; // Don’t forget to use export default!