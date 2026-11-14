"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatVnd } from "@/lib/format";
import {
  getCartGroups,
  getCartSubtotal,
  getCartTotal,
  getDeliveryFeeTotal,
  useCartStore,
} from "@/lib/store/cart-store";
import { cn } from "@/lib/utils";

type CartDrawerSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * Loaded on demand by `CartDrawer` so the home page does not ship the dialog
 * package until the shopper opens the cart.
 */
export function CartDrawerSheet({ open, onOpenChange }: CartDrawerSheetProps) {
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const incrementItem = useCartStore((state) => state.incrementItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const removeItem = useCartStore((state) => state.removeItem);

  const groups = useMemo(() => getCartGroups(items), [items]);
  const subtotal = useMemo(() => getCartSubtotal(items), [items]);
  const deliveryFeeTotal = useMemo(() => getDeliveryFeeTotal(items), [items]);
  const grandTotal = useMemo(() => getCartTotal(items), [items]);

  const itemCount = groups.reduce(
    (total, group) =>
      total + group.items.reduce((sum, item) => sum + item.quantity, 0),
    0,
  );
  const isEmpty = groups.length === 0;

  function handleCheckout() {
    onOpenChange(false);
    router.push("/checkout");
  }

  function handleRemove(menuItemId: string, name: string) {
    removeItem(menuItemId);
    toast.success("Đã xóa khỏi giỏ", { description: name });
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full gap-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle>Giỏ hàng</SheetTitle>
          <SheetDescription>
            {isEmpty
              ? "Chưa có món nào trong giỏ"
              : `${itemCount} món từ ${groups.length} nhà hàng`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {!hasHydrated ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Đang tải giỏ hàng…
            </p>
          ) : isEmpty ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ShoppingBag className="size-7" aria-hidden="true" />
              </span>
              <p className="font-semibold">Giỏ hàng đang trống</p>
              <p className="max-w-xs text-sm text-muted-foreground">
                Thêm món từ thực đơn của nhà hàng để bắt đầu đặt hàng.
              </p>
              <Link
                href="/#restaurants"
                onClick={() => onOpenChange(false)}
                className={cn(buttonVariants(), "mt-2")}
              >
                Khám phá nhà hàng
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {groups.map((group) => (
                <section
                  key={group.restaurantId}
                  className="border-b pb-5 last:border-b-0 last:pb-0"
                  aria-label={`Món từ ${group.restaurantName}`}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-sm font-semibold">{group.restaurantName}</h3>
                    <span className="text-xs text-muted-foreground">
                      Phí giao {formatVnd(group.deliveryFee)}
                    </span>
                  </div>

                  <ul className="mt-3 flex flex-col gap-3">
                    {group.items.map((item) => (
                      <li key={item.menuItemId} className="flex gap-3">
                        <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                          <Image
                            src={item.imageUrl}
                            alt={`Ảnh món ${item.name}`}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col gap-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="truncate text-sm font-medium">{item.name}</p>
                            <button
                              type="button"
                              onClick={() => handleRemove(item.menuItemId, item.name)}
                              aria-label={`Xóa ${item.name} khỏi giỏ`}
                              className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="size-4" aria-hidden="true" />
                            </button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {formatVnd(item.price)}
                          </p>
                          <div className="mt-1 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1">
                              <Button
                                variant="outline"
                                size="icon-xs"
                                onClick={() => decrementItem(item.menuItemId)}
                                aria-label={`Bớt một ${item.name}`}
                              >
                                <Minus aria-hidden="true" />
                              </Button>
                              <span
                                className="w-7 text-center text-sm font-medium"
                                aria-live="polite"
                              >
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon-xs"
                                onClick={() => incrementItem(item.menuItemId)}
                                aria-label={`Thêm một ${item.name}`}
                              >
                                <Plus aria-hidden="true" />
                              </Button>
                            </div>
                            <span className="text-sm font-semibold">
                              {formatVnd(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 flex justify-between text-sm">
                    <span className="text-muted-foreground">Tạm tính</span>
                    <span className="font-medium">{formatVnd(group.subtotal)}</span>
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>

        {!isEmpty ? (
          <SheetFooter className="border-t">
            <dl className="flex flex-col gap-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Tạm tính</dt>
                <dd>{formatVnd(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">
                  Phí giao ({groups.length} nhà hàng)
                </dt>
                <dd>{formatVnd(deliveryFeeTotal)}</dd>
              </div>
              <div className="flex justify-between text-base font-semibold">
                <dt>Tổng cộng</dt>
                <dd>{formatVnd(grandTotal)}</dd>
              </div>
            </dl>
            <Button size="lg" className="w-full" onClick={handleCheckout}>
              Thanh toán
            </Button>
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
