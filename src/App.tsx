import { Route, Routes } from "react-router-dom";
import ProductPage from "./components/pages/ProductPage";
import ProductDetailPage from "./components/pages/ProductDetailPage";
import CartPage from "./components/pages/CartPage";
import CheckoutPage from "./components/pages/CheckoutPage";
import ConfirmationPage from "./components/pages/ConfirmationPage";
import Header from "./components/Header";
import "./App.css";
import CartItemProvider from "./components/context/CartItemContext";

const App = () => {
  return (
    <div>
      <CartItemProvider>
        <Header />
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/ProductDetail" element={<ProductDetailPage />} />
          <Route path="/Cart" element={<CartPage />} />
          <Route path="/Checkout" element={<CheckoutPage />} />
          <Route path="/Confirmation" element={<ConfirmationPage />} />
        </Routes>
      </CartItemProvider>
    </div>
  );
};

export default App;
