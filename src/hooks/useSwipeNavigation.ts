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

  const isTouchDevice = typeof window !== 'undefined' && navigator.maxTouchPoints > 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    startTime.current = Date.now();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const timeDiff = Date.now() - startTime.current;
    const threshold = 100;

    // ❌ تجاهل التمرير البسيط أو النقرات البطيئة
    if (isSwiping.current || Math.abs(diff) < threshold || timeDiff > 300) return;
    isSwiping.current = true;

    const forward = diff > 0;

    if (activeSection === menuSectionIndex) {
      if (!isTouchDevice) {
        // 💻 كمبيوتر: نسمح بالتنقل بين التابات
        if (forward && activeTab < tabCount - 1) setActiveTab(activeTab + 1);
        else if (!forward && activeTab > 0) setActiveTab(activeTab - 1);
        else setActiveSection(forward ? menuSectionIndex + 1 : menuSectionIndex - 1);
      } else {
        // 📱 موبايل: نسمح بالتنقل بين السكشنز فقط عند Swipe حقيقي من أول أو آخر تاب
        const atFirstTab = activeTab === 0;
        const atLastTab = activeTab === tabCount - 1;

        if (forward && atLastTab) {
          setActiveSection(menuSectionIndex + 1);
        } else if (!forward && atFirstTab) {
          setActiveSection(menuSectionIndex - 1);
        }
        // وإلا: تجاهل السواب الجانبي
      }
    } else {
      // خارج MenuSection → مسموح التنقل بين السكشنز بالسواب العمودي
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
