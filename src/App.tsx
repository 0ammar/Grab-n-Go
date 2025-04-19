import { useRef } from 'react';
import './styles/global.scss';

import { Navbar, ScrollHint } from './components/layout';
import { Hero, MenuSection, About, Conatct } from './components/sections';

import { usePageScrollManager, useScrollProgress } from './hooks';
import { menuCategories } from './data/menuData';

import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
  useScrollProgress();
  const sectionCount = 4;
  const menuSectionIndex = 1;
  const tabCount = menuCategories.length;

  const {
    sectionRefs,
    activeSection,
    setActiveSection,
    activeTab,
    setActiveTab,
  } = usePageScrollManager(sectionCount, menuSectionIndex, tabCount);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Swipe handler (left/right)
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left
        if (activeSection === menuSectionIndex && activeTab < tabCount - 1) {
          setActiveTab(activeTab + 1);
        } else if (activeSection === menuSectionIndex && activeTab === tabCount - 1) {
          setActiveSection(menuSectionIndex + 1);
        } else if (activeSection < sectionCount - 1) {
          setActiveSection(activeSection + 1);
        }
      } else {
        // Swipe right
        if (activeSection === menuSectionIndex && activeTab > 0) {
          setActiveTab(activeTab - 1);
        } else if (activeSection === menuSectionIndex && activeTab === 0) {
          setActiveSection(menuSectionIndex - 1);
        } else if (activeSection > 0) {
          setActiveSection(activeSection - 1);
        }
      }
    }
  };

  return (
    <>
      <Navbar />
      <main
        className="scroll-container"
        ref={scrollContainerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          {activeSection === 0 && (
            <motion.section
              key="hero"
              className="scroll-section"
              ref={(el) => {
                if (el instanceof HTMLDivElement) sectionRefs.current[0] = el;
              }}
              initial={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
              <Hero onScrollToMenu={() => setActiveSection(1)} />
            </motion.section>
          )}

          {activeSection === 1 && (
            <motion.section
              key="menu"
              className="scroll-section"
              ref={(el) => {
                if (el instanceof HTMLDivElement) sectionRefs.current[1] = el;
              }}
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 0, opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
              <MenuSection
                isActive={true}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                goBackToHero={() => setActiveSection(0)}
              />
            </motion.section>
          )}

          {activeSection === 2 && (
            <motion.section
              key="about"
              className="scroll-section"
              ref={(el) => {
                if (el instanceof HTMLDivElement) sectionRefs.current[2] = el;
              }}
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 0, opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
              <About />
            </motion.section>
          )}

          {activeSection === 3 && (
            <motion.section
              key="contact"
              className="scroll-section"
              ref={(el) => {
                if (el instanceof HTMLDivElement) sectionRefs.current[3] = el;
              }}
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 0, opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
              <Conatct />
            </motion.section>
          )}
        </AnimatePresence>
      </main>
      <ScrollHint />
    </>
  );
}
