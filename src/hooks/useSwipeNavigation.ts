import { useRef } from 'react';

type SwipeConfig = {
  activeSection: number;
  setActiveSection: (section: number) => void;
  activeTab: number;
  setActiveTab: (tab: number) => void;
  sectionCount: number;
  menuSectionIndex: number;
  tabCount: number;
};

export const useSwipeNavigation = ({
  activeSection,
  setActiveSection,
  activeTab,
  setActiveTab,
  sectionCount,
  menuSectionIndex,
  tabCount,
}: SwipeConfig) => {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwiping = useRef(false);

  // ✅ نتحقق إذا الجهاز يدعم اللمس (موبايل أو تابلت)
  const isTouchDevice = typeof window !== 'undefined' && navigator.maxTouchPoints > 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 100;
    if (isSwiping.current || Math.abs(diff) < threshold) return;
    isSwiping.current = true;

    const forward = diff > 0;

    if (activeSection === menuSectionIndex) {
      if (!isTouchDevice) {
        if (forward && activeTab < tabCount - 1) setActiveTab(activeTab + 1);
        else if (!forward && activeTab > 0) setActiveTab(activeTab - 1);
        else setActiveSection(forward ? menuSectionIndex + 1 : menuSectionIndex - 1);
      } else {
        setActiveSection(forward ? menuSectionIndex + 1 : menuSectionIndex - 1);
      }
    } else {
      const next = forward ? activeSection + 1 : activeSection - 1;
      if (next >= 0 && next < sectionCount) setActiveSection(next);
    }

    setTimeout(() => {
      isSwiping.current = false;
    }, 800);
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};
