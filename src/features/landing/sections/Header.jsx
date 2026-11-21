import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import Button from "../../../components/ui/Button";
import { NAV_LINKS, SITE } from "../content";

function scrollToSection(event, href) {
  if (!href.startsWith("#") || href.startsWith("#/")) return;
  event.preventDefault();
  const target = href === "#" ? null : document.getElementById(href.slice(1));
  target?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Header({ scrolled, hidden }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (menuOpen) {
      closeButtonRef.current?.focus();
    } else if (wasOpen.current) {
      menuButtonRef.current?.focus();
    }
    wasOpen.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeAndNavigate = (event, href) => {
    scrollToSection(event, href);
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 z-50 border-b border-transparent transition-all duration-300 ${
          hidden ? "-translate-y-full" : ""
        } ${scrolled ? "top-0 border-black/15 bg-eerie-4 py-5" : "top-0 bg-transparent py-10 sm:top-[51px]"}`}
      >
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-2 px-5 xl:max-w-none">
          <nav
            id="site-nav"
            aria-label="Main navigation"
            className={`fixed inset-y-0 left-0 z-50 w-full max-w-[360px] overflow-y-auto bg-smoky-1 px-[30px] pb-[50px] transition-all duration-500 xl:static xl:z-auto xl:mx-auto xl:max-w-none xl:translate-x-0 xl:overflow-visible xl:bg-transparent xl:p-0 xl:transition-none ${
              menuOpen ? "visible translate-x-0" : "invisible -translate-x-full"
            }`}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="my-[30px] ml-auto block rounded-full border border-current p-1 text-white transition-colors hover:text-gold xl:hidden"
            >
              <X size={18} />
            </button>

            <div className="text-center xl:hidden">
              <p className="mb-[15px] font-display text-headline-1">Explore</p>
              <address className="not-italic text-body-2 text-quick-silver">
                Food Literacy with Fun, <br />
                @Satyahar
              </address>
              <p className="my-2.5 text-body-2 text-quick-silver">_</p>
              <a
                href={`mailto:${SITE.email}`}
                className="text-body-2 text-quick-silver transition-colors hover:text-gold"
              >
                {SITE.email}
              </a>
              <span
                aria-hidden="true"
                className="mx-auto my-[30px] block h-2 w-2 rotate-45 border border-gold"
              />
              <p className="mb-2.5 font-bold">More</p>
              <a
                href={SITE.github}
                target="_blank"
                rel="noreferrer"
                className="block text-body-1 text-gold underline-offset-4 hover:underline"
              >
                github.com/KushalNerpagar
              </a>
            </div>

            <ul className="mb-[100px] mt-[30px] border-b border-white/20 xl:mb-0 xl:mt-0 xl:flex xl:gap-[30px] xl:border-0">
              {NAV_LINKS.map((link, index) => (
                <li key={link.label} className="border-t border-white/20 xl:border-0">
                  <a
                    href={link.href}
                    onClick={(event) => closeAndNavigate(event, link.href)}
                    aria-current={index === 0 ? "page" : undefined}
                    className="group relative flex items-center py-2.5 text-label-2 uppercase text-white transition-colors hover:text-gold xl:font-bold xl:tracking-[0.15em] xl:hover:text-white"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border border-gold opacity-0 transition-opacity group-hover:opacity-100 xl:hidden"
                    />
                    <span className="transition-transform duration-300 group-hover:translate-x-5 xl:group-hover:translate-x-0">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden sm:block">
            <Button href="#/scanner" variant="secondary">
              Food Detector
            </Button>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-controls="site-nav"
            aria-expanded={menuOpen}
            className="group py-3 pr-0 xl:hidden"
          >
            <span className="my-1 block h-0.5 w-[30px] origin-left bg-white transition-transform duration-300 group-hover:scale-x-50" />
            <span className="my-1 block h-0.5 w-[30px] origin-left bg-white transition-transform delay-100 duration-300 group-hover:scale-x-50" />
            <span className="my-1 block h-0.5 w-[30px] origin-left bg-white transition-transform delay-200 duration-300 group-hover:scale-x-50" />
          </button>
        </div>
      </header>

      <button
        type="button"
        aria-label="Close menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/80 transition-opacity duration-500 xl:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
    </>
  );
}
