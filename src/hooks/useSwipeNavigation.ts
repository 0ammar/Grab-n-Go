// ✅ useSwipeNavigation.ts (Final, Fixed)
import { useRef } from 'react';

type SwipeConfig = {
  activeSection: number;
  setActiveSection: (section: number) => void;
  sectionCount: number;
};

export const useSwipeNavigation = ({
  activeSection,
  setActiveSection,
  sectionCount,
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
      el &&
      (el.tagName === 'BUTTON' ||
        el.closest('button') ||
        el.classList.contains('category-tap') ||
        el.closest('.category-tap') ||
        el.classList.contains('meal-card') ||
        el.closest('.meal-card'))
    ) {
      console.log('🛑 Swipe cancelled: tapped element');
      return;
    }

    if (isSwiping.current || Math.abs(diff) < threshold || timeDiff > 300) return;
    isSwiping.current = true;

    const forward = diff > 0;
    const nextSection = forward ? activeSection + 1 : activeSection - 1;

    if (nextSection >= 0 && nextSection < sectionCount) {
      setActiveSection(nextSection);
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
