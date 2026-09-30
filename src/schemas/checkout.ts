import { z } from "zod";

export const customerInfoSchema = z.object({
  name: z
    .string()
    .min(2, "Ange ditt fullständiga namn")
    .regex(/^[a-zA-ZåäöÅÄÖ\s-]+$/, "Namnet får bara innehålla bokstäver"),
  email: z.string().email("Ange en giltig e-postadress"),
  phone: z
    .string()
    .min(7, "Ange ett giltigt mobilnummer")
    .regex(/^[\d\s+-]+$/, "Endast siffror och +/- tillåtna"),
  address: z.string().min(5, "Ange en giltig adress"),
});

export type CustomerInfo = z.infer<typeof customerInfoSchema>;

export const shippingSchema = z.object({
  method: z.enum(["dhl", "schenker", "postnord"], {
    error: () => ({ message: "Välj ett fraktsätt" }),
  }),
});

export type Shipping = z.infer<typeof shippingSchema>;

export const paymentSchema = z.object({
  method: z.enum(["kort", "swish", "klarna"], {
    error: () => ({ message: "Välj ett betalsätt" }),
  }),
});

export type Payment = z.infer<typeof paymentSchema>;
