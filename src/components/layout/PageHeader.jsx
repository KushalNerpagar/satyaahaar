import { Link, NavLink } from "react-router-dom";

const linkClasses = ({ isActive }) =>
  `text-xs font-bold uppercase tracking-[0.2em] transition-colors ${
    isActive ? "text-gold" : "text-quick-silver hover:text-white"
  }`;

export default function PageHeader() {
  return (
    <header className="border-b border-white/10 bg-smoky-1">
      <div className="mx-auto flex w-full max-w-[1100px] flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link
          to="/"
          className="font-display text-2xl leading-none text-white transition-colors hover:text-gold"
        >
          SatyaAhaar
        </Link>

        <nav aria-label="Sections" className="flex items-center gap-5">
          <NavLink to="/scanner" className={linkClasses}>
            Scanner
          </NavLink>
          <NavLink to="/recipes" className={linkClasses}>
            Recipes
          </NavLink>
          <Link
            to="/"
            className="text-xs font-bold uppercase tracking-[0.2em] text-quick-silver transition-colors hover:text-white"
          >
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}
