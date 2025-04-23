// ✅ useSwipeNavigation.ts (Final Version)
import { useRef } from 'react';

type SwipeConfig = {
  activeSection: number;
  setActiveSection: (section: number) => void;
  activeTab: number;
  sectionCount: number;
  menuSectionIndex: number;
  tabCount: number;
};

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

    // تجاهل إذا المستخدم كبس على زر (مثل تاب)
    const el = startTarget.current as HTMLElement | null;
    if (el && (el.tagName === 'BUTTON' || el.closest('button'))) return;

    if (isSwiping.current || Math.abs(diff) < threshold || timeDiff > 300) return;
    isSwiping.current = true;

    const forward = diff > 0;

    // ✅ التنقل بين كل السكشنات باستخدام Swipe
    if (activeSection === menuSectionIndex) {
      // داخل MenuSection: فقط تنقل سكشن إذا على أول أو آخر تاب
      const atFirstTab = activeTab === 0;
      const atLastTab = activeTab === tabCount - 1;

      if (forward && atLastTab) {
        setActiveSection(menuSectionIndex + 1);
      } else if (!forward && atFirstTab) {
        setActiveSection(menuSectionIndex - 1);
      }
    } else {
      // باقي السكشنات: حرّك عادي
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
