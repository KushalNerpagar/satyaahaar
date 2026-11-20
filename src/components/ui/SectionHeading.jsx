import { homeAsset } from "../../lib/assets";

export default function SectionHeading({ subtitle, title, align = "center", titleClassName = "" }) {
  const centered = align === "center";

  return (
    <div className={centered ? "text-center" : "text-left"}>
      <p className="mb-3 text-label-2 font-bold uppercase tracking-[0.4em] text-gold">
        {subtitle}
      </p>
      <img
        src={homeAsset("images/separator.svg")}
        alt=""
        aria-hidden="true"
        className={`mt-[5px] mb-4 h-auto w-[100px] ${centered ? "mx-auto" : "mx-0"}`}
      />
      <h2 className={`font-display text-headline-1 leading-[1.2] text-white ${titleClassName}`}>
        {title}
      </h2>
    </div>
  );
}
