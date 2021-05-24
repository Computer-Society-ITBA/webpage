import React from 'react';

const Footer = React.lazy(() => import('../sections/footer'));
const Hero = React.lazy(() => import('../sections/hero'));
const NavBar = React.lazy(() => import('../metatext/navbar'));
const PastEventsFull = React.lazy(() => import('../sections/past_events_full'));

function Homepage () {
  return (<React.Fragment>
      <NavBar/>
      <PastEventsFull/>
      <Footer/>
  </React.Fragment>)
}

export default Homepage;