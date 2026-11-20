import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import ScannerPage from "./features/scanner/ScannerPage";
import ProductPage from "./features/scanner/ProductPage";
import RecipeSearchPage from "./features/recipes/RecipeSearchPage";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/scanner" element={<ScannerPage />} />
        <Route path="/product/:barcode" element={<ProductPage />} />
        <Route path="/recipes" element={<RecipeSearchPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer newestOnTop />
    </HashRouter>
  );
}

export default App;
