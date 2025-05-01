import { useRef, useState, useCallback, useEffect } from 'react';

const isMobileScreen = () =>
  typeof window !== 'undefined' && window.innerWidth <= 768;

export const usePageScrollManager = (
  totalSections: number,
  menuSectionIndex: number,
  tabCount: number
) => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>(Array(totalSections).fill(null));
  const [activeSection, setActiveSection] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const isScrolling = useRef(false);
  const scrollDelay = 900;

  const scrollToSection = (index: number, force = false) => {
    const isInMenu = activeSection === menuSectionIndex;
    const tryingToLeaveMenu = index !== menuSectionIndex;
  
    if (!force && isMobileScreen() && isInMenu && tryingToLeaveMenu) return;
  
    if (index >= 0 && index < totalSections) {
      sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(index);
    }
  };
  

  const scrollForward = () => {
    const isAtLastTabInMenu = activeSection === menuSectionIndex && activeTab === tabCount - 1;
    if (isAtLastTabInMenu && activeSection < totalSections - 1) {
      scrollToSection(activeSection + 1);
    } else if (activeSection !== menuSectionIndex && activeSection < totalSections - 1) {
      scrollToSection(activeSection + 1);
    }
  };

  const scrollBackward = () => {
    const isAtFirstTabInMenu = activeSection === menuSectionIndex && activeTab === 0;
    if (isAtFirstTabInMenu && activeSection > 0) {
      scrollToSection(activeSection - 1);
    } else if (activeSection !== menuSectionIndex && activeSection > 0) {
      scrollToSection(activeSection - 1);
    }
  };

  const handleGlobalScroll = useCallback(
    (e: WheelEvent) => {
      const isInMenu = activeSection === menuSectionIndex;

      if (isMobileScreen() && isInMenu) return;

      if (isScrolling.current) return;
      isScrolling.current = true;

      e.deltaY > 0 ? scrollForward() : scrollBackward();

      setTimeout(() => {
        isScrolling.current = false;
      }, scrollDelay);
    },
    [activeSection, activeTab, tabCount, totalSections, menuSectionIndex]
  );

  useEffect(() => {
    window.addEventListener('wheel', handleGlobalScroll, { passive: true });
    return () => window.removeEventListener('wheel', handleGlobalScroll);
  }, [handleGlobalScroll]);

  useEffect(() => {
    (window as any).scrollToMenu = () => scrollToSection(menuSectionIndex);
    return () => {
      delete (window as any).scrollToMenu;
    };
  }, [menuSectionIndex]);

  return {
    sectionRefs,
    activeSection,
    setActiveSection,
    activeTab,
    setActiveTab,
    scrollToSection,
    handleGlobalScroll,
  };
};
