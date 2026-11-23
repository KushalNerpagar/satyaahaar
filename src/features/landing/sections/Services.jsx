import SectionHeading from "../../../components/ui/SectionHeading";
import { homeAsset } from "../../../lib/assets";
import { SERVICES } from "../content";

export default function Services() {
  return (
    <section
      aria-label="What we offer"
      className="relative z-10 overflow-hidden bg-smoky-2 py-[70px] text-center lg:py-[100px]"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <SectionHeading subtitle="Flavors and tech" title="We offer features" />

        <p className="mx-auto mt-4 mb-10 max-w-[420px] text-quick-silver lg:mb-[75px]">
          This web offers features that help with food choices. It is a step toward food
          literacy — keep eating healthy with food literacy &amp; SatyaAhaar.
        </p>

        <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:gap-[150px]">
          {SERVICES.map((service, index) => (
            <li key={service.title} className={index % 2 === 0 ? "xl:-translate-y-40" : ""}>
              <article className="group overflow-hidden">
                <a
                  href={service.href}
                  className="relative mb-[26px] block py-[30px]"
                  aria-label={service.title}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-[140px] -translate-x-1/2"
                  >
                    <span
                      className="block h-full w-full bg-cover bg-center bg-repeat transition-transform duration-500 group-hover:[transform:rotateY(0.5turn)]"
                      style={{ backgroundImage: `url("${homeAsset("images/img-pattern.svg")}")` }}
                    />
                  </span>
                  <figure className="aspect-[285/336] overflow-hidden bg-eerie-4 transition-transform duration-500 group-hover:scale-105">
                    <img
                      src={homeAsset(service.image)}
                      alt={service.alt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </figure>
                </a>

                <div>
                  <h3 className="mb-3 font-display text-title-4 leading-[1.2]">
                    <a href={service.href} className="transition-colors hover:text-gold">
                      {service.title}
                    </a>
                  </h3>
                  <a
                    href={service.href}
                    aria-label={`View context: ${service.title}`}
                    className="inline-block pb-1 text-label-2 font-bold uppercase tracking-[0.2em] text-gold transition-colors hover:text-white"
                  >
                    View context
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <img
        src={homeAsset("images/shape-1.png")}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute bottom-0 left-0 -z-10 hidden animate-move lg:block"
      />
      <img
        src={homeAsset("images/shape-2.png")}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute right-0 top-0 -z-10 hidden animate-move lg:block"
      />
    </section>
  );
}
