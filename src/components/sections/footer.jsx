import React from 'react';
import i18n from '../../i18n/index.js';
import logoCompleto from '../../images/logo_completo_2.png';
import ibmQuantumLogoImg from '../../images/quantumjam_images/IBMQuantum.png';
import { HashLink as Link } from "react-router-hash-link";

// Icons
import Icon from '@mdi/react';
import { mdiInstagram, mdiYoutube, mdiLinkedin, mdiHeart } from '@mdi/js';

import footer from '../../data/footer';

function Footer({ color = "#F98A04", textColor = 'white', ibmQuantumLogo=false}) {
    const isGradient = typeof color === 'string' && (color.startsWith('linear-gradient') || color.startsWith('radial-gradient'));

    const getIconClasses = (color) => `px-2 transform duration-100 text-[${textColor}] hover:text-${color} hover:scale-125 focus:outline-none`;

    return (
        <footer
            className={`w-full flex flex-col justify-between items-center overflow-hidden${color ? '' : ' bg-quantum-primary3'}`}
            style={color ? (isGradient ? { background: color } : { backgroundColor: color }) : {}}
        >
            <div className="w-full h-4/12 sm:h-6/12 items-center justify-center flex flex-row">
                <Link smooth to="/#" className="max-h-full sm:w-4/12 md:w-4/12 my-4 justify-center items-center">
                    <img
                        src={logoCompleto}
                        className='object-contain w-8/12 mx-auto rounded-lg'
                        alt='Computer Society Logo'
                    />
                </Link>
            </div>

            <div className="flex flex-row justify-center items-center mb-2 sm:mb-0">
                {footer.social.map((item, index) => {
                    let icon;
                    let color;
                    switch (item.logo) {
                        case 'youtube':
                            icon = mdiYoutube;
                            color = "red-700"
                            break;
                        case 'linkedin':
                            icon = mdiLinkedin;
                            color = "blue-700"
                            break;
                        case 'instagram':
                            color = "purple-700"
                        default:
                            icon = mdiInstagram;
                    }
                    
                    return (
                        <a key={index} href={item.href} target="_blank" rel="noreferrer" className={getIconClasses(color)}>
                            <Icon path={icon} size={2} className={`text-${textColor} hover:text-${color} focus:outline-none`} />
                        </a>
                    );
                })}
            </div>
                {ibmQuantumLogo !== false && (
                <div className="flex items-center">
                    <a href="https://quantum-computing.ibm.com/" target="_blank" rel="noreferrer">
                    <img src={ibmQuantumLogoImg} alt="IBM Quantum Logo" className="w-28" />
                    </a>
                </div>
                )}

            <div className="w-full h-3/12 sm:h-2/12 flex flex-col-reverse sm:flex-row justify-start sm:justify-between px-16 mb-2 sm:mb-4 items-center">
                <div className={`${textColor}`}>
                    {i18n.t('footer.love_1')}
                    <Link smooth to="/credits">
                        <Icon
                            path={mdiHeart}
                            size={1}
                            className={`inline mx-1 transform duration-100 hover:text-red-700 hover:animate-pulse text-${textColor} `}
                        />
                    </Link>
                    {i18n.t('footer.love_2')}
                </div>
            </div>
        </footer>
    );
}

export default Footer;
