import { lazy, Suspense } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import PageLoader from "./components/ui/PageLoader";
import ScrollToTop from "./components/layout/ScrollToTop";
import RouteTitle from "./components/layout/RouteTitle";
import LandingPage from "./features/landing/LandingPage";

const ScannerPage = lazy(() => import("./features/scanner/ScannerPage"));
const ProductPage = lazy(() => import("./features/scanner/ProductPage"));
const RecipeSearchPage = lazy(() => import("./features/recipes/RecipeSearchPage"));

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <RouteTitle />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/scanner" element={<ScannerPage />} />
          <Route path="/product/:barcode" element={<ProductPage />} />
          <Route path="/recipes" element={<RecipeSearchPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
