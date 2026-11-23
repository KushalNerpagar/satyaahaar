import { homeAsset } from "../../lib/assets";

export default function SectionHeading({ subtitle, title, className = "text-center", titleClassName = "" }) {
  return (
    <div className={className}>
      <p className="mb-3 text-label-2 font-bold uppercase tracking-[0.4em] text-gold">
        {subtitle}
      </p>
      <img
        src={homeAsset("images/separator.svg")}
        alt=""
        aria-hidden="true"
        width="97"
        height="13"
        className="mx-auto mt-[5px] mb-4 h-auto w-[100px]"
      />
      <h2 className={`font-display text-headline-1 leading-[1.2] text-white ${titleClassName}`}>
        {title}
      </h2>
    </div>
  );
}
