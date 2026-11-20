import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import ProductPage from "./ProductPage";
import { getProduct } from "../../lib/api/openfoodfacts";

vi.mock("../../lib/api/openfoodfacts", () => ({
  getProduct: vi.fn(),
}));

const PRODUCT = {
  _id: "8901030895601",
  product_name: "Test biscuits",
  brands: "Satya Foods",
  nutriscore_grade: "b",
  ecoscore_grade: "a",
  nutriments: {
    energy_kcal_100g: 500,
    fat_100g: 25,
    proteins_100g: 7.5,
  },
  categories_hierarchy: ["en:snacks", "en:sweet-snacks"],
  ingredients_hierarchy: ["en:wheat-flour"],
};

function renderPage(barcode = "8901030895601") {
  return render(
    <MemoryRouter initialEntries={[`/product/${barcode}`]}>
      <Routes>
        <Route path="/product/:barcode" element={<ProductPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("ProductPage", () => {
  it("refetches the product on a deep link instead of relying on router state", async () => {
    getProduct.mockResolvedValue(PRODUCT);

    renderPage();

    expect(await screen.findByRole("heading", { name: "Test biscuits" })).toBeInTheDocument();
    expect(getProduct).toHaveBeenCalledWith("8901030895601", expect.any(Object));
    expect(screen.getByText("500 kcal")).toBeInTheDocument();
    expect(screen.getByText("Satya Foods")).toBeInTheDocument();
    expect(screen.getByText("snacks")).toBeInTheDocument();
    expect(screen.getByText("sweet snacks")).toBeInTheDocument();
  });

  it("renders a recoverable error state", async () => {
    getProduct.mockRejectedValue(new Error("No product was found for that barcode."));

    renderPage("12345678");

    expect(
      await screen.findByRole("heading", { name: /product details are unavailable/i })
    ).toBeInTheDocument();
    expect(screen.getByText("No product was found for that barcode.")).toBeInTheDocument();
  });
});
