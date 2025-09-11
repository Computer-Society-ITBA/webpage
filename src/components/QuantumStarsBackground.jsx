import React, { useRef, useEffect } from 'react';

const STAR_COUNT = 60;
const STAR_SIZE = [1, 2, 3];
const STAR_COLOR = 'rgba(255,255,255,0.85)';

function randomBetween(a, b) {
  return Math.random() * (b - a) + a;
}

function randomStar(windowW, windowH, scrollY = 0) {
  return {
    x: randomBetween(0, windowW),
    y: randomBetween(scrollY, scrollY + windowH),
    size: STAR_SIZE[Math.floor(Math.random() * STAR_SIZE.length)],
    speed: randomBetween(0.05, 0.25),
  };
}

const QuantumStarsBackground = () => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const lastScrollY = useRef(window.scrollY);

  // Init stars
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      starsRef.current = Array.from({ length: STAR_COUNT }, () => randomStar(w, h, window.scrollY));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animate stars
  useEffect(() => {
    let animationId;
    const ctx = canvasRef.current.getContext('2d');
    let w = window.innerWidth;
    let h = window.innerHeight;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const scrollY = window.scrollY;
      for (let star of starsRef.current) {
        // If star is in viewport
        if (star.y > scrollY && star.y < scrollY + h) {
          // Move star horizontally (quantum drift)
          star.x += Math.sin(Date.now() * 0.0002 + star.y) * star.speed;
          // Optionally, add a little vertical drift
          star.y += Math.cos(Date.now() * 0.0001 + star.x) * 0.02;
        } else {
          // If not in viewport, randomize position for next entry
          Object.assign(star, randomStar(w, h, scrollY));
        }
        // Wrap around horizontally
        if (star.x < 0) star.x = w;
        if (star.x > w) star.x = 0;
        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y - scrollY, star.size, 0, 2 * Math.PI);
        ctx.fillStyle = STAR_COLOR;
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      animationId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Update canvas size on resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update on scroll
  useEffect(() => {
    const handleScroll = () => {
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
  zIndex: -1,
        pointerEvents: 'none',
        backgroundColor: '#000',
      }}
      width={window.innerWidth}
      height={window.innerHeight}
      aria-hidden="true"
    />
  );
};

export default QuantumStarsBackground;
