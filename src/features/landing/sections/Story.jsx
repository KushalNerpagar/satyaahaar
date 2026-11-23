import Button from "../../../components/ui/Button";
import SectionHeading from "../../../components/ui/SectionHeading";
import { homeAsset } from "../../../lib/assets";
import { useParallax } from "../hooks/useParallax";

export default function Story() {
  const bannerRef = useParallax(1);
  const insetRef = useParallax(1.75);

  return (
    <section
      id="about"
      aria-label="Our story"
      className="relative z-10 overflow-hidden py-[70px] text-center lg:py-[170px] lg:pb-[100px]"
    >
      <div className="mx-auto grid w-full max-w-[1200px] gap-[120px] px-4 sm:gap-20 lg:grid-cols-[0.7fr_1fr] lg:gap-[30px]">
        <div className="lg:text-left xl:pr-[90px]">
          <SectionHeading
            subtitle="Our story"
            title="Every bite tells a story"
            className="text-center lg:text-left"
            titleClassName=""
          />

          <p className="mx-auto mt-4 mb-8 max-w-[420px] text-quick-silver lg:mx-0">
            Food literacy is not just knowledge — it is a shield against the hidden dangers in
            what we consume. Every bite has the power to nourish or harm, and without the wisdom
            to tell safe, wholesome food from contaminated options, we risk our health. Being
            food literate means protecting ourselves and our loved ones, choosing safety over
            ignorance, and building a future where preventable illness no longer catches us
            unprepared.
          </p>

          <p className="font-bold">Be literate</p>

          <Button
            href="https://www.sciencedirect.com/science/article/abs/pii/S0950329324001344"
            target="_blank"
            rel="noreferrer"
            className="mt-[26px] lg:mx-0"
          >
            Read more
          </Button>
        </div>

        <figure className="relative mb-[120px]">
          <img
            ref={bannerRef}
            src={homeAsset("images/about-banner.jpg")}
            alt="A table of freshly prepared food"
            width="570"
            height="570"
            loading="lazy"
            className="w-full pl-[50px] sm:pl-[90px]"
          />

          <div ref={insetRef} className="absolute -bottom-[120px] left-0 w-[150px] py-[50px] sm:w-[285px]">
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-1/2 -z-10 w-[140px] -translate-x-1/2 bg-repeat"
              style={{ backgroundImage: `url("${homeAsset("images/img-pattern.svg")}")` }}
            />
            <img
              src={homeAsset("images/about-abs-image.jpg")}
              alt=""
              width="285"
              height="285"
              loading="lazy"
              className="w-full"
            />
          </div>
        </figure>
      </div>

      <img
        src={homeAsset("images/shape-3.png")}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute left-0 top-[46%] -z-10 hidden xl:block"
      />
    </section>
  );
}
