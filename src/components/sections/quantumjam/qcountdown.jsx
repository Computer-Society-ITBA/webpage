import React, { useEffect, useState, useRef } from "react";
// Translations
import i18n from "../../../i18n/index.js";

import Confetti from "confetti-react";

function QCountdown() {
  const calculateTimeLeft = () => {
    let difference = new Date(2025, 10, 1, 12) - new Date();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = null;
    }
    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const wrapperRef = useRef(null);
  const [confettiSource, setConfettiSource] = useState({
    x: 5000,
    y: 500,
    w: 0,
    h: 0,
  });
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();

      const x = rect.left + window.scrollX + rect.width / 2;
      const y = rect.top + window.scrollY + rect.height;

      console.log(rect.width, rect.height);

      setConfettiSource({ x: x, y: y, w: 0, h: 0 });
      setHeight(y);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    (<div className='flex flex-col items-center gap-8'>
        {timeLeft && <h3 className='mb-6 font-gamejam text-quantum-white tracking-wider text-4xl'>{i18n.t("quantumJam.countdown")}</h3>}
        {!timeLeft && <h3 className="text-quantum-white">{i18n.t('gamejam.competition_ended')}</h3>}
        <div className='flex flex-row lg:gap-12 gap-4 self-center' ref={wrapperRef}>
            {!timeLeft && <Confetti height={height} recycle={false} confettiSource={confettiSource} colors={['#ff66c4', '#8338ec', '#454ade']} initialVelocityY={3} initialVelocityX={4} gravity={0.02}/>}
            <div>
                <p className='font-gamejam text-6xl font-bold text-quantum-white hover:text-quantum-primary1'>{timeLeft ? timeLeft.days : "0"}</p>
                <p className='text-quantum-white text-xl'>{i18n.t("gamejam.days")}</p>
            </div>
            <div>
                <p className='font-gamejam text-6xl font-bold text-quantum-white hover:text-quantum-primary1'>{timeLeft ? timeLeft.hours : "0"}</p>
                <p className='text-quantum-white text-xl'>{i18n.t("gamejam.hours")}</p>
            </div>
            <div>
                <p className='font-gamejam text-6xl font-bold text-quantum-white hover:text-quantum-primary1'>{timeLeft ? timeLeft.minutes : "0"}</p>
                <p className='text-quantum-white text-xl'>{i18n.t("gamejam.minutes")}</p>
            </div>
            <div>
                <p className='font-gamejam text-6xl font-bold text-quantum-white hover:text-quantum-primary1'>{timeLeft ? timeLeft.seconds : "0"}</p>
                <p className='text-quantum-white text-xl'>{i18n.t("gamejam.seconds")}</p>
            </div>
        </div>
    </div>)        
  );
}

export default QCountdown;
