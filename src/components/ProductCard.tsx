import { useNavigate } from "react-router-dom";
import type { Product } from "../types/types";
import cartIcon from "../assets/cartIcon.png";
import { useCart } from "../hooks/useCart";

function ProductCard({
  product,
  categoryName,
}: {
  product: Product;
  categoryName?: string;
}) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (

    <div className="relative shadow-sm hover:shadow-xl transition-shadow"
    onClick={() => navigate(`/ProductDetail/${product.id}`)}>

      <div className="aspect-3/4 bg-(--card) overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-1 p-1.5">
        {categoryName && (
          <p className="text-xs text-(--accent)">{categoryName}</p>
        )}
        <h2 className="text-xl font-display">{product.name}</h2>
        <p className="text-(--muted-foreground)">{product.price} kr</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          addToCart(product.id);
        }}
        aria-label="Lägg till i kundvagn"
        className="absolute bottom-2 right-2 cursor-pointer hover:bg-(--border) hover:rounded-full hover:p-1 active:cursor-grabbing "
      >
        <img
          src={cartIcon}
          alt=""
          className="w-8 h-8 object-contain hover:scale-125 "
        />
        <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-(--accent) text-white text-xs font-bold">
          +
        </span>
      </button>
    </div>
  );
}

export default ProductCard;
