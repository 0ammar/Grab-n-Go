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

    // ✅ تجاهل السواب إذا كانت كبسة على زر (مثل التاب)
    const el = startTarget.current as HTMLElement | null;
    if (el && (el.tagName === 'BUTTON' || el.closest('button'))) return;

    // ✅ تجاهل الحركة إذا كانت بطيئة أو قصيرة = كبسة عادية مش سوايب
    if (isSwiping.current || Math.abs(diff) < threshold || timeDiff > 300) return;
    isSwiping.current = true;

    const forward = diff > 0;

    // ✅ التنقل بين السكشنات فقط، ممنوع تغيير التابات بالسواب (سواء كمبيوتر أو موبايل)
    if (activeSection === menuSectionIndex) {
      if (forward && activeTab === tabCount - 1) {
        setActiveSection(menuSectionIndex + 1);
      } else if (!forward && activeTab === 0) {
        setActiveSection(menuSectionIndex - 1);
      }
      // ❌ ممنوع تغيير التابات بسواب
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
