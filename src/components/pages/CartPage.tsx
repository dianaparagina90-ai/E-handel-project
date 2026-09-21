import { useCart } from "../../hooks/useCart";

function CartPage() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  return (
    <div>
      <h2>Varukorg</h2>
      <img src="" alt="" />
      {/* <p>CartItems titel och antal</p> */}
      <button onClick={() => increaseQuantity}>+</button>
      <button onClick={() => decreaseQuantity}>-</button>
      <button onClick={() => removeFromCart}>Ta bort</button>
    </div>
  );
}

export default CartPage;
