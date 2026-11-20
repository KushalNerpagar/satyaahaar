import { homeAsset } from "../../../lib/assets";

export default function Testimonial() {
  return (
    <section
      aria-label="Testimonial"
      className="relative z-10 bg-cover bg-center px-4 py-[70px] pb-[340px] text-center lg:py-[100px] lg:pb-[340px]"
      style={{ backgroundImage: `url("${homeAsset("images/testimonial-bg.jpg")}")` }}
    >
      <span aria-hidden="true" className="absolute inset-0 bg-black/50" />

      <div className="relative mx-auto w-full max-w-[1200px]">
        <p aria-hidden="true" className="font-display text-[4.375rem] leading-[0.7] text-white">
          &rdquo;
        </p>

        <blockquote className="mx-auto max-w-[910px] font-display text-headline-2 leading-[1.4] text-white">
          &ldquo;Food is more than just a meal; it&apos;s love shared, hope given, and lives
          lifted. When we fill an empty plate, we fill hearts with warmth and kindness. Together,
          let&apos;s make sure no one goes hungry.&rdquo;
        </blockquote>

        <div aria-hidden="true" className="my-10 mb-[50px] flex justify-center gap-0.5">
          <span className="h-2 w-2 animate-rotate-slow border border-gold" />
          <span className="h-2 w-2 animate-rotate-slow border border-gold" />
          <span className="h-2 w-2 animate-rotate-slow border border-gold" />
        </div>

        <div>
          <img
            src={homeAsset("images/prof (Custom).jpeg")}
            alt="Dravas"
            loading="lazy"
            className="mx-auto mb-[15px] h-[100px] w-[100px] rounded-full object-cover"
          />
          <p className="text-label-2 font-bold uppercase tracking-[0.2em] text-gold">Dravas</p>
        </div>
      </div>
    </section>
  );
}
