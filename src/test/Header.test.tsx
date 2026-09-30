import { afterEach, describe, expect, it } from "vitest";
import { BrowserRouter } from "react-router-dom";

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CartItemProvider from "../components/context/CartItemContext";
import Header from "../components/Header";
import { useCart } from "../hooks/useCart";

// Skapar en test component för att kunna lägga till produkter i kundvagnen
// och testa att Header visar rätt antal i badgen.
const TestComponent = () => {
    const { addToCart } = useCart();

    return (
        <button onClick={() => addToCart(1)}>
            Add
        </button>
    );
};

describe("Header", () => {
    afterEach(() => {
        cleanup();
    });

    // Testar att badgen inte visas när kundvagnen är tom
    it("does not show cart badge when cart is empty", () => {
        render(
            <BrowserRouter>
                <CartItemProvider>
                    <Header />
                </CartItemProvider>
            </BrowserRouter>
        );

        expect(screen.queryByTestId("cart-badge")).not.toBeInTheDocument();
    });

    // Testar att badgen visar 1 när en produkt läggs i kundvagnen
    it("shows cart badge with quantity 1", async () => {
        const user = userEvent.setup();

        render(
            <BrowserRouter>
                <CartItemProvider>
                    <Header />
                    <TestComponent />
                </CartItemProvider>
            </BrowserRouter>
        );

        await user.click(screen.getByRole("button", { name: "Add" }));

        expect(screen.getByTestId("cart-badge")).toHaveTextContent("1");
    });

    // Testar att badgen uppdateras när samma produkt läggs till flera gånger
    it("shows cart badge with quantity 2", async () => {
        const user = userEvent.setup();

        render(
            <BrowserRouter>
                <CartItemProvider>
                    <Header />
                    <TestComponent />
                </CartItemProvider>
            </BrowserRouter>
        );

        await user.click(screen.getByRole("button", { name: "Add" }));
        await user.click(screen.getByRole("button", { name: "Add" }));

        expect(screen.getByTestId("cart-badge")).toHaveTextContent("2");
    });
});