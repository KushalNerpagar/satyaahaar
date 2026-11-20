import { useEffect, useState } from "react";

/**
 * Tracks whether the page has scrolled past the header threshold and
 * whether the user is scrolling down (so the header can hide).
 */
export function useScrollState(threshold = 50) {
  const [state, setState] = useState({ scrolled: false, hidden: false });

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setState({
        scrolled: y >= threshold,
        hidden: y > lastY && y > threshold,
      });
      lastY = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return state;
}
