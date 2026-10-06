import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import { useCart } from "../../hooks/useCart";
import { isOnSale, getDisplayPrice } from "../../utils/helpers";
import OutOfStock from "../OutOfStockBadge";

function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const productId = Number(id);

  const product = useProduct(productId);

  if (product.isLoading) {
    return <p>Laddar...</p>;
  }

  if (product.isError) {
    return <p>Något gick fel.</p>;
  }

  if (!product.data) {
    return <p>Ingen produkt hittades.</p>;
  }

  const onSale = isOnSale(product.data.product);
  const displayPrice = getDisplayPrice(product.data.product);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* HELA PRODUKTDETALJSIDAN */}

      <button
        className="py-2 text-xs mb-6 cursor-default transition-colors hover:text-[#c4607a]"
        onClick={() => navigate(-1)}
      >
        &lt; TILLBAKA
      </button>

      {/* LAYOUT: BILDER + PRODUKTINFO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* BILDSEKTION */}
        <div className="flex flex-col gap-y-6">
          {/* STOR PRODUKTBILD */}
          <OutOfStock product={product.data.product}>
            <img
              src={product.data.product.image}
              alt={product.data.product.name}
              className="w-full"
            />
          </OutOfStock>

          {/* SMÅ PRODUKTBILDER */}
          <div className="flex justify-start gap-3">
            <img
              src={product.data.product.image}
              alt={product.data.product.name}
              className="w-24 object-cover cursor-pointer"
            />

            <img
              src={product.data.product.image}
              alt={product.data.product.name}
              className="w-24 object-cover cursor-pointer"
            />

            <img
              src={product.data.product.image}
              alt={product.data.product.name}
              className="w-24 object-cover cursor-pointer"
            />
          </div>
        </div>

        {/* PRODUKTINFORMATION */}
        <div className="flex flex-col justify-center gap-4">
          <p className="text-[#c4607a]">
            {product.data.categories.map((c) => c.name).join(", ")}
          </p>

          <h1 className="font-display text-3xl font-medium ">
            {product.data.product.name}
          </h1>

          <div className="flex items-center gap-3 py-5">
            {onSale ? (
              <>
                <span className="text-[#c4607a] font-medium">
                  {displayPrice.toLocaleString("sv-SE")} kr
                </span>
                <span className="text-(--muted-foreground) line-through text-sm">
                  {product.data.product.price.toLocaleString("sv-SE")} kr
                </span>
              </>
            ) : (
              <span className="text-[#c4607a]">
                {product.data.product.price.toLocaleString("sv-SE")} kr
              </span>
            )}
          </div>

          <p className="font-base gap-4 text-sm leading-relaxed">
            {product.data.product.description}
          </p>

          {/* KNAPP */}
          <div className="pt-4">
            <button
              className="w-full px-8 py-4 bg-[#c4607a] text-white font-base"
              onClick={() => {
                addToCart(product.data.product.id, product.data.product.stock);
              }}
              disabled={product.data.product.stock === 0}
            >
              {product.data.product.stock === 0
                ? "SLUT I LAGER"
                : "LÄGG I VARUKORGEN"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
