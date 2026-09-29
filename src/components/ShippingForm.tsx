import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingSchema, type Shipping } from "../schemas/checkout";

function ShippingForm({
  onNext,
  defaultValues,
}: {
  onNext: (data: Shipping) => void;
  defaultValues?: Shipping | null;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Shipping>({
    resolver: zodResolver(shippingSchema),
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
          <input type="radio" value="dhl" {...register("method")} />
          DHL
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" value="schenker" {...register("method")} />
          Schenker
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" value="postnord" {...register("method")} />
          Postnord
        </label>
        {errors.method && (
          <p className="text-red-950 text-sm">{errors.method.message}</p>
        )}
      </div>
    </form>
  );
}

export default ShippingForm;
