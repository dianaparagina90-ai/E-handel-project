import { useCategories } from "../../hooks/useCategories";
import type { CartItemProps } from "../../types/types";
import { isOnSale, getDisplayPrice, getCategoryIds } from "../../utils/helpers";

const CartItem = ({
  product,
  quantity,
  editable = true,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) => {
  const { data: categories } = useCategories();

  const onSale = isOnSale(product);
  const displayPrice = getDisplayPrice(product);
  const totalPrice = displayPrice * quantity;

  return (
    <div
      className="flex flex-col sm:flex-row gap-4 sm:gap-5 py-6"
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
      <div className="flex-1 min-w-0 ">
        <p
          className="text-[10px] tracking-widest uppercase mb-1"
          style={{ color: "var(--accent)" }}
        >
          {
            categories?.find((c) =>
              getCategoryIds(product.categoryId).includes(Number(c.id)),
            )?.name
          }
        </p>
        <h3 className="font-display text-base font-medium mb-3">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          {onSale ? (
            <>
              <span className="text-sm" style={{ color: "var(--accent)" }}>
                {displayPrice.toLocaleString("sv-SE")} kr
              </span>
              <span
                className="text-sm line-through"
                style={{ color: "var(--muted-foreground)" }}
              >
                {product.price.toLocaleString("sv-SE")} kr
              </span>
            </>
          ) : (
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              {product.price.toLocaleString("sv-SE")} kr
            </p>
          )}
        </div>
      </div>

      {editable ? (
        <div className="flex items-center gap-4">
          <div
            className="flex items-center text-sm"
            style={{ border: "1px solid var(--border)" }}
          >
            <button
              className="w-8 h-8 flex items-center justify-center transition-opacity hover:opacity-50"
              onClick={onDecrease}
            >
              -
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              className="w-8 h-8 flex items-center justify-center transition-opacity hover:opacity-50"
              onClick={onIncrease}
            >
              +
            </button>
          </div>
          <button
            className="text-[10px] tracking-widest uppercase transition-opacity hover:opacity-50"
            style={{ color: "var(--muted-foreground)" }}
            onClick={onRemove}
          >
            Ta bort
          </button>
        </div>
      ) : (
        <p className="text-sm " style={{ color: "var(--muted-foreground)" }}>
          Antal: {quantity}
        </p>
      )}
      <div className="text-sm sm:ml-auto sm:self-start whitespace-nowrap">
        {totalPrice.toLocaleString("sv-SE")} kr
      </div>
    </div>
  );
};

export default CartItem;
