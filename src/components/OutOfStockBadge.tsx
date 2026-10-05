import type { Product } from "../types/types";

function OutOfStock({
  product,
  children,
}: {
  product: Product;
  children: React.ReactNode;
}) {
  const outOfStock = product.stock === 0;

  return (
    <div className="relative">
      <div className={outOfStock ? "grayscale" : ""}>{children}</div>

      {outOfStock && (
        <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden pointer-events-none">
          <span className="absolute top-4.5 -right-8.5 w-35 rotate-45 bg-(--muted-foreground) text-white text-xs uppercase tracking-wide text-center py-1 shadow-md">
            Slut i lager
          </span>
        </div>
      )}
    </div>
  );
}

export default OutOfStock;
