import { useState } from "react";
import { useCategories } from "../../hooks/useCategories";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../product/ProductCard";
import CategoryFilter from "../product/CategoryFilter";
import { getCategoryIds } from "../../utils/helpers";

function ProductPage() {
  const { data: products, isLoading, isError, error } = useProducts();
  const { data: categories } = useCategories();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const filteredProducts = selectedCategory
    ? products?.filter((p) =>
        getCategoryIds(p.categoryId).some(
          (id) => String(id) === selectedCategory,
        ),
      )
    : products;
  const selectedCategoryName = selectedCategory
    ? categories?.find((c) => c.id === selectedCategory)?.name
    : "Alla Produkter";

  if (isLoading) return <p> Laddar produkter....</p>;
  if (isError) return <p>{error.message}</p>;
  if (!products) return null;

  return (
    <div>
      <div className="relative w-full h-130">
        <img
          src="https://images.unsplash.com/photo-1786874226074-c60d809f9bfb?w=1600&h=700&fit=crop&auto=format&crop=faces"
          alt=""
          className="w-full h-full object-cover "
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(196, 96, 122, 0.55) 0%, rgba(44, 31, 26, 0.3) 60%, transparent 100%)",
          }}
        ></div>
        <div className="absolute inset-0 flex flex-col justify-center px-12 md:px-24 text-white">
          <p className="italic text-sm tracking-widest mb-2">
            Ny kollektion · Höst 2026
          </p>
          <h1 className="font-display text-6xl">Du förtjänar</h1>
          <h1 className="font-display text-6xl italic">det bästa</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <CategoryFilter
          categories={categories ?? []}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <div>
          <h1 className="font-display text-3xl p-5">{selectedCategoryName}</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12">
          {filteredProducts?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              categoryName={
                categories?.find((c) =>
                  getCategoryIds(product.categoryId).includes(Number(c.id)),
                )?.name
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
