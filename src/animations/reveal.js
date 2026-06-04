import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Directional reveal helper utilizing scrollTrigger for clean card transitions
 * @param {HTMLElement|string} element - Target element selector or DOM node
 * @param {string} direction - Direction of entry ('left', 'right', 'top', 'bottom')
 * @param {number} delay - Animation delay in seconds
 */
export const initReveal = (element, direction = 'left', delay = 0) => {
  const startX = direction === 'left' ? -50 : direction === 'right' ? 50 : 0;
  const startY = direction === 'top' ? -50 : direction === 'bottom' ? 50 : 0;
  
  gsap.fromTo(element,
    { x: startX, y: startY, opacity: 0 },
    {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 1,
      delay: delay,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    }
  );
};

export default initReveal;
