import React from 'react';

const Footer = React.lazy(() => import('../sections/footer'));
const GoBackNav = React.lazy(() => import('../sections/go_back_nav.jsx'));
const GameJamContent = React.lazy(() => import('../sections/gamejam_content'));



function GameJam () {
  window.scrollTo(0, 0);
  return (<React.Fragment>
        <GoBackNav />
        <GameJamContent/>
        <Footer/>
  </React.Fragment>)
}

export default GameJam;
