import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Html5QrcodePlugin from "./Html5QrcodePlugin";
import "./scanner.css";

const PRODUCT_API = "https://world.openfoodfacts.net/api/v2/product";

function showScanError(message) {
  toast.error(message, { position: "top-right", autoClose: 4500 });
}

export default function ScannerPage() {
  const [barcode, setBarcode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const lookupProduct = useCallback(
    async (value) => {
      const normalized = value.trim();
      if (!/^\d{8,14}$/.test(normalized)) {
        showScanError("Enter a valid 8–14 digit barcode.");
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`${PRODUCT_API}/${normalized}`);
        if (!response.ok) throw new Error("Product service is unavailable");
        const data = await response.json();

        if (data.status !== 1 || !data.product) {
          showScanError("No product was found for that barcode.");
          return;
        }

        navigate(`/product/${normalized}`, {
          state: { productData: data.product },
        });
      } catch (error) {
        console.error(error);
        showScanError("Could not load product information. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [navigate]
  );

  const handleScan = useCallback(
    (decodedText) => {
      lookupProduct(decodedText);
    },
    [lookupProduct]
  );

  return (
    <main className="scanner-page">
      <div className="page-toolbar">
        <Link to="/">← Back to SatyaAhaar</Link>
      </div>

      <section className="scanner-card" aria-labelledby="scanner-title">
        <p className="eyebrow">Nutrition explorer</p>
        <h1 id="scanner-title">Scan a food product</h1>
        <p className="scanner-intro">
          Enter a barcode or use your camera to view nutrition, ingredients,
          categories, and sustainability information.
        </p>

        <form
          className="barcode-form"
          onSubmit={(event) => {
            event.preventDefault();
            lookupProduct(barcode);
          }}
        >
          <label htmlFor="barcode">Product barcode</label>
          <div className="barcode-input-row">
            <input
              id="barcode"
              inputMode="numeric"
              autoComplete="off"
              placeholder="For example, 8901030895601"
              value={barcode}
              onChange={(event) => setBarcode(event.target.value.replace(/\D/g, ""))}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Loading…" : "Search"}
            </button>
          </div>
        </form>

        <div className="scanner-divider"><span>or scan with camera</span></div>

        <div className="camera-scanner">
          <Html5QrcodePlugin
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={handleScan}
          />
        </div>
        <p className="scanner-note">
          Camera access works on localhost or HTTPS and requires browser permission.
        </p>
      </section>
    </main>
  );
}
