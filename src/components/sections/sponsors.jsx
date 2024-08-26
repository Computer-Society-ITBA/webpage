import React from 'react';
// Translations
import i18n from '../../i18n/index.js';

// Data
import sponsors from '../../data/sponsors';

// Images
const sponsorImages = import.meta.glob("../../images/sponsors/*", { eager: true, as: "url" });

// Components
const Section = React.lazy(() => import('../section'));
import Marquee from "react-fast-marquee";

function Sponsors() {
    const settings = {
        gradient: "true",
        direction: "left",
        speed: 70,
    }

    return (
        <Section id="our-sponsors" bgColor='bg-white' textAlignment='center'>
            <h2>{i18n.t('sponsors.title')}</h2>
            <Marquee {...settings}>
                {sponsors.map((sponsor, index) => (
                    <div key={index} className="py-10 px-5 mx-10" >
                        <a href={sponsor.link} rel='noreferrer' target='_blank'>
                            <img src={sponsorImages[`../../images/sponsors/${sponsor.src}`]} alt={i18n.t(sponsor.alt)} className=" h-16 my-0 mx-auto" />
                        </a>
                    </div>
                ))}
            </Marquee>
        </Section>
    )
}


export default Sponsors;
