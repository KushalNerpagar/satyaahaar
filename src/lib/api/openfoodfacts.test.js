import { describe, expect, it, vi } from "vitest";
import { ApiError, getProduct } from "./openfoodfacts";

function jsonResponse(body, ok = true) {
  return { ok, json: async () => body };
}

const PRODUCT = { _id: "8901030895601", product_name: "Test biscuits" };

describe("getProduct", () => {
  it("rejects malformed barcodes without calling the API", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(getProduct("abc")).rejects.toMatchObject({ code: "invalid" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns the product for a known barcode", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ status: 1, product: PRODUCT }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(getProduct("8901030895601")).resolves.toEqual(PRODUCT);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://world.openfoodfacts.org/api/v2/product/8901030895601.json",
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );
  });

  it("throws not-found when Open Food Facts has no product", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ status: 0 })));

    await expect(getProduct("8901030895601")).rejects.toMatchObject({ code: "not-found" });
  });

  it("throws network when the response is not ok", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({}, false)));

    await expect(getProduct("8901030895601")).rejects.toMatchObject({ code: "network" });
  });

  it("wraps connection failures in an ApiError", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("offline")));

    await expect(getProduct("8901030895601")).rejects.toBeInstanceOf(ApiError);
    await expect(getProduct("8901030895601")).rejects.toMatchObject({ code: "network" });
  });

  it("honours an already-aborted signal", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const controller = new AbortController();
    controller.abort();

    await expect(
      getProduct("8901030895601", { signal: controller.signal })
    ).rejects.toMatchObject({ code: "aborted" });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
