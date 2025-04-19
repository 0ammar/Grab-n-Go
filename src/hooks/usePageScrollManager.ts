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
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const swipeThreshold = 60;

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
        if (e.deltaY > 0 && activeTab < tabCount - 1) {
          setActiveTab((prev) => prev + 1);
        } else if (e.deltaY > 0 && activeTab === tabCount - 1) {
          scrollToSection(menuSectionIndex + 1);
        } else if (e.deltaY < 0 && activeTab > 0) {
          setActiveTab((prev) => prev - 1);
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

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchEndX.current - touchStartX.current;

    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX < 0) {
        // swipe left
        if (activeSection === menuSectionIndex && activeTab < tabCount - 1) {
          setActiveTab((prev) => prev + 1);
        } else if (activeSection === menuSectionIndex && activeTab === tabCount - 1) {
          scrollToSection(menuSectionIndex + 1);
        }
      } else {
        // swipe right
        if (activeSection === menuSectionIndex && activeTab > 0) {
          setActiveTab((prev) => prev - 1);
        } else if (activeSection === menuSectionIndex && activeTab === 0) {
          scrollToSection(menuSectionIndex - 1);
        }
      }
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
  };

  useEffect(() => {
    window.addEventListener('wheel', handleGlobalScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleGlobalScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
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
