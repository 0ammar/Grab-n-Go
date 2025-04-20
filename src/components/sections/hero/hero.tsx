import './hero.scss';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import clipImage from '@/assets/images/hero-clip.png';
import logo from '@/assets/images/logo.png';

interface HeroProps {
  onScrollToMenu: () => void;
}

const Hero = ({ onScrollToMenu }: HeroProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const [showLogoAnimation, setShowLogoAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLogoAnimation(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.section
      className="hero-section"
      ref={sectionRef}
      style={{ x, opacity }}
    >
      <div className="hero-container">
        <div className="hero-logo-floating">
          <motion.img
            src={logo}
            alt="Logo"
            className={showLogoAnimation ? 'logo-animate' : ''}
            initial={{ y: -150, scale: 0.5, opacity: 0 }}
            animate={{ y: 0, scale: 1.2, opacity: 1, rotate: 360 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
            onAnimationComplete={() => setShowLogoAnimation(false)}
          />
        </div>

        <div className="hero-content-wrapper">
          <motion.div
            className="hero-content"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="hero-title">Grab'n Go</h1>
            <p className="hero-description">
            Grab it hot. Grab it fresh.<br />
            That’s the Grab’n Go way
            </p>

            <button className="hero-button" onClick={onScrollToMenu}>
              Explore Menu
            </button>

            <div className="swipe-hint">
              <div className="animated-arrow" />
              <p className="hint-text">Swap to right</p>
            </div>
          </motion.div>

          <motion.img
            src={clipImage}
            alt="Hero Dish"
            className="hero-image"
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
