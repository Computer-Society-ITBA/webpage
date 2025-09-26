import React from "react";
import i18n from "../../../i18n";

const QAbout = () => (
  <section className="flex justify-center items-center min-h-[50vh] w-full mb-16">
    <div className="bg-quantum-dark border-2 border-quantum-secondary1 text-quantum-white rounded-[22px] px-8 pt-10 pb-14 max-w-3xl w-full text-center shadow-none">

      <h2 className="text-4xl md:text-5xl font-quantumjam-JetBrains-Mono tracking-wider font-bold text-quantum-primary1 mb-12 text-center">
              {i18n.t("quantumJam.qabout.title")}
           </h2>

      <p className="text-[1.15rem] leading-7">
        {i18n.t("quantumJam.qabout.text")}
      </p>

      <ul className="list-none p-0 mt-10 text-left max-w-md mx-auto">
        <li className="flex items-center mb-2">
          <span className="text-xl mr-2">📅</span>
          <span className="text-quantum-white">
            {i18n.t("quantumJam.qabout.date")}
          </span>
        </li>
        <li className="flex items-center mb-2">
          <span className="text-xl mr-2">📍</span>
          <span className="text-quantum-white">
            {i18n.t("quantumJam.qabout.location")}
          </span>
        </li>
        <li className="flex items-center">
          <span className="text-xl mr-2">👥</span>
          <span className="text-quantum-white">
            {i18n.t("quantumJam.qabout.participants")}
          </span>
        </li>
      </ul>
    </div>
  </section>
);

export default QAbout;
