import { useState } from "react";
import CheckoutSteps from "../CheckoutSteps";

type Step = 1 | 2 | 3;

function CheckoutPage() {
  const [step, setStep] = useState<Step>(1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button className="text-sm text-(--muted-foreground) mb-6">
        ← TILLBAKA TILL VARUKORG
      </button>
      <CheckoutSteps/>
    </div>
  );
}

export default CheckoutPage;
