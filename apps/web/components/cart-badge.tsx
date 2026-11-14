"use client";

import { ShoppingBag } from "lucide-react";

import { useCartStore, selectTotalQuantity } from "@/lib/store/cart-store";

export function CartBadge() {
  const totalQuantity = useCartStore(selectTotalQuantity);
  const hasHydrated = useCartStore((state) => state.hasHydrated);

  return (
    <div
      className="fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-primary-foreground shadow-lg sm:right-6 sm:bottom-6"
      aria-label={`Giỏ hàng, ${totalQuantity} món`}
      role="status"
    >
      <ShoppingBag className="size-5" aria-hidden="true" />
      <span className="text-sm font-semibold">Giỏ hàng</span>
      <span className="flex min-w-6 items-center justify-center rounded-full bg-primary-foreground/20 px-1.5 py-0.5 text-xs font-bold">
        {hasHydrated ? totalQuantity : 0}
      </span>
    </div>
  );
}
