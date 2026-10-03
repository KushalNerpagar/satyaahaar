import { useState } from "react";
import { Link } from "react-router-dom";
import "./recipes.css";

const MEAL_API = "https://www.themealdb.com/api/json/v1/1";

export default function RecipeSearchPage() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchMeals(event) {
    event.preventDefault();
    const ingredient = query.trim();
    if (!ingredient) {
      setError("Enter an ingredient to search.");
      setMeals([]);
      return;
    }

    setIsLoading(true);
    setError("");
    setSelectedMeal(null);
    try {
      const response = await fetch(`${MEAL_API}/filter.php?i=${encodeURIComponent(ingredient)}`);
      if (!response.ok) throw new Error("Recipe service is unavailable");
      const data = await response.json();
      setMeals(data.meals || []);
      if (!data.meals) setError("No meals found for that ingredient.");
    } catch (requestError) {
      console.error(requestError);
      setError("Could not load recipes. Please try again.");
      setMeals([]);
    } finally {
      setIsLoading(false);
    }
  }

  async function openRecipe(id) {
    try {
      const response = await fetch(`${MEAL_API}/lookup.php?i=${id}`);
      if (!response.ok) throw new Error("Recipe details are unavailable");
      const data = await response.json();
      setSelectedMeal(data.meals?.[0] || null);
    } catch (requestError) {
      console.error(requestError);
      setError("Could not load that recipe.");
    }
  }

  return (
    <main className="recipes-page">
      <div className="page-toolbar">
        <Link to="/">← Back to SatyaAhaar</Link>
      </div>

      <section className="recipes-shell" aria-labelledby="recipes-title">
        <div className="recipes-hero">
          <p className="eyebrow">Recipe finder</p>
          <h1 id="recipes-title">Find meals for your ingredients</h1>
          <p>Search the recipe collection by one ingredient and discover your next meal.</p>
          <blockquote>
            “Real food doesn’t have ingredients, real food is ingredients.”
            <cite>— Jamie Oliver</cite>
          </blockquote>
        </div>

        <form className="recipe-search-form" onSubmit={searchMeals}>
          <label htmlFor="ingredient">Ingredient</label>
          <div>
            <input
              id="ingredient"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try chicken, potato, rice…"
            />
            <button type="submit">{isLoading ? "Searching…" : "Search"}</button>
          </div>
        </form>

        <section className="recipe-results" aria-live="polite">
          <h2>Your search results</h2>
          {error && <p className="recipe-message">{error}</p>}
          {!error && !isLoading && meals.length === 0 && (
            <p className="recipe-message">Search for an ingredient to see matching meals.</p>
          )}
          <div className="meal-grid">
            {meals.map((meal) => (
              <article className="meal-card" key={meal.idMeal}>
                <img src={meal.strMealThumb} alt={meal.strMeal} />
                <div>
                  <h3>{meal.strMeal}</h3>
                  <button type="button" onClick={() => openRecipe(meal.idMeal)}>Get recipe</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>

      {selectedMeal && (
        <div className="recipe-modal-backdrop" role="presentation" onClick={() => setSelectedMeal(null)}>
          <article className="recipe-modal" role="dialog" aria-modal="true" aria-labelledby="recipe-title" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => setSelectedMeal(null)} aria-label="Close recipe">×</button>
            <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} />
            <p className="eyebrow">{selectedMeal.strCategory}</p>
            <h2 id="recipe-title">{selectedMeal.strMeal}</h2>
            <h3>Instructions</h3>
            <p className="instructions">{selectedMeal.strInstructions}</p>
            {selectedMeal.strYoutube && (
              <a href={selectedMeal.strYoutube} target="_blank" rel="noreferrer">Watch video instructions ↗</a>
            )}
          </article>
        </div>
      )}
    </main>
  );
}
