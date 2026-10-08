import React from "react";

const Footer = React.lazy(() => import("../sections/footer"));
const NavBar = React.lazy(() => import("../metatext/navbar"));

// Vacía por ahora: el archivo de noticias y el interior de cada nota se suman más adelante
function News() {
  window.scrollTo(0, 0);
  return (
    <React.Fragment>
      <NavBar />
      <main className="min-h-screen" />
      <Footer />
    </React.Fragment>
  );
}

export default News;
