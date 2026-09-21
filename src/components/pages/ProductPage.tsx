function ProductPage() {
  const placeholderCount = 12;

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
    </div>
  );
}

export default ProductPage;
