import { useState } from "react";
import CustomerInfoForm from "../CustomerInfoForm";
import ShippingForm from "../ShippingForm";
import PaymentForm from "../PaymentForm";
import type { CustomerInfo, Payment, Shipping } from "../../schemas/checkout";
import { useCart } from "../../hooks/useCart";
import { useProducts } from "../../hooks/useProducts";
import CartItem from "./CartItem";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const stepLabels = ["Kunduppgifter", "Leverans", "Betalning"];
type Step = 1 | 2 | 3;

function CheckoutPage() {
  const { cartItems } = useCart();
  const { data: products } = useProducts();

  const [step, setStep] = useState<Step>(1);

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [shipping, setShipping] = useState<Shipping | null>(null);
  const [payment, setPayment] = useState<Payment | null>(null);

  const orderItems = cartItems.flatMap((item) => {
    const product = products?.find((p) => p.id === item.productId);
    if (!product) return [];
    return [
      {
        productId: item.productId,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      },
    ];
  });

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const nextLabel = {
    1: "Nästa: Leverans →",
    2: "Nästa: Betalning →",
    3: "Betala",
  }[step];

  function handlePay(paymentData: Payment) {
    if (!customerInfo || !shipping) return;

    const order = {
      customerInfo,
      shipping,
      payment: paymentData,
      items: cartItems, // productId, quantity
      subtotal,
    };

    console.log("Order redo att skickas:", order);
    // TODO: koppla in db-logik här
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Stepper
        activeStep={step - 1}
        alternativeLabel
        sx={{
          mb: 6,
          "& .Mui-active": { color: "var(--accent) !important" },
          "& .Mui-completed": { color: "var(--accent) !important" },
        }}
      >
        {stepLabels.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="font-display text-2xl mb-6">{stepLabels[step - 1]}</h2>
          {step === 1 && (
            <CustomerInfoForm
              defaultValues={customerInfo}
              onNext={(data) => {
                setCustomerInfo(data);
                setStep(2);
              }}
            />
          )}
          {step === 2 && (
            <ShippingForm
              defaultValues={shipping}
              onNext={(data) => {
                setShipping(data);
                setStep(3);
              }}
            />
          )}
          {step === 3 && (
            <PaymentForm
              defaultValues={payment}
              onNext={(data) => {
                setPayment(data);
                handlePay(data);
              }}
            />
          )}
          <div className="flex gap-3 mt-20">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step === 3 ? 2 : 1)}
                className="px-6 py-3.5 text-xs tracking-widest uppercase border border-(--border) text-(--muted-foreground) transition-opacity hover:opacity-60"
              >
                ← Tillbaka
              </button>
            )}
            <button
              type="submit"
              form="checkout-form"
              className="flex-1 py-3.5 text-xs tracking-widest uppercase bg-(--accent) text-(--accent-foreground) transition-opacity hover:opacity-80"
            >
              {nextLabel}
            </button>
          </div>
        </div>

        <div className="bg-(--card) p-4 sm:p-0 rounded-lg h-fit flex flex-col gap-1 ">
          <h2 className="font-display text-xl mb-4">Din order</h2>
          {/*rendering om listan med produkter*/}
          <div className="sm:flex sm:flex-col sm: gap-2">
            {cartItems.map((cartItem) => {
              const product = products?.find(
                (product) => product.id === cartItem.productId,
              );

              if (!product) {
                return null;
              }

              return (
                <CartItem
                  key={product.id}
                  product={product}
                  quantity={cartItem.quantity}
                  editable={false}
                />
              );
            })}
          </div>
          {/*Byggas vidare med totalen och allt annat som behövs*/}
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
