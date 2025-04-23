// ✅ useSwipeNavigation.ts (Debug Version)
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
    if (el && (el.tagName === 'BUTTON' || el.closest('button'))) return;
    if (isSwiping.current || Math.abs(diff) < threshold || timeDiff > 300) return;

    isSwiping.current = true;
    const forward = diff > 0;

    console.log('👉 SWIPE DETECTED');
    console.log('➡️ Direction:', forward ? 'Right → Left (Forward)' : 'Left → Right (Back)');
    console.log('🧭 activeSection:', activeSection);
    console.log('📦 activeTab:', activeTab);
    console.log('🔢 tabCount:', tabCount);
    console.log('📌 menuSectionIndex:', menuSectionIndex);

    if (activeSection === menuSectionIndex) {
      const atFirstTab = activeTab === 0;
      const atLastTab = activeTab === tabCount - 1;

      if (forward && atLastTab) {
        console.log('✅ Move to About Section (menu → about)');
        setActiveSection(menuSectionIndex + 1);
      } else if (!forward && atFirstTab) {
        console.log('✅ Move to Hero Section (menu → hero)');
        setActiveSection(menuSectionIndex - 1);
      } else {
        console.log('🚫 No section change. Swipe in middle tab.');
      }
    } else {
      const next = forward ? activeSection + 1 : activeSection - 1;
      if (next >= 0 && next < sectionCount) {
        console.log('✅ Move to section:', next);
        setActiveSection(next);
      } else {
        console.log('🚫 Out of bounds swipe.');
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
