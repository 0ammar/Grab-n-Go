import { useEffect, useRef } from 'react';
import { menuCategories } from '@/data/menuData';

const isMobileScreen = () =>
  typeof window !== 'undefined' && window.innerWidth <= 768;

export const useTabScrollNavigation = (
  isActive: boolean,
  activeTab: number,
  setActiveTab: (index: number) => void,
  goBack: () => void
) => {
  const isSwiping = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const goToNextTab = () => {
    if (activeTab < menuCategories.length - 1) {
      setActiveTab(activeTab + 1);
    }
  };

  const goToPreviousTab = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    } else {
      goBack();
    }
  };

  const handleSwipe = (_e: any, info: { offset: { x: number } }) => {
    if (isSwiping.current || isMobileScreen()) return;

    const swipeX = info.offset.x;
    const threshold = 180;

    if (swipeX < -threshold) {
      isSwiping.current = true;
      goToNextTab();
    } else if (swipeX > threshold) {
      isSwiping.current = true;
      goToPreviousTab();
    }

    setTimeout(() => {
      isSwiping.current = false;
    }, 800);
  };

  useEffect(() => {
    if (!isActive || isMobileScreen()) return;

    const handleWheel = (e: WheelEvent) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        e.deltaY > 0 ? goToNextTab() : goToPreviousTab();
      }, 100);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isActive, activeTab]);

  return { goToNextTab, goToPreviousTab, handleSwipe };
};
