import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
// Translations
import i18n from "../../i18n/index.js";

import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import Marquee from "react-fast-marquee";

// Hrefs
import currentHrefs from "../../data/current_event_links.json";

// Icons
import PlaceIcon from "@mui/icons-material/Place";
import Groups3Icon from "@mui/icons-material/Groups3";
import EventIcon from "@mui/icons-material/Event";

//Imports from firebase
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

// Images and assets
import hackit_logo from "../../images/hackitba_logo_alt.png";

// Data
const hackitImages = import.meta.glob("../../images/hackit_images/*", {
  eager: true,
  query: "?url",
  import: "default",
});
import hackit_images from "../../data/hackit_images.json";
const mentorLogos = import.meta.glob("../../images/mentors_images/*", {
  eager: true,
  query: "?url",
  import: "default",
});

// Components
const Section = React.lazy(() => import("../section.jsx"));
const LinkButton = React.lazy(() => import("../link_button.jsx"));

function HackitContent() {
  const [height, setHeight] = useState(0);
  const [sponsor, setSponsor] = useState([]);
  const ref = useRef(null);

  const updateHeight = () => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
  };

  useLayoutEffect(() => {
    updateHeight();
    window.addEventListener("resize", updateHeight);
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    async function fetchSponsor() {
      const q = query(
        collection(db, "sponsors"),
        where("name", "==", "emprelatam")
      );
      const querySnapshot = await getDocs(q);
      const sponsorData = querySnapshot.docs.map((doc) => doc.data());
      setSponsor(sponsorData);
      console.log(sponsorData);
    }
    fetchSponsor();
  }, []);

  return (
    (<div
      className='flex flex-col items-center gap-8 pb-20 justify-normal'
      ref={ref}
    >
      <div
        className={`hidden lg:inline absolute left-0 w-32 bg-hackit-decoration bg-contain bg-left-bottom bg-repeat-y`}
        style={{ height: `${height}px` }}
      ></div>
      <div
        className={`hidden lg:inline absolute right-0 w-32 bg-hackit-decoration bg-contain bg-right-bottom bg-no-repeat-y`}
        style={{ height: `${height}px` }}
      ></div>
      <Section padding='no' className='flex flex-col'>
        <div className='flex flex-row self-center'>
          <a href={`${currentHrefs.hackitba}`} target='_blank'>
            <img className='h-16 lg:h-20' src={hackit_logo} />
          </a>
        </div>
        <ReactTyped
          className='font-gamejam text-2xl self-center text-[#14192D]'
          strings={[i18n.t("hackit.slogan")]}
          loop
          typeSpeed={50}
          backSpeed={50}
        ></ReactTyped>
      </Section>
      <Section
        padding='no'
        className='mx-12 lg:w-1/2 flex flex-col gap-12 self-center'
      >
        <p className='text-lg'>{i18n.t("hackit.description")}</p>
        <div className='text-left'>
          {i18n.t("hackit.info", { returnObjects: true }).map((text) => {
            return <p className='text-lg mb-4'>{text}</p>;
          })}
        </div>
      </Section>
      <Section
        padding='no'
        className='mx-8 lg:w-2/5 flex flex-col items-center gap-12'
      >
        <div className='grid grid-cols-3'>
          <div className='flex flex-col gap-4 items-center'>
            <PlaceIcon className='scale-150' fontSize='large' />
            <p>{i18n.t("hackit.location")}</p>
          </div>
          <div className='flex flex-col gap-4 items-center'>
            <EventIcon className='scale-150' fontSize='large' />
            <p>{i18n.t("hackit.date")}</p>
          </div>
          <div className='flex flex-col gap-4 items-center'>
            <Groups3Icon className='scale-150' fontSize='large' />
            <p>{i18n.t("hackit.participants")}</p>
          </div>
        </div>
      </Section>
      <Section padding='no' className='lg:w-2/3'>
        <Marquee gradient='true' direction='left' speed='70'>
          {hackit_images.map((image, index) => (
            <div key={index} className='p-0 m-0'>
              <img
                src={hackitImages[`../../images/hackit_images/${image.src}`]}
                alt={i18n.t(image.alt)}
                className=' h-40'
              />
            </div>
          ))}
        </Marquee>
      </Section>
      <Section padding='no' className='mx-20 flex flex-col items-center gap-6'>
        <h3>{i18n.t("hackit.mentors.title")}</h3>
        <div className='lg:w-1/2 grid grid-cols-4 gap-12 items-center'>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <img
              className='h-30'
              alt={i18n.t("hackit.mentors.microsoft")}
              src={
                mentorLogos["../../images/mentors_images/microsoft_logo.png"]
              }
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <img
              className='h-30'
              alt={i18n.t("hackit.mentors.google")}
              src={mentorLogos["../../images/mentors_images/google_logo.png"]}
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <img
              className='h-30'
              alt={i18n.t("hackit.mentors.exxon")}
              src={mentorLogos["../../images/mentors_images/exxon_logo.png"]}
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <img
              className='h-30'
              alt={i18n.t("hackit.mentors.modo")}
              src={mentorLogos["../../images/mentors_images/modo_logo.png"]}
            />
          </motion.div>
        </div>
      </Section>
      <Section padding='no'>
        <LinkButton
          type='full-primary'
          smooth
          href='https://www.hackitba.com.ar/'
          target='blank'
          className='text-2xl bg-brand_primary hover:bg-brand_secondary focus:bg-brand_secondary px-8'
          text={i18n.t("hackit.cta")}
        />
      </Section>
      <Section
        padding='no'
        className='mx-12 lg:w-1/2 flex flex-col text-left self-center items-center gap-6'
      >
        <div className='inline'>
          <p className='text-lg'>
            {i18n.t("hackit.more_info", { returnObjects: true })[0]}
            {sponsor.map((s, index) => (
              <span key={index} className='inline-block'>
                <a href={s.link} rel='noreferrer' target='_blank'>
                  <img
                    src={s.src}
                    alt={i18n.t("sponsors.logo").replace("{name}", s.name)}
                    className='align-text-bottom h-6 mx-4 relative top-[6px]'
                  />
                </a>
              </span>
            ))}
            {i18n.t("hackit.more_info", { returnObjects: true })[1]}
          </p>
        </div>

        <p className='text-lg'>
          {i18n.t("hackit.more_info", { returnObjects: true })[2]}
        </p>
      </Section>
    </div>)
  );
}

export default HackitContent;
