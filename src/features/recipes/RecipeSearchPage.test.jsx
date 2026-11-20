import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import RecipeSearchPage from "./RecipeSearchPage";
import { getMealById, searchMealsByIngredient } from "../../lib/api/themealdb";

vi.mock("../../lib/api/themealdb", () => ({
  searchMealsByIngredient: vi.fn(),
  getMealById: vi.fn(),
}));

const MEAL_CARD = {
  idMeal: "52772",
  strMeal: "Teriyaki Chicken Casserole",
  strMealThumb: "https://example.test/meal.jpg",
};

const FULL_MEAL = {
  ...MEAL_CARD,
  strCategory: "Chicken",
  strArea: "Japanese",
  strInstructions: "Cook the rice, then bake everything together.",
  strYoutube: "https://example.test/video",
  strIngredient1: "Soy sauce",
  strMeasure1: "3/4 cup",
  strIngredient2: "Chicken",
  strMeasure2: "1 kg",
};

function renderPage() {
  return render(
    <MemoryRouter>
      <RecipeSearchPage />
    </MemoryRouter>
  );
}

describe("RecipeSearchPage", () => {
  it("shows an idle prompt before searching", () => {
    renderPage();
    expect(screen.getByText(/search for an ingredient/i)).toBeInTheDocument();
  });

  it("lists results and opens an accessible recipe dialog", async () => {
    searchMealsByIngredient.mockResolvedValue([MEAL_CARD]);
    getMealById.mockResolvedValue(FULL_MEAL);
    const user = userEvent.setup();

    renderPage();
    await user.type(screen.getByLabelText(/ingredient/i), "chicken");
    await user.click(screen.getByRole("button", { name: /^search$/i }));

    expect(
      await screen.findByRole("heading", { name: MEAL_CARD.strMeal })
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /get recipe/i }));

    const dialog = await screen.findByRole("dialog", { name: /recipe details/i });
    expect(dialog).toBeInTheDocument();
    expect(await screen.findByText("Soy sauce")).toBeInTheDocument();
    expect(screen.getByText(/bake everything together/i)).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows an empty state when no meals match", async () => {
    searchMealsByIngredient.mockResolvedValue([]);
    const user = userEvent.setup();

    renderPage();
    await user.type(screen.getByLabelText(/ingredient/i), "dragonfruit");
    await user.click(screen.getByRole("button", { name: /^search$/i }));

    expect(await screen.findByText(/no meals found/i)).toBeInTheDocument();
  });

  it("shows the API error message when the search fails", async () => {
    searchMealsByIngredient.mockRejectedValue(new Error("Recipe service is unavailable."));
    const user = userEvent.setup();

    renderPage();
    await user.type(screen.getByLabelText(/ingredient/i), "rice");
    await user.click(screen.getByRole("button", { name: /^search$/i }));

    expect(await screen.findByText("Recipe service is unavailable.")).toBeInTheDocument();
  });

  it("validates an empty search locally", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: /^search$/i }));

    expect(await screen.findByText(/enter an ingredient/i)).toBeInTheDocument();
    expect(searchMealsByIngredient).not.toHaveBeenCalled();
  });
});
