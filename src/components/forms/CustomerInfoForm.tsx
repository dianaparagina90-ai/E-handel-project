import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerInfoSchema, type CustomerInfo } from "../../schemas/checkout";

function CustomerInfoForm({
  onNext,
  defaultValues,
}: {
  onNext: (data: CustomerInfo) => void;
  defaultValues?: CustomerInfo | null;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerInfo>({
    resolver: zodResolver(customerInfoSchema),
    defaultValues: defaultValues ?? undefined,
  });

  return (
    <form
      id="checkout-form"
      onSubmit={handleSubmit(onNext)}
      className="flex flex-col gap-4"
    >
      <div>
        <label htmlFor="name" className="text-xs uppercase">
          Fullständigt namn
        </label>
        <input id="name" {...register("name")} className="w-full border p-2" />
        {errors.name && (
          <p className="text-red-950 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="text-xs uppercase">
          E-postadress
        </label>
        <input
          id="email"
          {...register("email")}
          className="w-full border p-2"
        />
        {errors.email && (
          <p className="text-red-950 text-sm">{errors.email.message}</p>
        )}
      </div>{" "}
      <div>
        <label htmlFor="phone" className="text-xs uppercase">
          Mobilnummer
        </label>
        <input
          id="phone"
          {...register("phone")}
          className="w-full border p-2"
        />
        {errors.phone && (
          <p className="text-red-950 text-sm">{errors.phone.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="address" className="text-sm uppercase">
          Address
        </label>
        <input
          id="address"
          {...register("address")}
          className="w-full border p-2"
        />
        {errors.address && (
          <p className="text-red-950 text-sm">{errors.address.message}</p>
        )}
      </div>
    </form>
  );
}

export default CustomerInfoForm;
