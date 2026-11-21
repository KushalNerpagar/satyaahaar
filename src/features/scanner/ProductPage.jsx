import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import SkipLink from "../../components/ui/SkipLink";
import ScoreBadge from "./components/ScoreBadge";
import { getProduct } from "../../lib/api/openfoodfacts";
import { formatTagList, nutrientValue } from "../../lib/formatters";

function formatAmount(value) {
  if (value == null) return null;
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function TagList({ title, tags }) {
  if (!tags?.length) return null;

  return (
    <section className="mt-8">
      <h2 className="mb-3 text-label-2 font-bold uppercase tracking-[0.2em] text-gold">{title}</h2>
      <ul className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-label-1 text-quick-silver"
          >
            {formatTagList([tag])}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ProductPage() {
  const { barcode } = useParams();
  const { state } = useLocation();
  const initialProduct = state?.productData ?? null;

  const [product, setProduct] = useState(initialProduct);
  const [status, setStatus] = useState(initialProduct ? "ready" : "loading");
  const [error, setError] = useState("");
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    if (product) return undefined;

    const controller = new AbortController();

    getProduct(barcode, { signal: controller.signal })
      .then((data) => {
        setProduct(data);
        setStatus("ready");
      })
      .catch((requestError) => {
        if (requestError.code === "aborted") return;
        setError(requestError.message);
        setStatus("error");
      });

    return () => controller.abort();
  }, [barcode, product]);

  const image = product && (product.image_front_url || product.image_url);
  const nutrients = product
    ? [
        { label: "Energy", key: "energy_kcal_100g", unit: "kcal" },
        { label: "Fat", key: "fat_100g", unit: "g" },
        { label: "Saturated fat", key: "saturated-fat_100g", unit: "g" },
        { label: "Carbohydrates", key: "carbohydrates_100g", unit: "g" },
        { label: "Sugars", key: "sugars_100g", unit: "g" },
        { label: "Fiber", key: "fiber_100g", unit: "g" },
        { label: "Proteins", key: "proteins_100g", unit: "g" },
        { label: "Salt", key: "salt_100g", unit: "g" },
      ]
        .map((item) => ({
          ...item,
          value: formatAmount(nutrientValue(product.nutriments, item.key)),
        }))
        .filter((item) => item.value != null)
    : [];

  return (
    <div className="min-h-screen bg-eerie-1 font-sans text-body-2 leading-[1.85] text-white">
      <SkipLink />
      <PageHeader />

      <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-[1100px] px-4 py-10 outline-none">
        <Link
          to="/scanner"
          className="inline-flex items-center gap-2 text-label-2 font-bold uppercase tracking-[0.2em] text-gold transition-colors hover:text-white"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to scanner
        </Link>

        {status === "loading" && (
          <div className="mt-16 flex flex-col items-center gap-4 text-quick-silver">
            <Loader2 size={32} className="animate-spin text-gold" aria-hidden="true" />
            <p>Loading product {barcode}…</p>
          </div>
        )}

        {status === "error" && (
          <section className="mt-10 rounded-card border border-white/10 bg-smoky-1 p-8">
            <h1 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.15]">
              Product details are unavailable
            </h1>
            <p className="mt-3 text-quick-silver">{error}</p>
            <Link
              to="/scanner"
              className="mt-6 inline-flex h-12 items-center border-2 border-gold px-6 text-label-2 font-bold uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-black"
            >
              Try another barcode
            </Link>
          </section>
        )}

        {status === "ready" && product && (
          <article className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:items-start">
            <div className="rounded-card border border-white/10 bg-white/5 p-4">
              {image && !imageFailed ? (
                <img
                  src={image}
                  alt={product.product_name || "Food product"}
                  onError={() => setImageFailed(true)}
                  className="mx-auto max-h-[460px] w-full object-contain"
                />
              ) : (
                <div className="grid h-[320px] place-items-center text-quick-silver">
                  No product image
                </div>
              )}
            </div>

            <div>
              <p className="text-label-2 uppercase tracking-[0.3em] text-gold">
                Barcode {product._id || barcode}
              </p>
              <h1 className="mt-2 font-display text-[clamp(1.9rem,4vw,2.8rem)] leading-[1.1]">
                {product.product_name || product.generic_name || "Unnamed product"}
              </h1>
              {product.brands && <p className="mt-2 text-quick-silver">{product.brands}</p>}

              <div className="mt-5 flex flex-wrap gap-6">
                <ScoreBadge label="Nutri-Score" grade={product.nutriscore_grade} />
                <ScoreBadge label="Eco-Score" grade={product.ecoscore_grade} />
              </div>

              {nutrients.length > 0 && (
                <section className="mt-8">
                  <h2 className="mb-2 text-label-2 font-bold uppercase tracking-[0.2em] text-gold">
                    Nutrition per 100 g
                  </h2>
                  <dl className="grid gap-x-8 sm:grid-cols-2">
                    {nutrients.map((item) => (
                      <div
                        key={item.key}
                        className="flex items-baseline justify-between gap-4 border-b border-white/10 py-2"
                      >
                        <dt className="text-quick-silver">{item.label}</dt>
                        <dd className="font-bold text-white">
                          {item.value} {item.unit}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              <TagList title="Categories" tags={product.categories_hierarchy} />
              <TagList title="Ingredients" tags={product.ingredients_hierarchy} />
            </div>
          </article>
        )}
      </main>
    </div>
  );
}
