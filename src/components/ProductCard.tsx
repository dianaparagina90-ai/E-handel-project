import type { Product } from "../types/product";

function ProductCard({
  product,
  categoryName,
}: {
  product: Product;
  categoryName?: string;
}) {
  return (
    <div className="shadow-sm hover:shadow-xl transition-shadow">
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
    </div>
  );
}

export default ProductCard;
