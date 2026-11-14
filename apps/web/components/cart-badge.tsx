"use client";

import { ShoppingBag } from "lucide-react";

import { selectTotalQuantity, useCartStore } from "@/lib/store/cart-store";

export function CartBadge() {
  const totalQuantity = useCartStore(selectTotalQuantity);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const count = hasHydrated ? totalQuantity : 0;

  return (
    <span className="flex items-center gap-2">
      <ShoppingBag className="size-5" aria-hidden="true" />
      <span className="text-sm font-semibold">Giỏ hàng</span>
      <span
        aria-label={`${count} món trong giỏ`}
        className="flex min-w-6 items-center justify-center rounded-full bg-primary-foreground/20 px-1.5 py-0.5 text-xs font-bold"
      >
        {count}
      </span>
    </span>
  );
}
