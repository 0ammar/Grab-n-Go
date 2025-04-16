import { useRef } from 'react';
import './styles/global.scss';

import { Navbar, ScrollHint } from './components/layout';
import { Hero, MenuSection } from './components/sections';

import { usePageScrollManager, useScrollProgress } from './hooks';
import { menuCategories } from './data/menuData';

import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
  useScrollProgress();
  const sectionCount = 2;
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

  return (
    <>
      <Navbar />
      <main className="scroll-container" ref={scrollContainerRef}>
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
        </AnimatePresence>
      </main>
      <ScrollHint />
    </>
  );
}
