import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerInfoSchema, type CustomerInfo } from "../schemas/checkout";

function CustomerInfoForm({
  onNext,
}: {
  onNext: (data: CustomerInfo) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerInfo>({
    resolver: zodResolver(customerInfoSchema),
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="flex flex-col gap-4">
      <div>
        <label className="text-xs uppercase">Fullständigt namn</label>
        <input {...register("name")} className="w-full border p-2" />
        {errors.name && (
          <p className="text-red-950 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label className="text-sm uppercase">Address</label>
        <input {...register("address")} className="w-full border p-2" />
        {errors.address && (
          <p className="text-red-950 text-sm">{errors.address.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-(--primary) text-(--primary-foreground) py-2"
      >
        Nästa: Leverans →
      </button>
    </form>
  );
}

export default CustomerInfoForm;
