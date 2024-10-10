import React from 'react';

const Footer = React.lazy(() => import('../sections/footer.jsx'));
const GoBackNav = React.lazy(() => import('../sections/go_back_nav.jsx'));
const HackitContent = React.lazy(() => import('../sections/hackit_content.jsx'));



function Hackit () {
  window.scrollTo(0, 0);
  return (<React.Fragment>
        <GoBackNav />
        <HackitContent/>
        <Footer/>
  </React.Fragment>)
}

export default Hackit;
