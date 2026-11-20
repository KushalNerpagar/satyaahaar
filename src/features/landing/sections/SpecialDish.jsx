import Button from "../../../components/ui/Button";
import SectionHeading from "../../../components/ui/SectionHeading";
import { homeAsset } from "../../../lib/assets";

export default function SpecialDish() {
  return (
    <section
      aria-label="Trending recipe"
      className="relative z-10 text-center lg:grid lg:grid-cols-2 lg:text-left"
    >
      <div className="h-full overflow-hidden">
        <img
          src={homeAsset("images/trendind today1 (Custom).jpg")}
          alt="Sarson ka Saag with Makki ki Roti"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="bg-smoky-2 py-[70px] lg:py-[225px] lg:pl-[120px]">
        <div className="relative mx-auto w-full max-w-[1200px] px-4 lg:mx-0 lg:max-w-[460px] lg:px-0">
          <img
            src={homeAsset("images/badge-1.png")}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="mx-auto mb-3 lg:absolute lg:-left-10 lg:top-2.5 lg:mx-0 lg:animate-move"
          />

          <SectionHeading
            subtitle="Trending nowadays"
            title="Sarson ka Saag with Makki ki Roti"
            className="text-center lg:text-left"
          />

          <p className="mt-4 mb-10 text-quick-silver">
            Sarson ka Saag with Makki ki Roti offers antioxidants, vitamins A, C, and K. It
            supports heart health, boosts immunity, and aids digestion, making it ideal for
            winter wellness.
          </p>

          <Button href="#/recipes" className="lg:mx-0">
            View all recipes
          </Button>
        </div>
      </div>

      <img
        src={homeAsset("images/shape-4.png")}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute right-0 top-[45%] z-10 hidden xl:block"
      />
      <img
        src={homeAsset("images/shape-9.png")}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute bottom-0 right-0 z-10 hidden w-max translate-y-1/2 xl:block"
      />
    </section>
  );
}
