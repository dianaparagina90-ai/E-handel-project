import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductPageErrorBoundary from "../components/ProductPageErrorBoundary";

describe("ProductPageErrorBoundary", () => {
    it("shows fallback when a child throws an error", () => {

        const BrokenComponent = () => {
            throw new Error("Test error");
        };

            render(
                <ProductPageErrorBoundary>
                    <BrokenComponent />
                </ProductPageErrorBoundary>
            );
        expect(screen.getByText("Något gick fel.")).toBeInTheDocument();
    });
});
