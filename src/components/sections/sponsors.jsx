import React from 'react';
// Translations
import i18n from '../../i18n/index.js';

// Data
import sponsors from '../../data/sponsors';

// Images
const sponsorImages = import.meta.glob("../../images/sponsors/*", { eager: true, as: "url" });

// Components
const Section = React.lazy(() => import('../section'));
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Sponsors() {
	const settings = {
		infinite: true,
		slidesToShow: 4,
      	slidesToScroll: 1,
		adaptiveHeight: true,
		autoplay: true,
		speed: 4100,
		autoplaySpeed: 0,
		cssEase: "linear",
	}
	return (
		<Section id='our-sponsors' bgColor='bg-white' textAlignment='center'>
			<h2>{i18n.t('sponsors.title')}</h2>
			<Slider {...settings}>
				{sponsors.map((sponsor, index) => (
					<div key={index} className="py-10 px-5 mx-10" >	
					<a href={sponsor.link} rel='noreferrer' target='_blank'>
						<img src={sponsorImages[`../../images/sponsors/${sponsor.src}`]} alt={i18n.t(sponsor.alt)} className=" h-24 my-0 mx-auto"/>
					</a>	
					</div>
				))}
			</Slider>
		</Section>
	);
}

export default Sponsors;
