const BASE_URL = "https://world.openfoodfacts.org/api/v2/product";

const DEFAULT_TIMEOUT_MS = 12_000;

/**
 * Error raised by the API layer. `code` is a stable, UI-friendly identifier:
 * "network" | "timeout" | "not-found" | "aborted" | "invalid".
 */
export class ApiError extends Error {
  constructor(message, code = "network", options) {
    super(message, options);
    this.name = "ApiError";
    this.code = code;
  }
}

/**
 * Runs a fetch with a timeout and optional caller-provided abort signal.
 * Always throws an ApiError, never a raw DOMException.
 */
async function requestJson(url, { signal, timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  if (signal?.aborted) throw new ApiError("Request cancelled.", "aborted");

  const controller = new AbortController();
  const abort = () => controller.abort();
  const timer = setTimeout(abort, timeoutMs);
  signal?.addEventListener("abort", abort, { once: true });

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new ApiError("Product service is unavailable. Please try again.", "network");
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
    throw new ApiError("Could not reach the product service. Check your connection.", "network", {
      cause: error,
    });
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", abort);
  }
}

/**
 * Looks up a product on Open Food Facts by barcode.
 * @param {string} barcode
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<object>} the product object
 */
export async function getProduct(barcode, options) {
  const normalized = String(barcode ?? "").trim();
  if (!/^\d{8,14}$/.test(normalized)) {
    throw new ApiError("Enter a valid 8–14 digit barcode.", "invalid");
  }

  const data = await requestJson(`${BASE_URL}/${normalized}.json`, options);

  if (data.status !== 1 || !data.product) {
    throw new ApiError("No product was found for that barcode.", "not-found");
  }

  return data.product;
}
