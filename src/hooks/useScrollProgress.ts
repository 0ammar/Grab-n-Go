import { useEffect } from 'react';

export const useScrollProgress = () => {
  useEffect(() => {
    const leftLine = document.querySelector<HTMLElement>('.scroll-line.left');
    const rightLine = document.querySelector<HTMLElement>('.scroll-line.right');
    const track = document.querySelector<HTMLElement>('.scroll-track');

    if (!leftLine || !rightLine || !track) return;

    let isScrolling = false;
    let timeout: NodeJS.Timeout;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      const half = Math.min(progress / 2, 50);

      leftLine.style.animation = rightLine.style.animation = 'none';
      leftLine.style.width = rightLine.style.width = `${half}%`;

      if (!isScrolling) {
        isScrolling = true;
        track.classList.add('scrolling');
      }

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        leftLine.style.animation = rightLine.style.animation =
          'fillDrain 8s ease-in-out infinite';
        track.classList.remove('scrolling');
        isScrolling = false;
      }, 1000);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);
};
