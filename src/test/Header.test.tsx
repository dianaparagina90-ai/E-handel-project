import { afterEach, describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";

import { cleanup, render, screen } from "@testing-library/react";

import Header from "../components/layout/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    expect(screen.queryByTestId("cart-badge")).not.toBeInTheDocument();
  });

  // Testar att badgen visar rätt antal produkter
  it("shows cart badge with quantity 1", () => {
    mockCartItems = [{ productId: 1, quantity: 1 }];

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    expect(screen.getByTestId("cart-badge")).toHaveTextContent("1");
  });

  // Testar att badgen visar rätt antal produkter
  it("shows cart badge with quantity 2", () => {
    mockCartItems = [{ productId: 1, quantity: 2 }];

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    expect(screen.getByTestId("cart-badge")).toHaveTextContent("2");
  });
});
