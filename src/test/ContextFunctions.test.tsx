import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useCart } from "../hooks/useCart";
import CartItemProvider from "../components/context/CartItemContext";

//Skapar en test component för att testa att funktionerna i Contexten funkar genom Provider
const TestComponent = () => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  return (
    <div>
      <button onClick={() => addToCart(1)}>Add</button>
      <button onClick={() => removeFromCart(1)}>Remove</button>
      <button onClick={() => increaseQuantity(1)}>Increase</button>
      <button onClick={() => decreaseQuantity(1)}>Decrease</button>

      <span data-testid="quantity">
        {cartItems.find((item) => item.productId === 1)?.quantity ?? 0}
      </span>
    </div>
  );
};

describe("CartItemContext functions", () => {
  afterEach(() => {
    cleanup();
  });

  it("add product to the CartPage", async () => {
    //Arrange
    const user = userEvent.setup();

    //Act
    render(
      <CartItemProvider>
        <TestComponent />
      </CartItemProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Add" }));

    //Assert
    expect(screen.getByTestId("quantity")).toHaveTextContent("1");
  });

  it("increase quantity", async () => {
    //Arrange
    const user = userEvent.setup();

    //Act
    render(
      <CartItemProvider>
        <TestComponent />
      </CartItemProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Add" }));
    await user.click(screen.getByRole("button", { name: "Increase" }));

    //Assert
    expect(screen.getByTestId("quantity")).toHaveTextContent("2");
  });

  it("decrease quantity", async () => {
    //Arrange
    const user = userEvent.setup();

    //Act
    render(
      <CartItemProvider>
        <TestComponent />
      </CartItemProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Add" }));
    await user.click(screen.getByRole("button", { name: "Add" }));
    await user.click(screen.getByRole("button", { name: "Decrease" }));

    //Assert
    expect(screen.getByTestId("quantity")).toHaveTextContent("1");
  });

  it("remove product from the CartPage", async () => {
    //Arrange
    const user = userEvent.setup();

    //Act
    render(
      <CartItemProvider>
        <TestComponent />
      </CartItemProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Add" }));
    await user.click(screen.getByRole("button", { name: "Remove" }));

    //Assert
    expect(screen.getByTestId("quantity")).toHaveTextContent("0");
  });
});
