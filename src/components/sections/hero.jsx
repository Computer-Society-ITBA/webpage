import React, { useEffect } from 'react';
import { SplitText } from '../../animations/SplitText'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import i18n from '../../i18n/index.js';
import logo from '../../images/logo_icon.png';

function Hero () {
    // UseEffect + controls to trigger animations
    const controlsGreet = useAnimation()
    const controlsCs = useAnimation()
    const controlsItba = useAnimation()
    const controlsLogo = useAnimation()
    useEffect(() => {
        async function loadAnimations() {
            await controlsGreet.start('visible')
            await controlsCs.start('visible')
            await controlsItba.start('visible')
            controlsLogo.start('visible')
        }
        loadAnimations()
    })

    return <section className='bg-white h-screen w-full flex flex-col justify-center items-center overflow-hidden'>
        <h4>
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='text-typography_primary'
            >
                <SplitText
                initial={{ y: '100%' }}
                animate={controlsGreet}
                variants={{
                    visible: i => ({
                        y: 0,
                        transition: {
                            delay: i * 0.1
                        }
                    })
                }}
                >
                {i18n.t('welcome.greet')}
                </SplitText>
            </motion.div>
        </h4>
        <h1 className="mb-2 sm:mb-0">
            <AnimatePresence>
                {(
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='text-brand_primary font-bold mt-12'
                >
                    <SplitText
                    initial={{ y: '100%' }}
                    animate={controlsCs}
                    variants={{
                        visible: i => ({
                            y: 0,
                            transition: {
                                delay: i * 0.25
                            }
                        })
                    }}
                    >
                    {i18n.t('welcome.cs')}
                    </SplitText>
                </motion.div>
                )}
            </AnimatePresence>
        </h1>
        <h3>
            <AnimatePresence>
                {(
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='text-typography_primary w-8/12 sm:w-full m-auto'
                >
                    <SplitText
                    initial={{ y: '100%' }}
                    animate={controlsItba}
                    variants={{
                        visible: i => ({
                            y: 0,
                            transition: {
                                delay: i * 0.15
                            }
                        })
                    }}
                    >
                    {i18n.t('welcome.itba')}
                    </SplitText>
                </motion.div>
                )}
            </AnimatePresence>
        </h3>
        <motion.img 
        src={logo} 
        className='mt-8 sm:mt-0 w-10/12 sm:w-7/12 -mb-75_ sm:-mb-40_' 
        alt='Computer Society Logo'
        initial={{ y: '100%' }}
        animate={controlsLogo}
        variants={{
            visible: i => ({
                y: 0,
                transition: {
                    delay: 1,
                    y: {type: "spring", stiffness: 40},
                    default: { duration: 2 }
                }
            })
        }}
        />
    </section>
}

export default Hero; 