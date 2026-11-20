const GRADES = {
  a: "bg-emerald-500 text-black",
  b: "bg-lime-500 text-black",
  c: "bg-yellow-400 text-black",
  d: "bg-orange-500 text-black",
  e: "bg-red-500 text-white",
};

export default function ScoreBadge({ label, grade }) {
  const key = String(grade ?? "").trim().toLowerCase();

  return (
    <div className="flex items-center gap-2">
      <span
        className={`grid h-9 w-9 place-items-center rounded-full font-display text-lg leading-none ${
          GRADES[key] ?? "bg-white/15 text-white"
        }`}
      >
        {key ? key.toUpperCase() : "?"}
      </span>
      <span className="text-label-2 uppercase tracking-[0.2em] text-quick-silver">{label}</span>
    </div>
  );
}
