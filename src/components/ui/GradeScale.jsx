const GRADES = [
  { grade: "A", label: "Excellent", chip: "bg-emerald-500 text-black" },
  { grade: "B", label: "Good", chip: "bg-lime-500 text-black" },
  { grade: "C", label: "Fair", chip: "bg-yellow-400 text-black" },
  { grade: "D", label: "Poor", chip: "bg-orange-500 text-black" },
  { grade: "E", label: "Bad", chip: "bg-red-500 text-white" },
];

const NEGATIVE_POINTS = ["Energy", "Sugars", "Saturated fat", "Salt"];
const POSITIVE_POINTS = ["Protein", "Fibre", "Fruit, veg & nuts"];

const DEFAULT_DESCRIPTION =
  "A is the best and E the worst nutritional quality. The score is calculated per 100 g " +
  "from energy, sugars, saturated fat and salt, balanced by protein, fibre and " +
  "fruit/vegetable content.";

const DEFAULT_SCOPE =
  "Nutri-Score grades packaged foods and drinks sold in shops. It is not a medical " +
  "diagnosis, and it only makes sense to compare products within the same category — " +
  "a drink with a drink, a snack with a snack, not oil with a soft drink.";

/**
 * Explains the A–E Nutri-Score/Eco-Score scale, optionally highlighting one grade.
 */
export default function GradeScale({
  activeGrade,
  title = "Nutri-Score A–E",
  description = DEFAULT_DESCRIPTION,
  scope = DEFAULT_SCOPE,
  className = "",
  children,
}) {
  const active = String(activeGrade ?? "")
    .trim()
    .toLowerCase();

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-label-2 font-bold uppercase tracking-[0.2em] text-gold">{title}</h3>
        {active && (
          <p className="text-label-2 uppercase tracking-[0.15em] text-quick-silver">
            This product: <span className="text-white">{active.toUpperCase()}</span>
          </p>
        )}
      </div>

      <ol
        aria-label={`${title}: grades from A, the best, to E, the worst`}
        className="mt-3 grid grid-cols-5 gap-1.5 sm:gap-2"
      >
        {GRADES.map((item) => {
          const isActive = active === item.grade.toLowerCase();

          return (
            <li
              key={item.grade}
              className={`rounded-lg border p-2 text-center sm:p-3 ${
                isActive ? "border-gold bg-white/10" : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <span
                className={`mx-auto grid h-9 w-9 place-items-center rounded-full font-display text-lg leading-none ${item.chip}`}
              >
                {item.grade}
              </span>
              <span className="mt-2 block text-[0.65rem] font-bold uppercase tracking-[0.12em] text-quick-silver">
                {item.label}
              </span>
            </li>
          );
        })}
      </ol>

      <p className="mt-3 text-label-1 leading-[1.6] text-quick-silver">{description}</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <CriteriaList
          title="Counts against the score"
          items={NEGATIVE_POINTS}
          marker="−"
          markerClass="text-orange-400"
        />
        <CriteriaList
          title="Counts in favour"
          items={POSITIVE_POINTS}
          marker="+"
          markerClass="text-emerald-400"
        />
      </div>

      {scope && <p className="mt-4 text-label-1 leading-[1.6] text-quick-silver/80">{scope}</p>}
      {children}
    </div>
  );
}

function CriteriaList({ title, items, marker, markerClass }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/80">{title}</p>
      <ul className="mt-2 space-y-1">
        {items.map((item) => (
          <li key={item} className="flex items-baseline gap-2 text-label-1 text-quick-silver">
            <span aria-hidden="true" className={`font-bold ${markerClass}`}>
              {marker}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
