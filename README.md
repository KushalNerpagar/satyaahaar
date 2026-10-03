# SatyaAhaar

SatyaAhaar is a food-literacy web application that brings the original project features into one maintainable React application:

- A food-literacy landing page.
- Barcode lookup and camera scanning with Open Food Facts data.
- Product nutrition and ingredient details.
- Ingredient-based recipe search using TheMealDB.

## Run locally

```bash
npm install
npm start
```

The app uses hash routing so it works on GitHub Pages without server-side rewrite configuration.

## Build and deploy

```bash
npm run build
npm run deploy
```

The deployment target is configured as `https://kushalnerpagar.github.io/satyaahaar`.

## Data sources

- Product information: [Open Food Facts](https://world.openfoodfacts.org/)
- Meal and recipe information: [TheMealDB](https://www.themealdb.com/)

This repository consolidates the earlier `home`, `Recipe`, and `Meal_search` projects into a single codebase.
