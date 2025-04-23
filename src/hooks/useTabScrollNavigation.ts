import { useEffect, useRef } from 'react';
import { menuCategories } from '@/data/menuData';

export const useTabScrollNavigation = (
  isActive: boolean,
  activeTab: number,
  setActiveTab: (index: number) => void,
  goBack: () => void
) => {
  const isSwiping = useRef(false);
  const isTouchDevice = typeof window !== 'undefined' && navigator.maxTouchPoints > 0;

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
    if (isTouchDevice || isSwiping.current) return;

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
    if (!isActive || isTouchDevice) return;

    let timeout: NodeJS.Timeout;
    const handleWheel = (e: WheelEvent) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        e.deltaY > 0 ? goToNextTab() : goToPreviousTab();
      }, 100);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isActive, activeTab]);

  return { goToNextTab, goToPreviousTab, handleSwipe };
};
