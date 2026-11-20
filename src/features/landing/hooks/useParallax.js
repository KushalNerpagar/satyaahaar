import { useEffect, useRef } from "react";

const MAX_OFFSET = 5;

/**
 * Mouse-driven parallax for the "Our story" imagery.
 * Disabled when the user prefers reduced motion.
 */
export function useParallax(speed = 1) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const onMove = (event) => {
      const x = ((event.clientX / window.innerWidth) * MAX_OFFSET * 2 - MAX_OFFSET) * -speed;
      const y = ((event.clientY / window.innerHeight) * MAX_OFFSET * 2 - MAX_OFFSET) * -speed;
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [speed]);

  return ref;
}
