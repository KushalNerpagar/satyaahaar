import { useState } from "react";
import { Mail } from "lucide-react";
import Button from "../../../components/ui/Button";
import { homeAsset } from "../../../lib/assets";
import { FOOTER_LINKS, SITE, SOCIAL_LINKS } from "../content";

const LINK_CLASSES =
  "text-label-2 font-bold uppercase tracking-[0.3em] text-quick-silver transition-colors hover:text-gold";

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer
      className="relative z-10 bg-cover bg-center px-4 py-[70px] text-center lg:py-[100px]"
      style={{ backgroundImage: `url("${homeAsset("images/footer-bg.jpg")}")` }}
    >
      <span aria-hidden="true" className="absolute inset-0 bg-black/60" />

      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className="mb-[70px] grid items-center gap-10 md:grid-cols-2 lg:grid-cols-[0.45fr_1fr_0.45fr]">
          <div className="relative order-1 bg-smoky-1 px-10 py-[50px] md:col-span-2 lg:order-2 lg:col-span-1 lg:py-[100px]">
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-[15px] bg-repeat-y"
              style={{
                backgroundImage: `url("${homeAsset("images/footer-form-pattern.svg")}")`,
                backgroundSize: "15px auto",
              }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-y-0 right-0 w-[15px] bg-repeat-y"
              style={{
                backgroundImage: `url("${homeAsset("images/footer-form-pattern.svg")}")`,
                backgroundSize: "15px auto",
              }}
            />

            <address className="mx-auto max-w-[460px] leading-[1.5] text-quick-silver not-italic">
              When tech meets daily eating, resulting in better choices.
            </address>

            <a
              href={`mailto:${SITE.email}`}
              className="mx-auto mt-1.5 block max-w-[460px] text-quick-silver transition-colors hover:text-gold"
            >
              {SITE.email}
            </a>
            <a
              href={SITE.phoneHref}
              className="mx-auto block max-w-[460px] text-quick-silver transition-colors hover:text-gold"
            >
              Health support: {SITE.phone}
            </a>
            <p className="mx-auto max-w-[460px] text-quick-silver">...</p>

            <div aria-hidden="true" className="mx-auto my-10 mb-[25px] flex max-w-[460px] justify-center gap-0.5">
              <span className="h-2 w-2 animate-rotate-slow border border-gold" />
              <span className="h-2 w-2 animate-rotate-slow border border-gold" />
              <span className="h-2 w-2 animate-rotate-slow border border-gold" />
            </div>

            <p className="mx-auto max-w-[460px] font-display text-title-1 leading-[1.2]">
              Get news &amp; blogs
            </p>
            <p className="mx-auto mb-[30px] mt-1.5 max-w-[460px] text-label-1 text-quick-silver">
              Subscribe and be <span className="text-white">food literate.</span>
            </p>

            <form
              className="relative mx-auto max-w-[460px]"
              onSubmit={(event) => {
                event.preventDefault();
                setSubscribed(true);
              }}
            >
              <Mail
                size={16}
                aria-hidden="true"
                className="pointer-events-none absolute left-[15px] top-1/2 z-10 -translate-y-1/2"
              />
              <input
                type="email"
                name="email_address"
                autoComplete="off"
                required
                placeholder="Your email"
                aria-label="Your email"
                className="h-14 w-full border border-white/10 bg-eerie-2 py-2.5 pl-10 pr-5 text-white outline-none transition-colors placeholder:text-inherit focus:border-gold sm:pr-[205px]"
              />
              <Button
                as="button"
                type="submit"
                variant="secondary"
                full
                className="mt-4 sm:absolute sm:inset-y-0 sm:right-0 sm:mt-0 sm:w-auto"
              >
                Subscribe
              </Button>
            </form>

            {subscribed && (
              <p role="status" className="mt-4 text-label-1 text-gold">
                You are subscribed. Stay food literate!
              </p>
            )}
          </div>

          <ul className="order-2 grid gap-5 lg:order-1">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={LINK_CLASSES}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <ul className="order-3 grid gap-5">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={LINK_CLASSES}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="leading-[1.5] text-quick-silver">
          <p>
            &copy; {new Date().getFullYear()} SatyaAhaar. All rights reserved | Crafted by{" "}
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer"
              className="text-gold underline"
            >
              Kushal Nerpagar
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
