import { expect, test } from "@playwright/test";

const VIEWPORTS = [
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1280, height: 900 },
  { width: 1440, height: 900 },
];

const PRODUCT = {
  _id: "8901030895601",
  product_name: "Test biscuits",
  brands: "Satya Foods",
  nutriscore_grade: "b",
  ecoscore_grade: "a",
  nutriments: { energy_kcal_100g: 500, fat_100g: 25, proteins_100g: 7.5 },
  categories_hierarchy: ["en:snacks"],
  ingredients_hierarchy: ["en:wheat-flour"],
};

const MEAL = {
  idMeal: "1",
  strMeal: "Test Curry",
  strMealThumb: "/satyaahaar/assets/home/images/service-1.jpg",
};

const FULL_MEAL = {
  ...MEAL,
  strCategory: "Vegetarian",
  strArea: "Indian",
  strInstructions: "Simmer everything until fragrant.",
  strIngredient1: "Tomato",
  strMeasure1: "2",
};

async function mockApis(page) {
  await page.route(/world\.openfoodfacts\.org/, (route) =>
    route.fulfill({ json: { status: 1, product: PRODUCT } })
  );

  await page.route(/themealdb\.com/, (route) => {
    const url = route.request().url();
    if (url.includes("filter.php")) {
      return route.fulfill({ json: { meals: [MEAL] } });
    }
    return route.fulfill({ json: { meals: [FULL_MEAL] } });
  });
}

function collectErrors(page) {
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

test.describe("landing page", () => {
  for (const viewport of VIEWPORTS) {
    test(`renders without horizontal overflow at ${viewport.width}px`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto("/");

      await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
      await expect(page.getByText("We offer features")).toBeVisible();

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(400);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      expect(overflow).toBeLessThanOrEqual(1);
    });
  }

  test("navigation reaches the scanner and recipe pages", async ({ page }) => {
    await mockApis(page);
    await page.goto("/");

    await page.getByRole("link", { name: "Scanner", exact: true }).first().click();
    await expect(page).toHaveURL(/#\/scanner$/);
    await expect(page.getByRole("heading", { name: "Scan a food product" })).toBeVisible();

    await page.getByRole("link", { name: "Recipes", exact: true }).first().click();
    await expect(page).toHaveURL(/#\/recipes$/);
    await expect(
      page.getByRole("heading", { name: "Find meals for your ingredients" })
    ).toBeVisible();
  });
});

test.describe("mobile navigation", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("drawer opens, closes, and routes", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("button", { name: "Close menu" }).first()).toBeVisible();

    await page.getByRole("button", { name: "Close menu" }).first().click();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();

    await page.getByRole("button", { name: "Open menu" }).click();
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Recipe", exact: true })
      .click();
    await expect(page).toHaveURL(/#\/recipes$/);
  });
});

test.describe("scanner and recipes", () => {
  test("deep-linked product details survive a reload", async ({ page }) => {
    await mockApis(page);

    await page.goto("/#/product/8901030895601");
    await expect(page.getByRole("heading", { name: "Test biscuits" })).toBeVisible();
    await expect(page.getByText("500 kcal")).toBeVisible();

    await page.reload();
    await expect(page.getByRole("heading", { name: "Test biscuits" })).toBeVisible();
  });

  test("search, open a recipe, and close the dialog", async ({ page }) => {
    await mockApis(page);
    await page.goto("/#/recipes");

    await page.getByLabel("Ingredient").fill("chicken");
    await page.getByRole("button", { name: "Search", exact: true }).click();

    await expect(page.getByRole("heading", { name: "Test Curry" })).toBeVisible();
    await page.getByRole("button", { name: "Get recipe" }).click();

    await expect(page.getByRole("dialog", { name: "Recipe details" })).toBeVisible();
    await expect(page.getByText("Tomato")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Recipe details" })).toBeHidden();
  });
});

test("no console errors on the core routes", async ({ page }) => {
  await mockApis(page);
  const errors = collectErrors(page);

  await page.goto("/");
  await page.getByRole("heading", { level: 1 }).first().waitFor();

  await page.goto("/#/scanner");
  await expect(page.getByRole("heading", { name: "Scan a food product" })).toBeVisible();

  await page.goto("/#/recipes");
  await expect(
    page.getByRole("heading", { name: "Find meals for your ingredients" })
  ).toBeVisible();

  await page.goto("/#/product/8901030895601");
  await expect(page.getByRole("heading", { name: "Test biscuits" })).toBeVisible();

  expect(errors).toEqual([]);
});
