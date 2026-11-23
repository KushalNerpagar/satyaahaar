const BASE_CLASSES =
  "group relative z-10 inline-flex items-center justify-center overflow-hidden border-2 " +
  "px-[45px] py-3 text-label-2 font-bold uppercase tracking-[3px] transition-colors " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

const VARIANTS = {
  primary: "border-gold text-gold before:bg-gold",
  secondary: "border-gold bg-gold text-black before:bg-smoky-1",
};

const LABEL_COLORS = {
  primary: "text-smoky-1",
  secondary: "text-white",
};

export default function Button({
  as: Tag = "a",
  variant = "primary",
  full = false,
  className = "",
  children,
  ...props
}) {
  return (
    <Tag
      className={`${BASE_CLASSES} ${VARIANTS[variant]} ${full ? "w-full max-w-none" : "max-w-max"} ${className}`}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-full left-1/2 -z-10 h-[200%] w-[200%] -translate-x-1/2 rounded-full transition-all duration-500 group-hover:bottom-[-50%] group-focus-visible:bottom-[-50%]"
      />
      <span className="relative block transition-transform duration-300 group-hover:-translate-y-10 group-focus-visible:-translate-y-10">
        {children}
      </span>
      <span
        aria-hidden="true"
        className={`invisible absolute left-1/2 top-full min-w-max -translate-x-1/2 transition-all duration-300 group-hover:visible group-hover:top-1/2 group-hover:-translate-y-1/2 group-focus-visible:visible group-focus-visible:top-1/2 group-focus-visible:-translate-y-1/2 ${LABEL_COLORS[variant]}`}
      >
        {children}
      </span>
    </Tag>
  );
}
