import { useEffect, useRef } from "react";
import "./landing.css";

function assetUrl(path) {
  const base = process.env.PUBLIC_URL || "";
  return `${base}/assets/home/${path}`;
}

export default function LandingPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const page = pageRef.current;
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = assetUrl("css/style.css");
    document.head.appendChild(stylesheet);

    const handleAnchorClick = (event) => {
      const anchor = event.target.closest("a");
      if (!anchor || !page.contains(anchor)) return;
      const href = anchor.getAttribute("href") || "";
      if (!href.startsWith("#") || href.startsWith("#/")) return;
      event.preventDefault();
      const target = href === "#" ? page : document.getElementById(href.slice(1));
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    page.addEventListener("click", handleAnchorClick);

    fetch(assetUrl("body.html"))
      .then((response) => {
        if (!response.ok) throw new Error("Landing page could not be loaded");
        return response.text();
      })
      .then((markup) => {
        if (cancelled) return;
        page.innerHTML = markup;

        const legacyScript = document.createElement("script");
        legacyScript.src = assetUrl("js/script.js");
        legacyScript.onload = () => window.dispatchEvent(new Event("load"));
        page.appendChild(legacyScript);

        const ioniconsModule = document.createElement("script");
        ioniconsModule.type = "module";
        ioniconsModule.src = "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js";
        page.appendChild(ioniconsModule);

        const ioniconsFallback = document.createElement("script");
        ioniconsFallback.noModule = true;
        ioniconsFallback.src = "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js";
        page.appendChild(ioniconsFallback);
      })
      .catch((error) => {
        console.error(error);
        if (!cancelled) {
          page.innerHTML = "<p class=\"landing-load-error\">SatyaAhaar is loading. Please refresh the page.</p>";
        }
      });

    return () => {
      cancelled = true;
      page.removeEventListener("click", handleAnchorClick);
      page.innerHTML = "";
      stylesheet.remove();
      document.body.classList.remove("nav-active", "loaded");
    };
  }, []);

  return <div ref={pageRef} className="landing-shell" />;
}
