import React from "react";

function ProductPage() {
  const placeholderCount = 12;

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="font-display text-3xl">Alla Produkter</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12">
        {Array.from({ length: placeholderCount }).map((_, i) => (
          <div
            key={i}
            className="aspect-3/4 bg-(--card) flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="text-sm text-(--muted-foreground)">
              Produkt {i + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
