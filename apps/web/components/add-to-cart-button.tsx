"use client";

import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { MenuItem, Restaurant } from "@/data/menu";
import { useCartStore } from "@/lib/store/cart-store";

type AddToCartButtonProps = {
  menuItem: MenuItem;
  restaurant: Restaurant;
};

export function AddToCartButton({ menuItem, restaurant }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <Button
      size="sm"
      onClick={() => {
        addItem(menuItem, restaurant);
        toast.success("Đã thêm vào giỏ", {
          description: `${menuItem.name} · ${restaurant.name}`,
        });
      }}
    >
      <Plus className="size-4" aria-hidden="true" />
      Thêm vào giỏ
    </Button>
  );
}
