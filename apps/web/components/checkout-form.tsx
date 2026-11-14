"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ShoppingBag } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatVnd } from "@/lib/format";
import {
  checkoutFormSchema,
  type CheckoutFormValues,
} from "@/lib/schemas/checkout";
import {
  getCartGroups,
  getCartSubtotal,
  getCartTotal,
  getDeliveryFeeTotal,
  useCartStore,
} from "@/lib/store/cart-store";
import { cn } from "@/lib/utils";

type OrdersResponse = {
  orders?: Array<{ code: string }>;
  message?: string;
};

export function CheckoutForm() {
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const clearCart = useCartStore((state) => state.clearCart);

  const groups = useMemo(() => getCartGroups(items), [items]);
  const subtotal = useMemo(() => getCartSubtotal(items), [items]);
  const deliveryFeeTotal = useMemo(() => getDeliveryFeeTotal(items), [items]);
  const grandTotal = useMemo(() => getCartTotal(items), [items]);

  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      note: "",
    },
  });

  async function onSubmit(values: CheckoutFormValues) {
    setSubmitError(null);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
          })),
          customer: {
            fullName: values.fullName,
            phone: values.phone,
            address: values.address,
          },
          note: values.note || undefined,
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | OrdersResponse
        | null;

      if (!response.ok || !data?.orders?.length) {
        setSubmitError(
          data?.message ??
            "Không thể đặt hàng lúc này. Vui lòng kiểm tra lại thông tin và thử lại.",
        );
        return;
      }

      // Only clear the cart after the API confirms the order.
      clearCart();

      const orderCodes = data.orders.map((order) => order.code).join(",");
      router.push(`/checkout/success?codes=${encodeURIComponent(orderCodes)}`);
    } catch {
      setSubmitError(
        "Không kết nối được tới hệ thống đặt hàng. Vui lòng thử lại.",
      );
    }
  }

  if (!hasHydrated) {
    return (
      <p className="py-16 text-center text-sm text-muted-foreground">
        Đang tải giỏ hàng…
      </p>
    );
  }

  if (items.length === 0) {
    return (
      <Card className="mx-auto mt-8 max-w-xl">
        <CardHeader className="items-center text-center">
          <span className="mb-2 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <ShoppingBag className="size-7" aria-hidden="true" />
          </span>
          <CardTitle className="text-xl">Giỏ hàng đang trống</CardTitle>
          <CardDescription>
            Bạn cần thêm món trước khi thanh toán. Hãy chọn một nhà hàng và thêm món
            vào giỏ.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Link href="/#restaurants" className={cn(buttonVariants({ size: "lg" }))}>
            Khám phá nhà hàng
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_22rem]">
      <Card>
        <CardHeader>
          <CardTitle>Thông tin giao hàng</CardTitle>
          <CardDescription>
            Một địa chỉ dùng chung cho tất cả {groups.length} nhà hàng trong giỏ.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="fullName">Họ và tên</Label>
              <Input
                id="fullName"
                autoComplete="name"
                placeholder="Nguyễn Văn A"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
                {...register("fullName")}
              />
              {errors.fullName ? (
                <p id="fullName-error" className="text-sm text-destructive">
                  {errors.fullName.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="0901234567"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                {...register("phone")}
              />
              {errors.phone ? (
                <p id="phone-error" className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Dùng dạng 0xxxxxxxxx hoặc +84xxxxxxxxx.
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="address">Địa chỉ giao hàng</Label>
              <Input
                id="address"
                autoComplete="street-address"
                placeholder="Số nhà, đường, phường, quận"
                aria-invalid={Boolean(errors.address)}
                aria-describedby={errors.address ? "address-error" : undefined}
                {...register("address")}
              />
              {errors.address ? (
                <p id="address-error" className="text-sm text-destructive">
                  {errors.address.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="note">Ghi chú (không bắt buộc)</Label>
              <Textarea
                id="note"
                rows={3}
                placeholder="Ví dụ: ít cay, gọi trước khi giao"
                aria-invalid={Boolean(errors.note)}
                aria-describedby={errors.note ? "note-error" : undefined}
                {...register("note")}
              />
              {errors.note ? (
                <p id="note-error" className="text-sm text-destructive">
                  {errors.note.message}
                </p>
              ) : null}
            </div>

            {submitError ? (
              <p
                role="alert"
                className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
              >
                {submitError}
              </p>
            ) : null}

            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Đang đặt hàng…
                </>
              ) : (
                "Đặt hàng"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="lg:sticky lg:top-24">
        <CardHeader>
          <CardTitle>Đơn hàng của bạn</CardTitle>
          <CardDescription>
            Mỗi nhà hàng nhận một đơn riêng với mã riêng.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {groups.map((group) => (
            <section key={group.restaurantId} className="flex flex-col gap-2">
              <h3 className="text-sm font-semibold">{group.restaurantName}</h3>
              <ul className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <li
                    key={item.menuItemId}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span className="relative size-10 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </span>
                    <span className="min-w-0 flex-1 truncate">
                      {item.quantity} × {item.name}
                    </span>
                    <span className="shrink-0 font-medium">
                      {formatVnd(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Tạm tính</span>
                <span>{formatVnd(group.subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Phí giao</span>
                <span>{formatVnd(group.deliveryFee)}</span>
              </div>
            </section>
          ))}
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <dl className="flex w-full flex-col gap-1.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Tạm tính</dt>
              <dd>{formatVnd(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Phí giao</dt>
              <dd>{formatVnd(deliveryFeeTotal)}</dd>
            </div>
            <div className="flex justify-between text-base font-semibold">
              <dt>Tổng cộng</dt>
              <dd>{formatVnd(grandTotal)}</dd>
            </div>
          </dl>
        </CardFooter>
      </Card>
    </div>
  );
}
