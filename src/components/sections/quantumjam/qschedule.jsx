import React, { useEffect, useState, useRef } from "react";
// Translations
import i18n from "../../../i18n/index.js";

// Images and assets
import roadmap_branch from "../../../images/quantumjam_roadmap_branch.svg";

function QSchedule() {
  return (
    (<div className='m-[8rem] text-quantum-white flex flex-col items-center'>
        <div className='flex flex-col'>
           <h2 className="text-4xl md:text-5xl font-gamejam tracking-wider font-bold text-quantum-primary1 mb-12 text-center">
              {i18n.t("quantumJam.qschedule.title")}
           </h2>
          <div className='grid grid-cols-3'>
            <div className='flex flex-col justify-between gap-4'>
              <div>
                <p className='font-gamejam text-3xl '>
                  {i18n.t("quantumJam.qschedule.signups_open.date")}
                </p>
                <p>{i18n.t("quantumJam.qschedule.signups_open.description")}</p>
              </div>
              <img className='h-20' src={roadmap_branch} />
            </div>
            <div className='flex flex-col justify-between gap-4'>
              <div>
                <p className='font-gamejam text-3xl '>
                  {i18n.t("quantumJam.qschedule.competition_starts.date")}
                </p>
                <p>
                  {i18n.t("quantumJam.qschedule.competition_starts.description")}
                </p>
              </div>
              <img className='h-20' src={roadmap_branch} />
            </div>
            <div className='flex flex-col justify-between gap-4'>
              <div>
                <p className='font-gamejam text-3xl '>
                  {i18n.t("quantumJam.qschedule.closing_ceremony.date")}
                </p>
                <p>{i18n.t("quantumJam.qschedule.closing_ceremony.description")}</p>
              </div>
              <img className='h-20' src={roadmap_branch} />
            </div>
          </div>
          <div className='h-2 !bg-quantum-primary1 rounded-xl'></div>
          <div className='grid grid-cols-5 '>
            <div className='col-start-2 flex flex-col justify-start gap-4'>
              <img className='h-20 scale-y-[-1]' src={roadmap_branch} />
              <div>
                <p className='font-gamejam text-3xl '>
                  {i18n.t("quantumJam.qschedule.signups_close.date")}
                </p>
                <p>{i18n.t("quantumJam.qschedule.signups_close.description")}</p>
              </div>
            </div>
            <div className='col-start-4 flex flex-col justify-start gap-4'>
              <img className='h-20 scale-y-[-1]' src={roadmap_branch} />
              <div>
                <p className='font-gamejam text-3xl '>
                  {i18n.t("quantumJam.qschedule.competition_ends.date")}
                </p>
                <p>{i18n.t("quantumJam.qschedule.competition_ends.description")}</p>
              </div>
            </div>
          </div>
        </div>
    </div>)
  );
}

export default QSchedule;
