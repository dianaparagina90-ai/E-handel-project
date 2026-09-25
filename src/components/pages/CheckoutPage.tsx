import { useState } from "react";
import CustomerInfoForm from "../CustomerInfoForm";
import ShippingForm from "../ShippingForm";
import PaymentForm from "../PaymentForm";
import type { CustomerInfo, Payment, Shipping } from "../../schemas/checkout";

type Step = 1 | 2 | 3;

function CheckoutPage() {
  const [step, setStep] = useState<Step>(1);

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [shipping, setShipping] = useState<Shipping | null>(null);
  const [payment, setPayment] = useState<Payment | null>(null);

  const allStepsComplete = customerInfo && shipping && payment;
  function handlePay() {
    if (!allStepsComplete) return;

    const order = {
      customerInfo,
      shipping,
      payment,
    };

    console.log("Order redo att skickas:", order);
    // TODO: koppla in db-logik här
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
            onClick={handlePay}
            disabled={!allStepsComplete}
            className="bg-(--primary) text-(--primary-foreground) py-3 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Betala
          </button>
        </div>

        <div className="bg-(--card) p-6 rounded-lg h-fit">
          <h2 className="font-display text-xl mb-4">Din order</h2>
          <p className="text-sm text-(--muted-foreground)">
            [Cart-lista kommer här]
          </p>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
