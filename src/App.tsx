import { Route, Routes } from "react-router-dom";
import ProductPage from "./components/pages/ProductPage";
import ProductDetailPage from "./components/pages/ProductDetailPage";
import CartPage from "./components/pages/CartPage";
import CheckoutPage from "./components/pages/CheckoutPage";
import ConfirmationPage from "./components/pages/ConfirmationPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import CartItemProvider from "./components/context/CartItemContext";
import { ErrorBoundary } from "react-error-boundary";
import FallbackConfirmation from "./components/fallbacks/FallbackConfirmation";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <CartItemProvider>
        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<ProductPage />} />
            <Route path="/ProductDetail/:id" element={<ProductDetailPage />} />
            <Route path="/Cart" element={<CartPage />} />
            <Route path="/Checkout" element={<CheckoutPage />} />
            <Route
              path="/Confirmation/:id"
              element={
                <ErrorBoundary FallbackComponent={FallbackConfirmation}>
                  <ConfirmationPage />
                </ErrorBoundary>
              }
            ></Route>
          </Routes>
        </main>
      </CartItemProvider>
      <Footer />
    </div>
  );
};

export default App;
