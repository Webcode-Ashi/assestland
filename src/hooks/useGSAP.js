import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger since it's commonly used in GSAP projects
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook to safely instantiate GSAP animations inside React components
 * by leveraging gsap.context() for automated cleanup.
 * 
 * @param {Function} animationCallback - Callback containing GSAP animation logic
 * @param {Array} dependencies - Hook dependencies to trigger animation re-creation
 * @returns {React.RefObject} - elementRef to be attached as scope container
 */
export const useGSAP = (animationCallback, dependencies = []) => {
  const elementRef = useRef(null);

  useEffect(() => {
    // Create a GSAP context scoped to the target elementRef
    const ctx = gsap.context(() => {
      if (animationCallback) {
        animationCallback();
      }
    }, elementRef);

    // Clean up / revert animations on unmount or dependency updates
    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return elementRef;
};

export default useGSAP;
