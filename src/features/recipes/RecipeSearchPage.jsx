import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, Search, X } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import { getMealById, searchMealsByIngredient } from "../../lib/api/themealdb";

function MealImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`grid place-items-center bg-eerie-2 text-label-2 text-quick-silver ${className}`}>
        No image
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}

function RecipeModal({ meal, status, error, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll(
        'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const ingredients = meal
    ? Array.from({ length: 20 }, (_, index) => {
        const name = meal[`strIngredient${index + 1}`]?.trim();
        const measure = meal[`strMeasure${index + 1}`]?.trim();
        return name ? { name, measure } : null;
      }).filter(Boolean)
    : [];

  return (
    <div
      role="presentation"
      onClick={onClose}
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/80 p-4"
    >
      <article
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Recipe details"
        onClick={(event) => event.stopPropagation()}
        className="relative my-8 w-full max-w-[820px] rounded-card border border-white/10 bg-smoky-1 p-6 sm:p-10"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close recipe"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:text-gold"
        >
          <X size={18} />
        </button>

        {status === "loading" && (
          <div className="grid h-[300px] place-items-center">
            <Loader2 size={32} className="animate-spin text-gold" aria-label="Loading recipe" />
          </div>
        )}

        {status === "error" && (
          <div className="grid h-[300px] place-items-center text-center">
            <p className="text-quick-silver">{error}</p>
          </div>
        )}

        {status === "ready" && meal && (
          <div className="grid gap-8 md:grid-cols-[240px_1fr]">
            <MealImage
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="h-[220px] w-full rounded-xl md:h-[240px]"
            />

            <div>
              <p className="text-label-2 font-bold uppercase tracking-[0.35em] text-gold">
                {meal.strCategory}
                {meal.strArea ? ` · ${meal.strArea}` : ""}
              </p>
              <h2 id="recipe-title" className="mt-2 font-display text-[1.9rem] leading-[1.15]">
                {meal.strMeal}
              </h2>

              {ingredients.length > 0 && (
                <section className="mt-6">
                  <h3 className="text-label-2 font-bold uppercase tracking-[0.2em] text-gold">
                    Ingredients
                  </h3>
                  <ul className="mt-2 grid gap-x-6 sm:grid-cols-2">
                    {ingredients.map((ingredient) => (
                      <li
                        key={ingredient.name}
                        className="flex justify-between gap-3 border-b border-white/10 py-1.5 text-label-1"
                      >
                        <span className="text-quick-silver">{ingredient.name}</span>
                        <span className="shrink-0 text-white">{ingredient.measure}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section className="mt-6">
                <h3 className="text-label-2 font-bold uppercase tracking-[0.2em] text-gold">
                  Instructions
                </h3>
                <p className="mt-2 whitespace-pre-line text-quick-silver">{meal.strInstructions}</p>
              </section>

              {meal.strYoutube && (
                <a
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex h-12 items-center border-2 border-gold px-6 text-label-2 font-bold uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-black"
                >
                  Watch video instructions ↗
                </a>
              )}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

function SkeletonCard() {
  return (
    <li className="overflow-hidden rounded-card border border-white/10 bg-smoky-1">
      <div className="aspect-[4/3] animate-pulse bg-white/10" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 animate-pulse bg-white/10" />
        <div className="h-8 w-28 animate-pulse bg-white/10" />
      </div>
    </li>
  );
}

export default function RecipeSearchPage() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const [activeId, setActiveId] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [modalStatus, setModalStatus] = useState("idle");
  const [modalError, setModalError] = useState("");

  const searchController = useRef(null);

  useEffect(() => () => searchController.current?.abort(), []);

  async function handleSearch(event) {
    event.preventDefault();
    const ingredient = query.trim();
    if (!ingredient) {
      setStatus("error");
      setError("Enter an ingredient to search.");
      setMeals([]);
      return;
    }

    searchController.current?.abort();
    const controller = new AbortController();
    searchController.current = controller;

    setStatus("loading");
    setError("");

    try {
      const results = await searchMealsByIngredient(ingredient, { signal: controller.signal });
      setMeals(results);
      setStatus(results.length > 0 ? "ready" : "empty");
    } catch (requestError) {
      if (requestError.code === "aborted") return;
      setError(requestError.message);
      setMeals([]);
      setStatus("error");
    }
  }

  async function openRecipe(id) {
    setActiveId(id);
    setSelectedMeal(null);
    setModalStatus("loading");
    setModalError("");

    try {
      setSelectedMeal(await getMealById(id));
      setModalStatus("ready");
    } catch (requestError) {
      setModalError(requestError.message);
      setModalStatus("error");
    }
  }

  const handleClose = useCallback(() => {
    setActiveId(null);
    setSelectedMeal(null);
    setModalStatus("idle");
  }, []);

  return (
    <div className="min-h-screen bg-eerie-1 font-sans text-body-2 leading-[1.85] text-white">
      <PageHeader />

      <main className="mx-auto w-full max-w-[1100px] px-4 py-12">
        <p className="mb-3 text-label-2 font-bold uppercase tracking-[0.4em] text-gold">
          Recipe finder
        </p>
        <h1 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.1]">
          Find meals for your ingredients
        </h1>
        <p className="mt-4 max-w-[620px] text-quick-silver">
          Search a recipe collection by one ingredient and discover your next meal.
        </p>
        <blockquote className="mt-6 max-w-[620px] border-l-2 border-gold pl-4 text-quick-silver italic">
          &ldquo;Real food doesn&apos;t have ingredients, real food is ingredients.&rdquo;
          <cite className="mt-1 block text-label-2 uppercase not-italic tracking-[0.2em] text-gold">
            — Jamie Oliver
          </cite>
        </blockquote>

        <form
          onSubmit={handleSearch}
          className="mt-8 rounded-card border border-white/10 bg-smoky-1 p-6 sm:p-8"
        >
          <label
            htmlFor="ingredient"
            className="mb-2 block text-label-2 font-bold uppercase tracking-[0.2em] text-quick-silver"
          >
            Ingredient
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="ingredient"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try chicken, potato, rice…"
              className="h-14 w-full border border-white/10 bg-eerie-2 px-5 text-lg text-white outline-none transition-colors placeholder:text-quick-silver focus:border-gold"
            />
            <button
              type="submit"
              className="inline-flex h-14 shrink-0 items-center justify-center gap-2 bg-gold px-8 text-label-2 font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-white"
            >
              <Search size={16} aria-hidden="true" />
              Search
            </button>
          </div>
        </form>

        <section aria-live="polite" className="mt-10">
          <h2 className="font-display text-[1.75rem] leading-[1.2]">Your search results</h2>

          {status === "idle" && (
            <p className="mt-3 text-quick-silver">
              Search for an ingredient to see matching meals.
            </p>
          )}

          {status === "loading" && (
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </ul>
          )}

          {(status === "error" || status === "empty") && (
            <p className="mt-3 text-quick-silver">{error || "No meals found for that ingredient."}</p>
          )}

          {status === "ready" && (
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {meals.map((meal) => (
                <li
                  key={meal.idMeal}
                  className="group overflow-hidden rounded-card border border-white/10 bg-smoky-1"
                >
                  <MealImage
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="p-4">
                    <h3 className="font-display text-title-2 leading-[1.2]">{meal.strMeal}</h3>
                    <button
                      type="button"
                      onClick={() => openRecipe(meal.idMeal)}
                      className="mt-3 inline-flex h-11 items-center border-2 border-gold px-5 text-label-2 font-bold uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-black"
                    >
                      Get recipe
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      {activeId && (
        <RecipeModal
          meal={selectedMeal}
          status={modalStatus}
          error={modalError}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
