"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import { CartBadge } from "@/components/cart-badge";
import { selectTotalQuantity, useCartStore } from "@/lib/store/cart-store";

const CartDrawerSheet = dynamic(
  () =>
    import("@/components/cart-drawer-sheet").then((module) => module.CartDrawerSheet),
  { ssr: false },
);

/**
 * The trigger is tiny and always mounted. The dialog itself (Base UI + sheet
 * styles) is loaded on demand, so it stays out of the initial page bundle.
 */
export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const itemCount = useCartStore(selectTotalQuantity);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Mở giỏ hàng, ${itemCount} món`}
        aria-haspopup="dialog"
        className="fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:right-6 sm:bottom-6"
      >
        <CartBadge />
      </button>

      {open ? <CartDrawerSheet open={open} onOpenChange={setOpen} /> : null}
    </>
  );
}
