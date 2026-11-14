import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ReceiptText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Đặt hàng thành công",
  description: "Mã đơn hàng cho từng nhà hàng trong lần đặt này.",
};

function parseOrderCodes(value: string | string[] | undefined): string[] {
  const raw = Array.isArray(value) ? value.join(",") : (value ?? "");

  return raw
    .split(",")
    .map((code) => code.trim())
    .filter(Boolean);
}

export default async function CheckoutSuccessPage({
  searchParams,
}: PageProps<"/checkout/success">) {
  const params = await searchParams;
  const orderCodes = parseOrderCodes(params.codes);

  if (orderCodes.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-xl flex-col items-center px-4 py-20 text-center sm:px-6">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
          <ReceiptText className="size-7" aria-hidden="true" />
        </span>
        <h1 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
          Chưa có mã đơn hàng
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Trang này cần mã đơn để hiển thị. Nếu bạn vừa đặt hàng, hãy kiểm tra lại giỏ
          hàng hoặc liên hệ hotline 1900 0000.
        </p>
        <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-6")}>
          Về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6">
      <div className="flex flex-col items-center text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="size-8" aria-hidden="true" />
        </span>
        <h1 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
          Đặt hàng thành công
        </h1>
        <p className="mt-2 max-w-lg text-sm text-muted-foreground sm:text-base">
          Đơn của bạn đã được gửi tới từng nhà hàng. Mỗi nhà hàng có một mã riêng để
          bạn theo dõi.
        </p>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Mã đơn hàng</CardTitle>
          <CardDescription>
            Lưu lại các mã này. Trang vẫn hiển thị mã khi bạn tải lại.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-3">
            {orderCodes.map((orderCode) => (
              <li
                key={orderCode}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-muted/30 px-4 py-3"
              >
                <span className="text-sm text-muted-foreground">Mã đơn</span>
                <Badge variant="outline" className="font-mono text-sm">
                  {orderCode}
                </Badge>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex-col gap-3 sm:flex-row sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Cần hỗ trợ? Gọi hotline 1900 0000.
          </p>
          <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
            Tiếp tục đặt món
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
