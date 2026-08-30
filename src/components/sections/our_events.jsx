import React from "react";

// Hrefs
import currentHrefs from "../../data/current_event_links.json";

// Translations
import i18n from "../../i18n/index.js";

import hackitba_logo from "../../images/hackitba_logo.png";
import hackit_circuit_decoration from "../../images/hackit_circuit_decoration.png";
import quantumjam_bg from "../../images/quantumjam_bg_byw.png";
import quantumjam_logo from "../../images/quantumjam_logo_primary.svg";

import PlaceIcon from "@mui/icons-material/Place";
import Groups3Icon from "@mui/icons-material/Groups3";

// Components
const Section = React.lazy(() => import("../section"));

function OurEvents() {
  return (
    <Section
      id='our-events'
      bgColor='bg-white'
      textAlignment='left'
      className='overflow-hidden lg:px-16 xl:px-20 2xl:px-24'
    >
      <div className='mx-auto max-w-[1536px]'>
        <h2 className='!mb-0 text-[2rem] !leading-[1.15] sm:text-[2.25rem]'>
          {i18n.t("our_events.title")}
        </h2>
        <div className='mt-[18px] h-[3px] w-[50px] bg-brand_secondary' />
      </div>

      <div className='our-events mx-auto mt-11 grid max-w-[1536px] grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12'>
        {/* Quantum Jam */}
        <article className='relative flex w-full flex-col overflow-hidden rounded-[26px] bg-[#0A0A0A] shadow-[0_14px_28px_rgba(33,33,33,0.16)] transition-shadow duration-300 ease-out hover:shadow-[0_18px_34px_rgba(33,33,33,0.20)] focus-within:shadow-[0_18px_34px_rgba(33,33,33,0.20)] lg:aspect-[743/653] [container-type:inline-size]'>
          <div
            className='relative aspect-[5/2] shrink-0 bg-cover bg-center'
            style={{ backgroundImage: `url(${quantumjam_bg})` }}
          >
            <div className='absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-[#0A0A0A]' />
            <span className='absolute left-[4cqw] top-[5cqw] rounded-full bg-[#B2E713] px-[2.7cqw] py-[1.25cqw] text-[clamp(0.75rem,2.15cqw,1rem)] font-bold uppercase leading-none text-black'>
              {i18n.t("our_events.events.quantumjam.badge")}
            </span>
            <img
              src={quantumjam_logo}
              alt={i18n.t("our_events.events.quantumjam.logo_alt")}
              className='absolute bottom-[7.5cqw] left-[6.5cqw] w-[71cqw]'
            />
          </div>

          <div className='flex min-h-0 flex-1 flex-col px-[5.7cqw] pb-[5.7cqw] pt-[9.5cqw]'>
            <div className='flex items-stretch gap-[5.2cqw]'>
              <div className='flex shrink-0 flex-col items-center leading-none'>
                <span className='text-[clamp(3.25rem,9.7cqw,4.5rem)] font-bold leading-[0.82] text-white'>
                  {i18n.t("our_events.events.quantumjam.day")}
                </span>
                <span className='mt-[1.2cqw] text-[clamp(2.75rem,8.6cqw,4rem)] font-bold leading-[0.82] text-[#B2E713]'>
                  {i18n.t("our_events.events.quantumjam.month")}
                </span>
              </div>
              <div className='w-px shrink-0 bg-white/70' />
              <div className='flex min-w-0 flex-col justify-center gap-[1.7cqw]'>
                <p className='text-[clamp(1.25rem,4.3cqw,2rem)] font-bold leading-tight text-white'>
                  {i18n.t("our_events.events.quantumjam.title")}
                </p>
                <div className='flex items-center gap-[1.7cqw] text-[clamp(0.875rem,2.7cqw,1.25rem)] leading-tight text-white/90'>
                  <PlaceIcon fontSize='inherit' className='shrink-0 !text-[1.5em]' />
                  <span>{i18n.t("our_events.events.quantumjam.location")}</span>
                </div>
                <div className='flex items-center gap-[1.7cqw] text-[clamp(0.875rem,2.7cqw,1.25rem)] leading-tight text-white/90'>
                  <Groups3Icon fontSize='inherit' className='shrink-0 !text-[1.55em]' />
                  <span>{i18n.t("our_events.events.quantumjam.participants")}</span>
                </div>
              </div>
            </div>

            <a
              href={currentHrefs.quantumjam}
              target='_blank'
              rel='noreferrer'
              className='mt-[7.8cqw] inline-flex min-h-[clamp(3.25rem,8.8cqw,4.25rem)] w-fit items-center whitespace-nowrap rounded-[10px] bg-[#B2E713] px-[clamp(1.5rem,4.2cqw,2rem)] text-[clamp(1rem,2.7cqw,1.25rem)] font-bold leading-none text-black shadow-[3px_-3px_0_0_#FF2FB0,-3px_3px_0_0_#00E5FF] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[5px_-5px_0_0_#FF2FB0,-5px_5px_0_0_#00E5FF] active:translate-y-px'
            >
              {i18n.t("our_events.events.quantumjam.cta")} →
            </a>
          </div>
        </article>

        {/* hackITBA */}
        <article className='relative flex w-full flex-col overflow-hidden rounded-[26px] bg-light shadow-[0_14px_28px_rgba(33,33,33,0.16)] transition-shadow duration-300 ease-out hover:shadow-[0_18px_34px_rgba(33,33,33,0.20)] focus-within:shadow-[0_18px_34px_rgba(33,33,33,0.20)] lg:aspect-[743/653] [container-type:inline-size]'>
          <img
            src={hackit_circuit_decoration}
            alt=''
            className='pointer-events-none absolute inset-0 z-10 h-full w-full object-fill'
          />

          <div className='relative flex aspect-[5/2] shrink-0 items-center justify-center bg-hackit-background-image bg-cover bg-center'>
            <a
              href={currentHrefs.hackitba}
              target='_blank'
              rel='noreferrer'
              className='relative z-20 flex h-full w-full translate-y-[4.2cqw] items-center justify-center'
            >
              <img
                src={hackitba_logo}
                alt={i18n.t("our_events.events.hackit.logo_alt")}
                className='w-1/2'
              />
            </a>
          </div>

          <div className='relative z-20 flex min-h-0 flex-1 flex-col px-[4.1cqw] pb-[4.3cqw] pt-[4.4cqw]'>
            <span className='self-start rounded-full border border-brand_secondary bg-white px-[2.4cqw] py-[1.4cqw] text-[clamp(0.75rem,2.15cqw,1rem)] font-bold uppercase leading-none text-brand_secondary'>
              {i18n.t("our_events.events.hackit.badge")}
            </span>
            <div className='mt-[3.1cqw]'>
              <p className='text-[clamp(1.25rem,4cqw,1.875rem)] font-bold leading-tight text-typography_primary'>
                {i18n.t("our_events.events.hackit.title")}
              </p>
              <p className='mt-[0.9cqw] text-[clamp(0.9375rem,2.7cqw,1.25rem)] font-medium leading-tight text-brand_secondary'>
                {i18n.t("our_events.events.hackit.date")}
              </p>
            </div>
            <hr className='mt-[2.5cqw] w-2/3 border-gray-300' />
            <div className='mt-[2.5cqw] flex flex-col gap-[1.8cqw]'>
              <div className='flex items-center gap-[1.6cqw] text-[clamp(0.8125rem,2.35cqw,1.0625rem)] leading-tight text-typography_primary'>
                <PlaceIcon fontSize='inherit' className='shrink-0 !text-[1.45em] text-gray-500' />
                <span>{i18n.t("our_events.events.hackit.location")}</span>
              </div>
              <div className='flex items-center gap-[1.6cqw] text-[clamp(0.8125rem,2.35cqw,1.0625rem)] leading-tight text-typography_primary'>
                <Groups3Icon fontSize='inherit' className='shrink-0 !text-[1.5em] text-gray-500' />
                <span>{i18n.t("our_events.events.hackit.participants")}</span>
              </div>
            </div>
            <a
              href={currentHrefs.hackitba}
              target='_blank'
              rel='noreferrer'
              className='mt-auto w-fit whitespace-nowrap text-[clamp(1rem,2.7cqw,1.25rem)] font-medium leading-none text-brand_secondary transition-transform duration-200 hover:translate-x-1 active:translate-x-0'
            >
              {i18n.t("our_events.events.hackit.cta")} →
            </a>
          </div>
        </article>
      </div>
    </Section>
  );
}

export default OurEvents;
