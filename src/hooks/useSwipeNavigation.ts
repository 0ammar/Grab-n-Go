import { useRef } from 'react';

type SwipeConfig = {
  activeSection: number;
  setActiveSection: (section: number) => void;
  activeTab: number;
  sectionCount: number;
  menuSectionIndex: number;
  tabCount: number;
};

const isMobileScreen = () =>
  typeof window !== 'undefined' && window.innerWidth <= 768;

export const useSwipeNavigation = ({
  activeSection,
  setActiveSection,
  activeTab,
  sectionCount,
  menuSectionIndex,
  tabCount,
}: SwipeConfig) => {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const startTime = useRef(0);
  const isSwiping = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    startTime.current = Date.now();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const swipeDuration = Date.now() - startTime.current;
    const swipeThreshold = 50;
    const maxSwipeTime = 500;

    const isSwipeValid =
      Math.abs(swipeDistance) > swipeThreshold && swipeDuration < maxSwipeTime;
    if (!isSwipeValid || isSwiping.current) return;

    // ✅ امنع السوايب داخل قسم Menu على الموبايل فقط
    const isMobile = isMobileScreen();
    const isInMenu = activeSection === menuSectionIndex;
    if (isMobile && isInMenu) return;

    isSwiping.current = true;
    const forward = swipeDistance > 0;

    if (isInMenu) {
      const atFirstTab = activeTab === 0;
      const atLastTab = activeTab === tabCount - 1;

      if (forward && atLastTab) {
        setActiveSection(menuSectionIndex + 1);
      } else if (!forward && atFirstTab) {
        setActiveSection(menuSectionIndex - 1);
      }
    } else {
      const next = forward ? activeSection + 1 : activeSection - 1;
      if (next >= 0 && next < sectionCount) {
        setActiveSection(next);
      }
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
