import type { Metadata } from "next";

import { CheckoutForm } from "@/components/checkout-form";

export const metadata: Metadata = {
  title: "Thanh toán",
  description:
    "Nhập thông tin giao hàng một lần cho tất cả nhà hàng trong giỏ của bạn.",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Thanh toán</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
        Kiểm tra lại đơn hàng, điền thông tin giao hàng và đặt món. Mỗi nhà hàng sẽ
        nhận một đơn riêng.
      </p>

      <CheckoutForm />
    </div>
  );
}
