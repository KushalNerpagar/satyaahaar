import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DEFAULT_TITLE = "SatyaAhaar | Food literacy for better choices";

function titleFor(pathname) {
  if (pathname.startsWith("/scanner")) return "Barcode scanner | SatyaAhaar";
  if (pathname.startsWith("/product/")) return "Product nutrition | SatyaAhaar";
  if (pathname.startsWith("/recipes")) return "Recipe finder | SatyaAhaar";
  return DEFAULT_TITLE;
}

/**
 * Keeps the document title in sync with the hash route.
 */
export default function RouteTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = titleFor(pathname);
  }, [pathname]);

  return null;
}
