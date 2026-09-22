import type { Product } from "../types/product";
import cartIcon from "../assets/cartIcon.png";

function ProductCard({
  product,
  categoryName,
}: {
  product: Product;
  categoryName?: string;
}) {
  return (
    <div className=" relative shadow-sm hover:shadow-xl transition-shadow">
      <div className="aspect-3/4 bg-(--card) overflow-hidden">
        <img
          className="w-full h-full object-cover "
          src={product.image}
          alt={product.name}
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
          e.stopPropagation(); // Lägg till logik från AddToCart
        }}
        aria-label="Lägg till i kundvagn"
        className="absolute bottom-2 right-2"
      >
        <img src={cartIcon} alt="" className="w-8 h-8 object-contain" />
        <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-(--accent) text-white text-xs font-bold">
          +
        </span>
      </button>
    </div>
  );
}

export default ProductCard;
