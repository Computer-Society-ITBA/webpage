import React from "react";

// Hrefs
import currentHrefs from "../../data/current_event_links.json";

// Translations
import i18n from "../../i18n/index.js";

import hackitba_logo from "../../images/hackitba/hackitba_logo.png";
import hackit_circuit_decoration from "../../images/hackitba/hackit_circuit_decoration.png";
import PlaceIcon from "@mui/icons-material/Place";
import Groups3Icon from "@mui/icons-material/Groups3";
import ScheduleIcon from "@mui/icons-material/Schedule";

const tickers = [
  ["GGAL", "+2.4%"],
  ["AL30", "+0.8%"],
  ["YPFD", "-1.1%"],
  ["MELI", "+1.7%"],
  ["PAMP", "+0.6%"],
  ["TXAR", "-0.9%"],
];

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
        {/* HackaIOL */}
        <article className='relative flex w-full flex-col overflow-hidden rounded-[26px] bg-[#160934] font-hackaiol shadow-[0_14px_28px_rgba(33,33,33,0.16)] transition-shadow duration-300 ease-out hover:shadow-[0_18px_34px_rgba(33,33,33,0.20)] focus-within:shadow-[0_18px_34px_rgba(33,33,33,0.20)] lg:aspect-[743/653] [container-type:inline-size]'>
          <div className='relative aspect-[2/1] shrink-0 overflow-hidden sm:aspect-[5/2] bg-[radial-gradient(120%_90%_at_15%_0%,#353587_0%,#160934_70%)]'>
            <div
              aria-hidden='true'
              className='absolute inset-0 opacity-[0.12] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:6cqw_6cqw] [mask-image:linear-gradient(to_bottom,black,transparent)]'
            />
            <span className='absolute left-[4cqw] top-[5cqw] rounded-full bg-[#00D37F] px-[2.7cqw] py-[1.25cqw] text-[clamp(0.75rem,2.15cqw,1rem)] font-bold uppercase leading-none text-[#072016]'>
              {i18n.t("our_events.events.hackaiol.badge")}
            </span>
            <p
              aria-label={i18n.t("our_events.events.hackaiol.logo_alt")}
              className='absolute bottom-[11cqw] left-[6cqw] text-[clamp(2.75rem,15cqw,7rem)] sm:bottom-[10.5cqw] font-extrabold leading-[0.85] tracking-[-0.02em] text-white'
            >
              Hacka<span className='italic text-[#00D37F]'>IOL</span>
            </p>
            <div aria-hidden='true' className='absolute inset-x-0 bottom-0 flex h-[7cqw] items-center overflow-hidden bg-[#00D37F]/95 text-[clamp(0.6875rem,2.15cqw,1rem)] font-bold text-[#072016]'>
              <div className='flex w-max animate-[hackaiol-ticker_28s_linear_infinite] motion-reduce:animate-none'>
                {[...tickers, ...tickers, ...tickers, ...tickers].map(([symbol, change], index) => (
                  <span key={index} className='mx-[2.5cqw] whitespace-nowrap'>
                    {symbol} {change.startsWith("-") ? "▼" : "▲"} {change}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className='flex min-h-0 flex-1 flex-col px-[5.7cqw] pb-[5.7cqw] pt-[6.5cqw]'>
            <div className='flex items-stretch gap-[4.5cqw]'>
              <div className='flex shrink-0 flex-col items-center leading-none'>
                <span className='text-[clamp(2.5rem,9.7cqw,4.5rem)] font-extrabold leading-[0.82] text-white'>
                  {i18n.t("our_events.events.hackaiol.day")}
                </span>
                <span className='mt-[1.2cqw] text-[clamp(2.125rem,8.6cqw,4rem)] font-extrabold italic leading-[0.82] text-[#00D37F]'>
                  {i18n.t("our_events.events.hackaiol.month")}
                </span>
              </div>
              <div className='w-px shrink-0 bg-white/30' />
              <div className='flex min-w-0 flex-col justify-center gap-[1.7cqw]'>
                <p className='text-[clamp(0.9375rem,3.1cqw,1.5rem)] font-semibold leading-snug text-white'>
                  {i18n.t("our_events.events.hackaiol.tagline")}
                </p>
                <div className='flex items-center gap-[1.7cqw] text-[clamp(0.875rem,2.7cqw,1.25rem)] leading-tight text-[#C7CEDB]'>
                  <ScheduleIcon fontSize='inherit' className='shrink-0 !text-[1.4em]' />
                  <span>{i18n.t("our_events.events.hackaiol.time")}</span>
                </div>
                <div className='flex items-center gap-[1.7cqw] text-[clamp(0.875rem,2.7cqw,1.25rem)] leading-tight text-[#C7CEDB]'>
                  <Groups3Icon fontSize='inherit' className='shrink-0 !text-[1.55em]' />
                  <span>{i18n.t("our_events.events.hackaiol.participants")}</span>
                </div>
              </div>
            </div>

            <a
              href={currentHrefs.hackaiol}
              target='_blank'
              rel='noreferrer'
              className='mt-7 inline-flex min-h-[clamp(3rem,8.8cqw,4.25rem)] lg:mt-auto w-fit items-center gap-[1.5cqw] whitespace-nowrap rounded-[10px] bg-[#00D37F] px-[clamp(1.5rem,4.2cqw,2rem)] text-[clamp(1rem,2.7cqw,1.25rem)] font-extrabold uppercase leading-none tracking-wide text-[#072016] shadow-[0_0_0_0_rgba(0,211,127,0)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(0,211,127,0.35)] active:translate-y-px'
            >
              {i18n.t("our_events.events.hackaiol.cta")} <span aria-hidden='true'>▲</span>
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
