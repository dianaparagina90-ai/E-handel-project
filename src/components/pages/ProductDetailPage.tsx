import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import { useCart } from "../../hooks/useCart";


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
    return <p>Ingen produkt hittades.</p>
  }

  return (

    <div>

      <button onClick={() => navigate(-1)}>
        ← Tillbaka
      </button>

      <h1>{product.data.product.name}</h1>
      <p>{product.data.product.price} kr</p>
      <p>{product.data.product.description}</p>
      <p>{product.data.category.name}</p>


      <button onClick={() => addToCart(product.data.product.id)}>
        Lägg i varukorgen
      </button>

      {/* Produktbilder */}
      <img
        src={product.data.product.image}
        alt={product.data.product.name}
        className="w-full"
      />

      {/* Tre mindre bilder */}
      <div>

      <img src={product.data.product.image}
        alt={product.data.product.name}
        className="w-20"
        />
      <img src={product.data.product.image}
        alt={product.data.product.name}
        className="w-20"
        />
      <img src={product.data.product.image}
        alt={product.data.product.name}
        className="w-20"
        />

      </div>

    </div>
  );
}


export default ProductDetailPage;