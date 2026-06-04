import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Standard utility to animate an element fading and moving up when entering the viewport
 * @param {HTMLElement|string} element - Target element selector or DOM node
 * @param {number} delay - Animation delay in seconds
 * @param {number} yOffset - Verticial entry offset (pixels)
 */
export const initFadeUp = (element, delay = 0, yOffset = 30) => {
  gsap.fromTo(element, 
    { y: yOffset, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      delay: delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    }
  );
};

export default initFadeUp;
