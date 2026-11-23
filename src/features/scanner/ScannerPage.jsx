import { useCallback, useRef, useState } from "react";
import { Camera, CameraOff, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageHeader from "../../components/layout/PageHeader";
import SkipLink from "../../components/ui/SkipLink";
import Html5QrcodePlugin from "./Html5QrcodePlugin";
import { getProduct } from "../../lib/api/openfoodfacts";

const SAMPLE_BARCODE = "8901030895601";

export default function ScannerPage() {
  const [barcode, setBarcode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const scanLock = useRef(false);
  const navigate = useNavigate();

  const lookupProduct = useCallback(
    async (value) => {
      const normalized = value.trim();
      setIsLoading(true);
      try {
        const product = await getProduct(normalized);
        navigate(`/product/${normalized}`, { state: { productData: product } });
      } catch (error) {
        if (error.code !== "aborted") {
          toast.error(error.message, { position: "top-right", autoClose: 4500 });
        }
      } finally {
        setIsLoading(false);
      }
    },
    [navigate]
  );

  const handleScan = useCallback(
    (decodedText) => {
      if (scanLock.current) return;
      scanLock.current = true;
      setShowScanner(false);
      lookupProduct(decodedText).finally(() => {
        scanLock.current = false;
      });
    },
    [lookupProduct]
  );

  return (
    <div className="min-h-screen bg-eerie-1 font-sans text-body-2 leading-[1.85] text-white">
      <SkipLink />
      <PageHeader />

      <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-[900px] px-4 py-12 outline-none">
        <p className="mb-3 text-label-2 font-bold uppercase tracking-[0.4em] text-gold">
          Nutrition explorer
        </p>
        <h1 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.1]">
          Scan a food product
        </h1>
        <p className="mt-4 max-w-[620px] text-quick-silver">
          Enter a barcode or scan it with your camera to see nutrition, ingredients, categories,
          and sustainability information.
        </p>

        <section className="mt-8 rounded-card border border-white/10 bg-smoky-1 p-6 sm:p-10">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              lookupProduct(barcode);
            }}
          >
            <label
              htmlFor="barcode"
              className="mb-2 block text-label-2 font-bold uppercase tracking-[0.2em] text-quick-silver"
            >
              Product barcode
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="barcode"
                inputMode="numeric"
                autoComplete="off"
                placeholder="For example, 8901030895601"
                value={barcode}
                onChange={(event) => setBarcode(event.target.value.replace(/\D/g, ""))}
                className="h-14 w-full border border-white/10 bg-eerie-2 px-5 text-lg text-white outline-none transition-colors placeholder:text-quick-silver focus:border-gold"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex h-14 shrink-0 items-center justify-center gap-2 bg-gold px-8 text-label-2 font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Search size={16} aria-hidden="true" />
                {isLoading ? "Loading…" : "Search"}
              </button>
            </div>
            <button
              type="button"
              onClick={() => setBarcode(SAMPLE_BARCODE)}
              className="mt-3 text-label-2 uppercase tracking-[0.2em] text-gold underline-offset-4 hover:underline"
            >
              Try a sample barcode
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-label-2 uppercase tracking-[0.2em] text-quick-silver">
              or scan with camera
            </span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          {showScanner ? (
            <div className="space-y-4">
              <div className="overflow-hidden rounded-xl bg-white p-4 text-black">
                <Html5QrcodePlugin
                  fps={10}
                  qrbox={250}
                  disableFlip={false}
                  qrCodeSuccessCallback={handleScan}
                />
              </div>
              <button
                type="button"
                onClick={() => setShowScanner(false)}
                className="inline-flex items-center gap-2 text-label-2 font-bold uppercase tracking-[0.2em] text-quick-silver transition-colors hover:text-white"
              >
                <CameraOff size={16} aria-hidden="true" />
                Stop camera
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowScanner(true)}
              className="inline-flex h-14 items-center justify-center gap-2 border-2 border-gold px-8 text-label-2 font-bold uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-black"
            >
              <Camera size={16} aria-hidden="true" />
              Scan with camera
            </button>
          )}

          <p className="mt-6 text-label-2 leading-[1.6] text-quick-silver">
            Camera access works on localhost or HTTPS and requires browser permission.
          </p>
        </section>
      </main>

      <ToastContainer newestOnTop />
    </div>
  );
}
