import { afterEach, describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";

import { cleanup, render, screen } from "@testing-library/react";

import Header from "../components/layout/Header";

let mockCartItems: { productId: number; quantity: number }[] = [];

vi.mock("../hooks/useCart", () => ({
  useCart: () => ({
    cartItems: mockCartItems,
  }),
}));

vi.mock("../components/CartDrawer", () => ({
  default: () => <div />,
}));

describe("Header", () => {
  afterEach(() => {
    cleanup();
    mockCartItems = [];
  });

  // Testar att badgen inte visas när kundvagnen är tom
  it("does not show cart badge when cart is empty", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    expect(screen.queryByTestId("cart-badge")).not.toBeInTheDocument();
  });

  // Testar att badgen visar rätt antal produkter
  it("shows cart badge with quantity 1", () => {
    mockCartItems = [{ productId: 1, quantity: 1 }];

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    expect(screen.getByTestId("cart-badge")).toHaveTextContent("1");
  });

  // Testar att badgen visar rätt antal produkter
  it("shows cart badge with quantity 2", () => {
    mockCartItems = [{ productId: 1, quantity: 2 }];

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    expect(screen.getByTestId("cart-badge")).toHaveTextContent("2");
  });
});
