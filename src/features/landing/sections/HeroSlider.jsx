import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../../../components/ui/Button";
import { homeAsset } from "../../../lib/assets";
import { HERO_SLIDES } from "../content";
import { useHeroSlider } from "../hooks/useHeroSlider";

const REVEAL_DELAYS = ["0ms", "120ms", "240ms", "360ms"];

function revealClass(active) {
  return active ? "animate-slide-reveal" : "opacity-0";
}

export default function HeroSlider() {
  const { index, next, prev, pause, resume } = useHeroSlider(HERO_SLIDES.length);

  return (
    <section
      id="home"
      aria-label="Welcome"
      onMouseEnter={pause}
      onMouseLeave={resume}
      className="relative z-10 min-h-screen overflow-hidden py-[120px] text-center lg:h-[880px]"
    >
      <ul>
        {HERO_SLIDES.map((slide, slideIndex) => {
          const active = slideIndex === index;

          return (
            <li
              key={slide.subtitle}
              aria-hidden={!active}
              className={`absolute left-1/2 top-1/2 z-10 grid h-full w-full -translate-x-1/2 -translate-y-1/2 place-content-center overflow-hidden pt-[100px] transition-all duration-1000 ${
                active ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              <div
                className={`absolute inset-0 -z-10 ${active ? "animate-smooth-scale" : "scale-[1.15]"}`}
              >
                <img
                  src={homeAsset(slide.image)}
                  srcSet={
                    slide.imageSmall
                      ? `${homeAsset(slide.imageSmall)} 960w, ${homeAsset(slide.image)} 1880w`
                      : undefined
                  }
                  sizes="100vw"
                  alt=""
                  className="h-full w-full object-cover"
                  loading={slideIndex === 0 ? "eager" : "lazy"}
                />
                <span aria-hidden="true" className="absolute inset-0 bg-black/40" />
              </div>

              <div
                className={revealClass(active)}
                style={{ animationDelay: REVEAL_DELAYS[0] }}
              >
                <p className="text-label-2 font-bold uppercase tracking-[0.4em] text-gold">
                  {slide.subtitle}
                </p>
                <img
                  src={homeAsset("images/separator.svg")}
                  alt=""
                  aria-hidden="true"
                  width="97"
                  height="13"
                  className="mx-auto my-3.5 mb-5 w-[100px]"
                />
              </div>

              <h1
                className={`font-display text-display-1 leading-none text-white ${revealClass(
                  active
                )}`}
                style={{ animationDelay: REVEAL_DELAYS[1] }}
              >
                {slide.title}
              </h1>

              <p
                className={`mx-auto my-2.5 mb-10 max-w-[620px] px-4 text-[1rem] leading-[1.6] text-white sm:text-[1.25rem] ${revealClass(
                  active
                )}`}
                style={{ animationDelay: REVEAL_DELAYS[2] }}
              >
                {slide.text}
              </p>

              <div
                className={`${revealClass(active)} mx-auto`}
                style={{ animationDelay: REVEAL_DELAYS[3] }}
              >
                <Button
                  href={slide.cta.href}
                  target={slide.cta.href.startsWith("http") ? "_blank" : undefined}
                  rel={slide.cta.href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={`${slide.cta.label}: ${slide.subtitle}`}
                >
                  {slide.cta.label}
                </Button>
              </div>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={prev}
        onMouseEnter={pause}
        onMouseLeave={resume}
        aria-label="Previous slide"
        className="absolute left-[30px] top-1/2 z-20 hidden h-[45px] w-[45px] -translate-y-1/2 rotate-45 place-items-center border border-gold text-gold transition-colors duration-300 hover:bg-gold hover:text-black md:grid"
      >
        <ChevronLeft size={24} className="-rotate-45" />
      </button>
      <button
        type="button"
        onClick={next}
        onMouseEnter={pause}
        onMouseLeave={resume}
        aria-label="Next slide"
        className="absolute right-[30px] top-1/2 z-20 hidden h-[45px] w-[45px] -translate-y-1/2 rotate-45 place-items-center border border-gold text-gold transition-colors duration-300 hover:bg-gold hover:text-black md:grid"
      >
        <ChevronRight size={24} className="-rotate-45" />
      </button>

      <a
        href="#about"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="absolute bottom-[15px] right-[15px] z-20 grid h-[110px] w-[110px] origin-bottom-right scale-[0.6] place-items-center bg-gold p-3 text-label-2 font-bold uppercase leading-[1.5] tracking-[0.15em] text-black sm:scale-[0.7] xl:bottom-[50px] xl:right-[50px] xl:scale-100"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-rotate-slow border border-gold"
        />
        <span>
          I&apos;m a <br />
          Food literate
        </span>
      </a>
    </section>
  );
}
