import SectionHeading from "../../../components/ui/SectionHeading";
import { homeAsset } from "../../../lib/assets";
import { FEATURES } from "../content";

export default function WhyChooseUs() {
  return (
    <section
      aria-label="Why choose us"
      className="relative z-10 overflow-hidden py-[70px] text-center lg:py-[100px]"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <SectionHeading subtitle="Why choose us" title="We help you" />

        <ul className="mt-10 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <li key={feature.title}>
              <article
                className={`group px-5 pb-10 pt-[30px] ${
                  index % 2 === 0 ? "bg-eerie-3" : "bg-smoky-3"
                }`}
              >
                <div className="mx-auto max-w-max transition-transform duration-500 group-hover:[transform:scale(-1)_rotate(180deg)]">
                  <img
                    src={homeAsset(feature.icon)}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-20 w-[100px] object-contain"
                  />
                </div>

                <h3 className="my-5 font-display text-title-2 leading-[1.2]">{feature.title}</h3>
                <p className="leading-[1.4] text-quick-silver">{feature.text}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <img
        src={homeAsset("images/shape-7.png")}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute right-0 top-[-100px] -z-10 hidden xl:block"
      />
      <img
        src={homeAsset("images/shape-8.png")}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute bottom-20 left-0 -z-10 hidden xl:block"
      />
    </section>
  );
}
