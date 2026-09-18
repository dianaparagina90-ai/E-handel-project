import { Route, Routes } from "react-router-dom";
import ProductPage from "./components/pages/ProductPage";
import ProductDetailPage from "./components/pages/ProductDetailPage";
import CartPage from "./components/pages/CartPage";
import CheckoutPage from "./components/pages/CheckoutPage";
import ConfirmationPage from "./components/pages/ConfirmationPage";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductPage />} />
      <Route path="/ProductDetail" element={<ProductDetailPage />} />
      <Route path="/Cart" element={<CartPage />} />
      <Route path="/Checkout" element={<CheckoutPage />} />
      <Route path="/Confirmation" element={<ConfirmationPage />} />
    </Routes>
  );
};

export default App;
