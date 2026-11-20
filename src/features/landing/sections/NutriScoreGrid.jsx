import Button from "../../../components/ui/Button";
import SectionHeading from "../../../components/ui/SectionHeading";
import { homeAsset } from "../../../lib/assets";
import { NUTRI_SCORES } from "../content";

export default function NutriScoreGrid() {
  return (
    <section
      id="menu"
      aria-label="Product Nutri-Scores"
      className="relative z-10 overflow-hidden py-[70px] lg:py-[100px]"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <SectionHeading subtitle="Reviews of products" title="Nutri-Scores" />

        <div className="relative mt-10">
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-0 hidden h-full border-l border-white/20 lg:block"
          />

          <ul className="grid gap-y-10 md:grid-cols-2 md:gap-x-[90px] xl:gap-x-[200px] xl:gap-y-[55px]">
            {NUTRI_SCORES.map((product) => (
              <li key={product.name}>
                <article className="group flex items-start gap-5">
                  <figure className="aspect-square w-[100px] shrink-0 overflow-hidden rounded-3xl bg-gold">
                    <img
                      src={homeAsset(product.image)}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-70"
                    />
                  </figure>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-[15px] gap-y-2 sm:flex-nowrap">
                      <h3 className="font-display text-title-3 leading-[1.2]">
                        <a href="#/scanner" className="transition-colors hover:text-gold">
                          {product.name}
                        </a>
                      </h3>

                      {product.badge && (
                        <span className="bg-gold px-2.5 font-display uppercase leading-[1.4] text-eerie-1">
                          {product.badge}
                        </span>
                      )}

                      <span className="flex flex-grow items-center gap-[15px] font-display text-title-2 text-gold before:h-1.5 before:flex-grow before:border-y before:border-white/20">
                        {product.grade}
                      </span>
                    </div>

                    <p className="mt-2 text-label-1 leading-[1.6] text-quick-silver">
                      {product.text}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-12 text-center text-body-1">
          Stay always <span className="text-gold">healthy</span> and{" "}
          <span className="text-gold">fit</span>
        </p>

        <div className="mt-[26px] text-center">
          <Button href="#/recipes">View more</Button>
        </div>
      </div>

      <img
        src={homeAsset("images/shape-5.png")}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute left-0 top-0 -z-10 hidden w-[70%] animate-move lg:block"
      />
      <img
        src={homeAsset("images/shape-6.png")}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute bottom-0 right-0 -z-10 hidden w-[70%] animate-move lg:block"
      />
    </section>
  );
}
