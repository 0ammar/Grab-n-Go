import './styles/global.scss';

import { Navbar, ScrollHint } from './components/layout';
import { Hero, MenuSection, About, Conatct } from './components/sections';
import { AnimatePresence, motion } from 'framer-motion';

import { usePageScrollManager } from './hooks/usePageScrollManager';
import { useSwipeNavigation } from './hooks/useSwipeNavigation';
import { useScrollProgress } from './hooks/useScrollProgress';
import { menuCategories } from './data/menuData';

const isMobileScreen = () =>
  typeof window !== 'undefined' && window.innerWidth <= 768;

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
    scrollToSection,
  } = usePageScrollManager(sectionCount, menuSectionIndex, tabCount);

  const {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useSwipeNavigation({
    activeSection,
    setActiveSection,
    activeTab,
    sectionCount,
    menuSectionIndex,
    tabCount,
  });

  const touchHandlers = isMobileScreen()
    ? {
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
      }
    : {};

  return (
    <>
      <Navbar />
      <main className="scroll-container" {...touchHandlers}>
        <AnimatePresence mode="wait">
          {/* Hero Section */}
          {activeSection === 0 && (
            <motion.section
              key="hero"
              className="scroll-section"
              ref={(el) => {
                sectionRefs.current[0] = el as HTMLDivElement | null;
              }}
              
              initial={{ x: 0, opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
              <Hero onScrollToMenu={() => setActiveSection(menuSectionIndex)} />
            </motion.section>
          )}

          {/* Menu Section */}
          {activeSection === 1 && (
            <motion.section
              key="menu"
              className="scroll-section"
              ref={(el) => {
                sectionRefs.current[1] = el as HTMLDivElement | null;
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
                goToSection={scrollToSection}
              />
            </motion.section>
          )}

          {/* About Section */}
          {activeSection === 2 && (
            <motion.section
              key="about"
              className="scroll-section"
              ref={(el) => {
                sectionRefs.current[2] = el as HTMLDivElement | null;
              }}
              
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 0, opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
              <About />
            </motion.section>
          )}

          {/* Contact Section */}
          {activeSection === 3 && (
            <motion.section
              key="contact"
              className="scroll-section"
              ref={(el) => {
                sectionRefs.current[3] = el as HTMLDivElement | null;
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
