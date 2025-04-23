// ✅ useSwipeNavigation.ts (with smart swipe cancel)
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
  const startTime = useRef(0);
  const isSwiping = useRef(false);
  const startTarget = useRef<EventTarget | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    startTime.current = Date.now();
    startTarget.current = e.target;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const timeDiff = Date.now() - startTime.current;
    const threshold = 100;

    const el = startTarget.current as HTMLElement | null;
    if (
      el && (
        el.tagName === 'BUTTON' ||
        el.closest('button') ||
        el.classList.contains('category-tap') ||
        el.closest('.category-tap') ||
        el.classList.contains('meal-card') ||
        el.closest('.meal-card')
      )
    ) {
      console.log('🛑 Swipe cancelled: user tapped interactive element');
      return;
    }

    if (isSwiping.current || Math.abs(diff) < threshold || timeDiff > 300) return;
    isSwiping.current = true;

    const forward = diff > 0;

    if (activeSection === menuSectionIndex) {
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
