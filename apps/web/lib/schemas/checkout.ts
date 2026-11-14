import { z } from "zod";

export const PHONE_INVALID_MESSAGE =
  "Số điện thoại không hợp lệ. Dùng dạng 0xxxxxxxxx hoặc +84xxxxxxxxx.";

export const customerFields = {
  fullName: z
    .string()
    .trim()
    .min(2, "Họ tên phải có ít nhất 2 ký tự.")
    .max(50, "Họ tên tối đa 50 ký tự."),
  phone: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập số điện thoại.")
    .transform((value) => value.replace(/[\s-]/g, ""))
    .pipe(
      z
        .string()
        .regex(/^(?:0\d{9}|\+84\d{9})$/, PHONE_INVALID_MESSAGE),
    ),
  address: z
    .string()
    .trim()
    .min(10, "Địa chỉ phải có ít nhất 10 ký tự.")
    .max(200, "Địa chỉ tối đa 200 ký tự."),
};

export const noteField = z
  .string()
  .trim()
  .max(200, "Ghi chú tối đa 200 ký tự.")
  .optional();

export const customerSchema = z.object(customerFields);

export const checkoutFormSchema = z.object({
  ...customerFields,
  note: noteField,
});

export const userProfileSchema = z.object({
  ...customerFields,
  email: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập email.")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email không hợp lệ."),
});

export type Customer = z.infer<typeof customerSchema>;
export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
export type UserProfileValues = z.infer<typeof userProfileSchema>;
