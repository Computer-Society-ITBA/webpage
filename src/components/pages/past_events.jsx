import React from "react";

const Footer = React.lazy(() => import("../sections/footer"));
const NavBar = React.lazy(() => import("../metatext/navbar"));
const PastEventsFull = React.lazy(() => import("../sections/past_events_full"));

function PastEvents() {
  window.scrollTo(0, 0);
  return (
    <React.Fragment>
      <NavBar />
      <PastEventsFull />
      <Footer />
    </React.Fragment>
  );
}

export default PastEvents;
