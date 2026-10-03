import { Link, useLocation, useParams } from "react-router-dom";
import "./scanner.css";

function readableList(values = []) {
  return values
    .map((value) => value.replace(/^\w+:/, "").replace(/-/g, " "))
    .join(", ");
}

export default function ProductPage() {
  const { barcode } = useParams();
  const { state } = useLocation();
  const product = state?.productData;

  if (!product) {
    return (
      <main className="scanner-page">
        <div className="page-toolbar"><Link to="/scanner">← Back to scanner</Link></div>
        <section className="product-card empty-product">
          <h1>Product details are unavailable</h1>
          <p>Search for this barcode again to load the product information.</p>
          <Link className="primary-link" to="/scanner">Open scanner</Link>
        </section>
      </main>
    );
  }

  const categories = product.categories_hierarchy || [];
  const ingredients = product.ingredients_hierarchy || [];
  const nutrition = product.nutriments || {};
  const image = product.image_front_url || product.image_url;

  return (
    <main className="scanner-page">
      <div className="page-toolbar">
        <Link to="/scanner">← Back to scanner</Link>
      </div>

      <section className="product-card" aria-labelledby="product-title">
        <div className="product-image-wrap">
          {image ? <img src={image} alt={product.product_name || "Food product"} /> : <span>No image</span>}
        </div>
        <div className="product-copy">
          <p className="eyebrow">Barcode {product._id || barcode}</p>
          <h1 id="product-title">{product.product_name || product.generic_name || "Unnamed product"}</h1>
          {product.brands && <p className="product-brand">{product.brands}</p>}

          <dl className="product-facts">
            {categories.length > 0 && <><dt>Categories</dt><dd>{readableList(categories)}</dd></>}
            {ingredients.length > 0 && <><dt>Ingredients</dt><dd>{readableList(ingredients)}</dd></>}
            {product.ecoscore_grade && <><dt>Ecoscore</dt><dd>{product.ecoscore_grade.toUpperCase()}</dd></>}
            {product.nutriscore_grade && <><dt>Nutriscore</dt><dd>{product.nutriscore_grade.toUpperCase()}</dd></>}
            {nutrition.energy_kcal_100g != null && <><dt>Energy</dt><dd>{nutrition.energy_kcal_100g} kcal per 100g</dd></>}
          </dl>
        </div>
      </section>
    </main>
  );
}
