import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import CustomerInfoForm from "../components/forms/CustomerInfoForm";
import CheckoutPage from "../components/pages/CheckoutPage";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//Mockade hooks
vi.mock("../hooks/useCart", () => ({
  useCart: () => ({
    cartItems: [],
  }),
}));

vi.mock("../hooks/useProducts", () => ({
  useProducts: () => ({
    data: [],
  }),
}));

vi.mock("../hooks/useCreateOrder", () => ({
  useCreateOrder: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

describe("CheckoutValidation", () => {
  afterEach(() => {
    cleanup();
  });

  it("shows validation errors when form is submitted empty", async () => {
    //Arrange
    const user = userEvent.setup();
    const onNext = vi.fn();

    render(
      <>
        <CustomerInfoForm onNext={onNext} />
        <button type="submit" form="checkout-form">
          Nästa
        </button>
      </>,
    );

    //Act
    await user.click(screen.getByRole("button", { name: "Nästa" }));

    //Assert
    expect(screen.getByText("Ange ditt fullständiga namn")).toBeInTheDocument();
    expect(screen.getByText("Ange en giltig e-postadress")).toBeInTheDocument();
    expect(
      screen.getByText("Ange ett giltigt mobilnummer"),
    ).toBeInTheDocument();
    expect(screen.getByText("Ange en giltig adress")).toBeInTheDocument();
  });

  it("moves to the shipping step when customer information is valid", async () => {
    //Act
    const user = userEvent.setup();
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <CheckoutPage />
        </BrowserRouter>
        ,
      </QueryClientProvider>,
    );

    //Act
    await user.type(
      screen.getByLabelText(/fullständigt namn/i),
      "Anna Andersson",
    );
    await user.type(screen.getByLabelText(/e-postadress/i), "anna@test.se");
    await user.type(screen.getByLabelText(/mobilnummer/i), "0701234567");
    await user.type(screen.getByLabelText(/address/i), "Storgatan 1");
    await user.click(screen.getByRole("button", { name: /nästa: leverans/i }));

    //Assert

    expect(screen.getAllByText("Leverans").length).toBeGreaterThan(0);
  });
});
