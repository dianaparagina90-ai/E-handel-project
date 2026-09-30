import { useState } from "react";
import CustomerInfoForm from "../CustomerInfoForm";
import ShippingForm from "../ShippingForm";
import PaymentForm from "../PaymentForm";
import type { CustomerInfo, Payment, Shipping } from "../../schemas/checkout";
import { useCart } from "../../hooks/useCart";
import { useProducts } from "../../hooks/useProducts";
import CartItem from "./CartItem";

import { useCreateOrder } from "../../hooks/useCreateOrder";
import type { Order } from "../../types/types";
import { useNavigate } from "react-router-dom";

type Step = 1 | 2 | 3;

function CheckoutPage() {
  const { cartItems } = useCart();
  const { data: products } = useProducts();
  const { mutate: createOrder, isPending } = useCreateOrder();
  const navigate = useNavigate();

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

  const allStepsComplete = customerInfo && shipping && payment;

  function handlePay(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (!allStepsComplete) return;

    const order: Order = {
      id: 0,
      items: orderItems,
      totalAmount: subtotal,
      customerDetails: JSON.stringify(customerInfo),
      shippingMethod: shipping.method,
      paymentMethod: payment.method,
      orderDate: new Date().toISOString(),
    };

    console.log("Order skapas: ", order);

    createOrder(order, {
      onSuccess: (data) => {
        console.log("Skapad order: ", data);
        navigate(`/Confirmation/${data.id}`);
      },
      onError: (error) => {
        console.error("ORDER MISSLYCKADES:", error);
      },
    });
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {step === 1 && (
            <CustomerInfoForm
              onNext={(data) => {
                setCustomerInfo(data);
                setStep(2);
              }}
            />
          )}
          {step === 2 && (
            <ShippingForm
              onNext={(data) => {
                setShipping(data);
                setStep(3);
              }}
            />
          )}
          {step === 3 && (
            <PaymentForm
              onNext={(data) => {
                setPayment(data);
              }}
            />
          )}

          <button
            type="button"
            onClick={handlePay}
            disabled={!allStepsComplete || isPending}
            className="bg-(--primary) text-(--primary-foreground) py-3 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isPending ? "Betalar..." : "Betala"}
          </button>
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
