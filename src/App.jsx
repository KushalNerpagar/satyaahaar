import { lazy, Suspense } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageLoader from "./components/ui/PageLoader";
import ScrollToTop from "./components/layout/ScrollToTop";

const LandingPage = lazy(() => import("./features/landing/LandingPage"));
const ScannerPage = lazy(() => import("./features/scanner/ScannerPage"));
const ProductPage = lazy(() => import("./features/scanner/ProductPage"));
const RecipeSearchPage = lazy(() => import("./features/recipes/RecipeSearchPage"));

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/scanner" element={<ScannerPage />} />
          <Route path="/product/:barcode" element={<ProductPage />} />
          <Route path="/recipes" element={<RecipeSearchPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <ToastContainer newestOnTop />
    </HashRouter>
  );
}

export default App;
