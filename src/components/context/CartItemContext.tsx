import type { CartItem } from "../../types/types";
import { createContext, useState, type PropsWithChildren } from "react";

interface ICartContextType {
  cartItems: CartItem[];
  addToCart: (productId: number, stock: number) => void;
  increaseQuantity: (productId: number, stock: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

export const CartItemContext = createContext<ICartContextType | null>(null);

const CartItemProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  //Lägga produkt i kundvagnen
  const addToCart = (productId: number, stock: number) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.productId === productId);

      if (existingItem) {
        if (existingItem.quantity >= stock) return items;
        return items.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      if (stock <= 0) return items;
      return [...items, { productId, quantity: 1 }];
    });
  };

  //Öka antal av samma produkt
  const increaseQuantity = (productId: number, stock: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.productId === productId && item.quantity < stock
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  //Sänka antal av samma produkt
  const decreaseQuantity = (productId: number) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  //Ta bort produkt från kundvagnen
  const removeFromCart = (productId: number) => {
    setCartItems((items) =>
      items.filter((item) => item.productId !== productId),
    );
  };

  //Töm kundvagnen
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartItemContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartItemContext.Provider>
  );
};

export default CartItemProvider;
