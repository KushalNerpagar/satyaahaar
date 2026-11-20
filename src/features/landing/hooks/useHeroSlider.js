import { useCallback, useEffect, useState } from "react";

/**
 * Drives the hero slider: manual navigation plus autoplay that pauses
 * while the pointer is over a control.
 */
export function useHeroSlider(length, interval = 7000) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setIndex((current) => (current + 1) % length);
  }, [length]);

  const prev = useCallback(() => {
    setIndex((current) => (current - 1 + length) % length);
  }, [length]);

  useEffect(() => {
    if (paused || length < 2) return undefined;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [paused, length, interval, next]);

  return { index, next, prev, pause: () => setPaused(true), resume: () => setPaused(false) };
}
