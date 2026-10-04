import { useCart } from "../hooks/useCart";
import { useProducts } from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";

type CartDrawerProps = {
    onClose: () => void;
};

function CartDrawer({ onClose }: CartDrawerProps) {
    const { cartItems } = useCart();
    const { data: products, isLoading } = useProducts();
    const navigate = useNavigate();

    if (isLoading) {
        return <p>Laddar varukorgen...</p>;
    }

    const totalPrice = cartItems.reduce((total, cartItem) => {
        const product = products?.find(
            (product) => product.id === cartItem.productId,
        );

        if (!product) return total;

        return total + product.price * cartItem.quantity;
    }, 0);

    return (
        <div className="w-80 p-6">
            <div className="flex items-center justify-between pb-5 mb-5 border-b">
                <h2 className="font-display text-2xl font-medium">
                    Din varukorg
                </h2>

                <button
                    onClick={onClose}
                    className="text-xl hover:opacity-60 transition-opacity"
                    aria-label="Stäng varukorg"
                >
                    X
                </button>
            </div>

            {cartItems.map((cartItem) => {
                const product = products?.find(
                    (product) => product.id === cartItem.productId,
                );

                if (!product) {
                    return null;
                }

                return (
                    <div
                        key={product.id}
                        className="flex gap-4 py-5 border-b"
                    >
                        <img
                            className="w-20 h-24 object-cover"
                            src={product.image}
                            alt={product.name}
                        />

                        <div>
                            <div className="font-medium mb-1">
                                {product.name}
                            </div>

                            <div className="text-sm">
                                {product.price.toLocaleString("sv-SE")} kr
                            </div>

                            <div className="text-sm text-gray-500">
                                Antal: {cartItem.quantity}
                            </div>
                        </div>
                    </div>
                );
            })}

            <div className="mt-5 pt-5 border-t flex items-center justify-between">
                <span className="font-medium">Totalt</span>

                <span className="font-medium">
                    {totalPrice.toLocaleString("sv-SE")} kr
                </span>
            </div>

            <button
                onClick={() => {
                    onClose();
                    navigate("/Cart");
                }}
                className="w-full mt-5 py-3 bg-[#c4607a] text-white hover:opacity-90 transition-opacity"
            >
                Gå till varukorgen
            </button>

            <button
                onClick={() => {
                    onClose();
                    navigate("/");
                }}
                className="w-full mt-5 py-2 text-sm hover:underline"
            >
                Fortsätt handla
            </button>
        </div>
    );
}

export default CartDrawer;