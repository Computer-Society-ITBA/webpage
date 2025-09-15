import React from "react";
import i18n from "../../../i18n";

const QHero = () => (
  <section className="flex flex-col justify-center items-center text-center px-5 py-20 min-h-[60vh] text-quantum-white">

    <h1
      className="font-gamejam text-5xl md:text-8xl font-extrabold mb-5 tracking-widest bg-gradient-to-tr from-quantum-primary1 to-quantum-primary2 bg-clip-text text-transparent"
    >
      {i18n.t("quantumJam.qhero.quantumJam")} 2025
    </h1>

    <h2 className="font-gamejam text-2xl md:text-4xl mb-7 text-quantum-primary3">
      {i18n.t("quantumJam.qhero.slogan")}
    </h2>

    <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
      {i18n.t("quantumJam.qhero.description")}
    </p>

    <div className="w-full flex justify-center">
      <a
        href="#register"
        className="font-gamejam text-[1.7rem] mb-5 tracking-wider inline-block rounded-full px-6 py-2 text-center transition-colors max-w-xs w-full bg-quantum-primary3 text-quantum-white hover:bg-quantum-primary2"
      >
        {i18n.t("quantumJam.qhero.register")}
      </a>
    </div>
  </section>
);

export default QHero;
