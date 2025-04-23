// ✅ usePageScrollManager.ts
import { useRef, useState, useCallback, useEffect } from 'react';

export const usePageScrollManager = (
  totalSections: number,
  menuSectionIndex: number,
  tabCount: number
) => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const isScrolling = useRef(false);

  const scrollToSection = (index: number) => {
    if (index >= 0 && index < totalSections) {
      sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(index);
    }
  };

  const handleGlobalScroll = useCallback(
    (e: WheelEvent) => {
      if (isScrolling.current) return;
      isScrolling.current = true;
      const delay = 900;

      if (activeSection === menuSectionIndex) {
        if (e.deltaY > 0 && activeTab === tabCount - 1) {
          scrollToSection(menuSectionIndex + 1);
        } else if (e.deltaY < 0 && activeTab === 0) {
          scrollToSection(menuSectionIndex - 1);
        }
      } else {
        if (e.deltaY > 0 && activeSection < totalSections - 1) {
          scrollToSection(activeSection + 1);
        } else if (e.deltaY < 0 && activeSection > 0) {
          scrollToSection(activeSection - 1);
        }
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, delay);
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


//