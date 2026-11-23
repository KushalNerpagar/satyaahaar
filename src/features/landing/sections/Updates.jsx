import Button from "../../../components/ui/Button";
import SectionHeading from "../../../components/ui/SectionHeading";
import { homeAsset } from "../../../lib/assets";
import { UPDATES } from "../content";

export default function Updates() {
  return (
    <section
      aria-label="Recent updates"
      className="relative z-10 bg-smoky-2 py-[70px] lg:py-[100px]"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <SectionHeading subtitle="Recent updates" title="Health news" />

        <ul className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {UPDATES.map((update) => (
            <li key={update.datetime}>
              <article className="group relative overflow-hidden">
                <div className="relative aspect-[350/450] overflow-hidden bg-eerie-4">
                  <img
                    src={homeAsset(update.image)}
                    alt={update.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <time
                    dateTime={update.datetime}
                    className="absolute left-[25px] top-[30px] bg-black px-2.5 py-[5px] text-label-2 font-bold leading-[14px] tracking-[0.15em] text-gold"
                  >
                    {update.date}
                  </time>
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-[35px] pb-[25px] text-center">
                  <p className="mb-[5px] text-label-2 font-bold uppercase tracking-[0.4em] text-gold">
                    {update.category}
                  </p>
                  <h3 className="font-display text-title-2 leading-[1.2] text-white">
                    {update.title}
                  </h3>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Button
            href="https://www.today.com/food"
            target="_blank"
            rel="noreferrer"
            aria-label="View blog: health news"
          >
            View blog
          </Button>
        </div>
      </div>
    </section>
  );
}
