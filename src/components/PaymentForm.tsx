import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema, type Payment } from "../schemas/checkout";

function PaymentForm({ onNext }: { onNext: (data: Payment) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Payment>({
    resolver: zodResolver(paymentSchema),
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2">
          <input type="radio" value="kort" {...register("method")} />
          Kort
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" value="swish" {...register("method")} />
          Swish
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" value="klarna" {...register("method")} />
          Klarna
        </label>
        {errors.method && (
          <p className="text-red-950 text-sm">{errors.method.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-(--primary) text-(--primary-foreground) py-2"
      >
        Nästa
      </button>
    </form>
  );
}

export default PaymentForm;
