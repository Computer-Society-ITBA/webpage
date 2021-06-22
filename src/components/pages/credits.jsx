import React from 'react';

const Footer = React.lazy(() => import('../sections/footer'));
const NavBar = React.lazy(() => import('../metatext/navbar'));
const CreditsContent = React.lazy(() => import('../sections/credits_content'));

function Credits () {
  return (<React.Fragment>
      <NavBar/>
      <CreditsContent/>
      <Footer/>
  </React.Fragment>)
}

export default Credits;