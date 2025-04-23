// ✅ useScrollProgress.ts (Refactored)
import { useEffect, useRef } from 'react';

export const useScrollProgress = () => {
  const leftLineRef = useRef<HTMLElement | null>(null);
  const rightLineRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    leftLineRef.current = document.querySelector('.scroll-line.left');
    rightLineRef.current = document.querySelector('.scroll-line.right');
    trackRef.current = document.querySelector('.scroll-track');

    if (!leftLineRef.current || !rightLineRef.current || !trackRef.current) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      const half = Math.min(progress / 2, 50);

      leftLineRef.current!.style.animation = rightLineRef.current!.style.animation = 'none';
      leftLineRef.current!.style.width = rightLineRef.current!.style.width = `${half}%`;

      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        trackRef.current!.classList.add('scrolling');
      }

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        leftLineRef.current!.style.animation = rightLineRef.current!.style.animation =
          'fillDrain 8s ease-in-out infinite';
        trackRef.current!.classList.remove('scrolling');
        isScrollingRef.current = false;
      }, 1000);
    };

    window.addEventListener('scroll', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
};
