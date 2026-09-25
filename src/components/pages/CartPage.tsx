import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";

function CartPage() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  const { data: products, isLoading } = useProducts();
  const { data: categories } = useCategories();

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

    return total + product.price * cartItem.quantity;
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
                <div
                  key={product.id}
                  className="flex gap-5 py-6"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <div
                    className="w-20 h-28 overflow-hidden shrink-0"
                    style={{ background: "var(--muted)" }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[10px] tracking-widest uppercase mb-1"
                      style={{ color: "var(--accent)" }}
                    >
                      {
                        categories?.find(
                          (c) => c.id === String(product.categoryId),
                        )?.name
                      }
                    </p>
                    <h3 className="font-display text-base font-medium mb-3">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-4">
                      <div
                        className="flex items-center text-sm"
                        style={{ border: "1px solid var(--border)" }}
                      >
                        <button
                          className="w-8 h-8 flex items-center justify-center transition-opacity hover:opacity-50"
                          onClick={() => decreaseQuantity(product.id)}
                        >
                          -
                        </button>
                        <span className="w-8 text-center">
                          {carItem.quantity}
                        </span>
                        <button
                          className="w-8 h-8 flex items-center justify-center transition-opacity hover:opacity-50"
                          onClick={() => increaseQuantity(product.id)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="text-[10px] tracking-widest uppercase transition-opacity hover:opacity-50"
                        style={{ color: "var(--muted-foreground)" }}
                        onClick={() => removeFromCart(product.id)}
                      >
                        Ta bort
                      </button>
                    </div>
                  </div>
                  <div className="text-sm self-start pt-0.5">
                    {(product.price * carItem.quantity).toLocaleString("sv-SE")}{" "}
                    kr
                  </div>
                </div>
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
