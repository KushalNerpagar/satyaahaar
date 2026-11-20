import { describe, expect, it, vi } from "vitest";
import { getMealById, searchMealsByIngredient } from "./themealdb";

function jsonResponse(body, ok = true) {
  return { ok, json: async () => body };
}

const MEAL = { idMeal: "52772", strMeal: "Teriyaki Chicken Casserole" };

describe("searchMealsByIngredient", () => {
  it("rejects an empty ingredient", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(searchMealsByIngredient("   ")).rejects.toMatchObject({ code: "invalid" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns matching meals", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ meals: [MEAL] })));

    await expect(searchMealsByIngredient("chicken")).resolves.toEqual([MEAL]);
  });

  it("returns an empty list when there are no matches", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ meals: null })));

    await expect(searchMealsByIngredient("dragonfruit")).resolves.toEqual([]);
  });

  it("maps HTTP failures to a network error", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({}, false)));

    await expect(searchMealsByIngredient("rice")).rejects.toMatchObject({ code: "network" });
  });
});

describe("getMealById", () => {
  it("requires an id", async () => {
    await expect(getMealById("")).rejects.toMatchObject({ code: "invalid" });
  });

  it("returns the first meal", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ meals: [MEAL] })));

    await expect(getMealById("52772")).resolves.toEqual(MEAL);
  });

  it("throws not-found for unknown ids", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ meals: null })));

    await expect(getMealById("00000")).rejects.toMatchObject({ code: "not-found" });
  });
});
