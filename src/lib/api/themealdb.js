const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

const DEFAULT_TIMEOUT_MS = 12_000;

export class ApiError extends Error {
  constructor(message, code = "network", options) {
    super(message, options);
    this.name = "ApiError";
    this.code = code;
  }
}

async function requestJson(url, { signal, timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  if (signal?.aborted) throw new ApiError("Request cancelled.", "aborted");

  const controller = new AbortController();
  const abort = () => controller.abort();
  const timer = setTimeout(abort, timeoutMs);
  signal?.addEventListener("abort", abort, { once: true });

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new ApiError("Recipe service is unavailable. Please try again.", "network");
    }
    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error?.name === "AbortError") {
      const code = signal?.aborted ? "aborted" : "timeout";
      throw new ApiError(
        code === "timeout" ? "The request took too long. Please try again." : "Request cancelled.",
        code,
        { cause: error }
      );
    }
    throw new ApiError("Could not reach the recipe service. Check your connection.", "network", {
      cause: error,
    });
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", abort);
  }
}

/**
 * Finds meals that use the given ingredient.
 * @param {string} ingredient
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<Array<{ idMeal: string, strMeal: string, strMealThumb: string }>>}
 */
export async function searchMealsByIngredient(ingredient, options) {
  const normalized = String(ingredient ?? "").trim();
  if (!normalized) throw new ApiError("Enter an ingredient to search.", "invalid");

  const data = await requestJson(
    `${BASE_URL}/filter.php?i=${encodeURIComponent(normalized)}`,
    options
  );

  return data.meals ?? [];
}

/**
 * Fetches the full recipe for a meal id.
 * @param {string} id
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<object>}
 */
export async function getMealById(id, options) {
  if (!id) throw new ApiError("A recipe id is required.", "invalid");

  const data = await requestJson(`${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`, options);
  const meal = data.meals?.[0];

  if (!meal) throw new ApiError("That recipe could not be found.", "not-found");

  return meal;
}
