import { useEffect } from 'react';
import { menuCategories } from '@/data/menuData';

export const useTabScrollNavigation = (
  isActive: boolean,
  activeTab: number,
  setActiveTab: (index: number) => void,
  goBack: () => void
) => {
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
    const swipeX = info.offset.x;
    if (swipeX < -100) goToNextTab();
    else if (swipeX > 100) goToPreviousTab();
  };

  useEffect(() => {
    if (!isActive) return;

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
