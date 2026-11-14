import { z } from "zod";

import { customerSchema, noteField } from "@/lib/schemas/checkout";

export const orderLineSchema = z.object({
  menuItemId: z.string().trim().min(1, "Món không hợp lệ."),
  quantity: z
    .number()
    .int("Số lượng phải là số nguyên.")
    .positive("Số lượng phải lớn hơn 0."),
});

export const orderRequestSchema = z.object({
  items: z.array(orderLineSchema).min(1, "Giỏ hàng đang trống."),
  customer: customerSchema,
  note: noteField,
});

export type OrderLineInput = z.infer<typeof orderLineSchema>;
export type OrderRequest = z.infer<typeof orderRequestSchema>;
