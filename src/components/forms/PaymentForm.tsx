import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema, type Payment } from "../../schemas/checkout";

function PaymentForm({
  onNext,
  defaultValues,
}: {
  onNext: (data: Payment) => void;
  defaultValues?: Payment | null;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Payment>({
    resolver: zodResolver(paymentSchema),
    defaultValues: defaultValues ?? undefined,
  });

  return (
    <form
      id="checkout-form"
      onSubmit={handleSubmit(onNext)}
      className="flex flex-col gap-4"
    >
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
    </form>
  );
}

export default PaymentForm;
