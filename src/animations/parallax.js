import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Parallax movement bound to scroll position
 * @param {HTMLElement|string} element - Target element selector or DOM node
 * @param {number} speed - Rate of movement relative to scroll (e.g., 0.5)
 */
export const initParallax = (element, speed = 0.5) => {
  gsap.to(element, {
    yPercent: -20 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
};

export default initParallax;
