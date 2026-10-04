import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useProducts } from "../../hooks/useProducts";
import { getDisplayPrice } from "../../utils/helpers";

import CartItem from "./CartItem";

function CartPage() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  const { data: products, isLoading } = useProducts();

  const navigate = useNavigate();

  if (isLoading) {
    return <p>Laddar varukorg...</p>;
  }

  if (!cartItems.length) {
    return (
      <div
        className="text-center py-28"
        style={{ color: "var(--muted-foreground)" }}
      >
        <p className="font-display text-3xl italic mb-4">Din varukorg är tom</p>
        <p className="text-sm mb-8">
          Upptäck våra produkter och hitta dina favoriter
        </p>
        <button
          className="px-8 py-3 text-xs tracking-widest uppercase"
          style={{
            background: "var(--accent)",
            color: "var(--accent-foreground)",
          }}
          onClick={() => navigate("/")}
        >
          Börja handla
        </button>
      </div>
    );
  }

  const totalPrice = cartItems.reduce((total, cartItem) => {
    const product = products?.find(
      (product) => product.id === cartItem.productId,
    );

    if (!product) return total;

    return total + getDisplayPrice(product) * cartItem.quantity;
  }, 0);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="font-display text-3xl font-medium mb-10">Varukorg</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <div style={{ borderTop: "1px solid var(--border)" }}>
            {cartItems.map((carItem) => {
              const product = products?.find(
                (product) => product.id === carItem.productId,
              );

              if (!product) return null;

              return (
                <CartItem
                  key={product.id}
                  product={product}
                  quantity={carItem.quantity}
                  editable={true}
                  onIncrease={() => increaseQuantity(product.id)}
                  onDecrease={() => decreaseQuantity(product.id)}
                  onRemove={() => removeFromCart(product.id)}
                />
              );
            })}
          </div>
        </div>
        <div className="self-start sticky top-24">
          <div
            className="p-6"
            style={{
              background: "var(--secondary)",
              border: "1px solid var(--border)",
            }}
          >
            <h2 className="font-display text-xl font-medium mb-5">
              Att betala
            </h2>
            <div
              className="space-y-2.5 text-sm mb-5 pb-5"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <div className="flex justify-between">
                <span style={{ color: "var(--muted-foreground)" }}>
                  Delsumma
                </span>
                <span> {totalPrice.toLocaleString("sv-SE")} kr </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "var(--muted-foreground)" }}>Frakt</span>
                <span className="text-xs" style={{ color: "var(--accent)" }}>
                  {totalPrice >= 699
                    ? "Gratis ✓"
                    : `${(699 - totalPrice).toLocaleString("sv-SE")} kr kvar till gratis frakt`}{" "}
                </span>
              </div>
            </div>

            <div className="flex justify-between font-medium mb-6">
              <span>Totalt</span>
              <span>
                {(totalPrice >= 699
                  ? totalPrice
                  : totalPrice + 59
                ).toLocaleString("sv-SE")}
                kr
              </span>
            </div>

            <button
              onClick={() => navigate("/Checkout")}
              className="w-full py-3.5 text-xs tracking-widest uppercase mb-2 transition-opacity hover:opacity-80"
              style={{
                background: "var(--accent)",
                color: "var(--accent-foreground)",
              }}
            >
              Till kassan
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full py-2.5 text-xs tracking-widest uppercase transition-opacity hover:opacity-60"
              style={{ color: "var(--muted-foreground)" }}
            >
              Fortsätt handla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
