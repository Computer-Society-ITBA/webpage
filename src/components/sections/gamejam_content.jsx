import React, {useEffect, useState, useRef} from 'react';
// Translations
import i18n from '../../i18n/index.js';

import { ReactTyped } from 'react-typed';
import Marquee from 'react-fast-marquee';
import Confetti from 'confetti-react';

// Icons
import PlaceIcon from '@mui/icons-material/Place';
import Groups3Icon from '@mui/icons-material/Groups3';

// Images and assets
import gamejam_logo from '../../images/gamejam_logo.png';
import gamejam_logo_decoration from '../../images/gamejam_logo_decoration_left.svg';
import roadmap_branch from '../../images/gamejam_roadmap_branch.svg';
import gamejam_decoration_l from '../../images/gamejam_decoration_left.svg';
import gamejam_decoration_r from '../../images/gamejam_decoration_right.svg';

// Data
const gamejamImages = import.meta.glob('../../images/gamejam_images/*', { eager: true, as: 'url' });
import gamejam_images from '../../data/gamejam_images.json';

// Components
const Section = React.lazy(() => import('../section.jsx'));
const LinkButton = React.lazy(() => import('../link_button'));

function GameJamContent () {
    const calculateTimeLeft = () => {
        let difference = new Date(2024, 9, 18, 12) - new Date();

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        else {
            timeLeft = null;
        }
        return timeLeft;
    }
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    const wrapperRef = useRef(null);
    const [confettiSource, setConfettiSource] = useState({ x: 5000, y: 500, w: 0, h: 0 });
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        if (wrapperRef.current) {
            const rect = wrapperRef.current.getBoundingClientRect();

            const x = rect.left + window.scrollX + rect.width / 2;
            const y = rect.top + window.scrollY + rect.height;

            console.log(rect.width, rect.height )

            setConfettiSource({ x:x, y:y, w: 0, h: 0 });
            setHeight(y)
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
            }, 1000);
        return () => clearTimeout(timer);
    });

    return (
        <div className='flex flex-col items-center gap-8'>
            <img src={gamejam_decoration_l} className='hidden lg:inline absolute left-12 h-[80vh]'/>
            <img src={gamejam_decoration_r} className='hidden lg:inline absolute right-12 h-[80vh]'/>

            <Section padding='no' className='flex flex-col gap-6'>
                <div className='flex flex-row self-center'>
                    <img className='h-32' src={gamejam_logo_decoration} />
                    <img className='h-32' src={gamejam_logo} />
                    <img className='h-32 rotate-180' src={gamejam_logo_decoration} />
                </div>
                <ReactTyped className='font-gamejam text-2xl self-center'
                    strings={[
                        i18n.t('gamejam.slogan'),
                    ]}
                    loop
                    typeSpeed={50}
                    backSpeed={50}
                >
                </ReactTyped>
            </Section>

            <Section padding='no' className='mx-12 lg:w-1/2 flex flex-col gap-6 text-left self-center'>
                <p className='text-lg'>{i18n.t('gamejam.description')}</p>
                <p className='text-lg'>{i18n.t('gamejam.info')}</p>
            </Section>

            <Section padding='no'>
                {timeLeft &&
                    <LinkButton type='full-primary' smooth href='https://bit.ly/gamejam24cs' target='blank' className='text-4xl font-gamejam bg-brand_primary hover:bg-brand_secondary focus:bg-brand_secondary px-8' text={i18n.t('gamejam.cta')} />
                }
            </Section>

            <Section padding='no' className='mx-8 lg:w-1/2 flex flex-col items-center gap-12'>

                {!timeLeft && <h3>{i18n.t('gamejam.competition_ended')}</h3>}
                <div className='flex flex-row lg:gap-12 gap-4 self-center' ref={wrapperRef}>
                    {!timeLeft && <Confetti height={height} recycle={false} confettiSource={confettiSource} colors={['#2E005D', '#5C008B', '#8E008B', '#FF8300', '#FF6200']} initialVelocityY={3} initialVelocityX={4} gravity={0.02}/>}
                    <div>
                        <p className='font-gamejam text-6xl font-bold hover:text-brand_secondary'>{timeLeft ? timeLeft.days : "0"}</p>
                        <p className='text-xl'>{i18n.t("gamejam.days")}</p>
                    </div>
                    <div>
                        <p className='font-gamejam text-6xl font-bold hover:text-brand_secondary'>{timeLeft ? timeLeft.hours : "0"}</p>
                        <p className='text-xl'>{i18n.t("gamejam.hours")}</p>
                    </div>
                    <div>
                        <p className='font-gamejam text-6xl font-bold hover:text-brand_secondary'>{timeLeft ? timeLeft.minutes : "0"}</p>
                        <p className='text-xl'>{i18n.t("gamejam.minutes")}</p>
                    </div>
                    <div>
                        <p className='font-gamejam text-6xl font-bold hover:text-brand_secondary'>{timeLeft ? timeLeft.seconds : "0"}</p>
                        <p className='text-xl'>{i18n.t("gamejam.seconds")}</p>
                    </div>
                </div>

                <div className='grid grid-cols-4'>
                    <div className='flex flex-col gap-4 items-center'>
                        <PlaceIcon className='scale-150' fontSize='large' />
                        <p>{i18n.t('gamejam.location')}</p>
                    </div>
                    <div className='col-start-4 flex flex-col gap-4 items-center'>
                        <Groups3Icon className='scale-150' fontSize='large' />
                        <p>{i18n.t('gamejam.participants')}</p>
                    </div>
                </div>
            </Section>

            <Section padding='no' className='mx-6 my-12 lg:w-1/2'>
                <div className='flex flex-col'>
                    <h3 className='mb-6'>{i18n.t('gamejam.roadmap.title')}</h3>
                    <div className='grid grid-cols-3'>
                        <div className='flex flex-col justify-between gap-4'>
                            <div>
                                <p className='font-gamejam text-3xl font-bold'>{i18n.t('gamejam.roadmap.signups_open.date')}</p>
                                <p>{i18n.t('gamejam.roadmap.signups_open.description')}</p>
                            </div>
                            <img className='h-20' src={roadmap_branch} />
                        </div>
                        <div className='flex flex-col justify-between gap-4'>
                            <div>
                                <p className='font-gamejam text-3xl font-bold'>{i18n.t('gamejam.roadmap.competition_starts.date')}</p>
                                <p>{i18n.t('gamejam.roadmap.competition_starts.description')}</p>
                            </div>
                            <img className='h-20' src={roadmap_branch} />
                        </div>
                        <div className='flex flex-col justify-between gap-4'>
                            <div>
                                <p className='font-gamejam text-3xl font-bold'>{i18n.t('gamejam.roadmap.closing_ceremony.date')}</p>
                                <p>{i18n.t('gamejam.roadmap.closing_ceremony.description')}</p>
                            </div>
                            <img className='h-20' src={roadmap_branch} />
                        </div>
                    </div>
                    <div className='h-2 !bg-brand_secondary'></div>
                    <div className='grid grid-cols-5 '>
                        <div className='col-start-2 flex flex-col justify-start gap-4'>
                            <img className='h-20 scale-y-[-1]' src={roadmap_branch} />
                            <div>
                                <p className='font-gamejam text-3xl font-bold'>{i18n.t('gamejam.roadmap.signups_close.date')}</p>
                                <p>{i18n.t('gamejam.roadmap.signups_close.description')}</p>
                            </div>
                        </div>
                        <div className='col-start-4 flex flex-col justify-start gap-4'>
                            <img className='h-20 scale-y-[-1]' src={roadmap_branch} />
                            <div>
                                <p className='font-gamejam text-3xl font-bold'>{i18n.t('gamejam.roadmap.competition_ends.date')}</p>
                                <p>{i18n.t('gamejam.roadmap.competition_ends.description')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            <Section padding='no' className='lg:w-2/3'>
                <Marquee gradient='true' direction='left' speed='70'>
                    {gamejam_images.map((image, index) => (
                        <div key={index} className='p-0 m-0' >
                            <img src={gamejamImages[`../../images/gamejam_images/${image.src}`]} alt={i18n.t(image.alt)} className=' h-40' />
                        </div>
                    ))}
                </Marquee>
            </Section>

            <Section padding='no' className='mx-12 lg:w-1/2 flex flex-col text-left self-center mb-20'>
                <p className='text-lg'>{i18n.t('gamejam.more_info')}</p>
            </Section>

        </div>
    )
}

export default GameJamContent;
