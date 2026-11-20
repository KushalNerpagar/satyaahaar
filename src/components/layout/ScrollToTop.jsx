import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets the scroll position when the route changes so a page always opens
 * at the top instead of inheriting the previous page's scroll offset.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
