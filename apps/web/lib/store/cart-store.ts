import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  getRestaurantById,
  type MenuItem,
  type Restaurant,
} from "@/data/menu";

export type CartItem = {
  menuItemId: string;
  restaurantId: string;
  restaurantName: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

export type RestaurantCartGroup = {
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
};

type CartState = {
  items: CartItem[];
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  addItem: (menuItem: MenuItem, restaurant: Restaurant) => void;
  removeItem: (menuItemId: string) => void;
  incrementItem: (menuItemId: string) => void;
  decrementItem: (menuItemId: string) => void;
  clearCart: () => void;
};

/**
 * The cart is a flat array of snapshot items and may hold dishes from several
 * restaurants. Grouping is always derived; see ADR-0001.
 */
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
      addItem: (menuItem, restaurant) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.menuItemId === menuItem.id,
          );

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.menuItemId === menuItem.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }

          const cartItem: CartItem = {
            menuItemId: menuItem.id,
            restaurantId: restaurant.id,
            restaurantName: restaurant.name,
            name: menuItem.name,
            price: menuItem.price,
            imageUrl: menuItem.imageUrl,
            quantity: 1,
          };

          return { items: [...state.items, cartItem] };
        }),
      removeItem: (menuItemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.menuItemId !== menuItemId),
        })),
      incrementItem: (menuItemId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.menuItemId === menuItemId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        })),
      decrementItem: (menuItemId) =>
        set((state) => ({
          items: state.items.flatMap((item) => {
            if (item.menuItemId !== menuItemId) return [item];
            if (item.quantity <= 1) return [];
            return [{ ...item, quantity: item.quantity - 1 }];
          }),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "wds-food-cart",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export function selectTotalQuantity(state: CartState): number {
  return state.items.reduce((total, item) => total + item.quantity, 0);
}

export function getCartGroups(items: CartItem[]): RestaurantCartGroup[] {
  const groups = new Map<string, RestaurantCartGroup>();

  for (const item of items) {
    const group = groups.get(item.restaurantId);

    if (group) {
      group.items.push(item);
      group.subtotal += item.price * item.quantity;
      continue;
    }

    groups.set(item.restaurantId, {
      restaurantId: item.restaurantId,
      restaurantName: item.restaurantName,
      items: [item],
      subtotal: item.price * item.quantity,
      deliveryFee: getRestaurantById(item.restaurantId)?.deliveryFee ?? 0,
    });
  }

  return [...groups.values()];
}

export function getCartSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getDeliveryFeeTotal(items: CartItem[]): number {
  return getCartGroups(items).reduce(
    (total, group) => total + group.deliveryFee,
    0,
  );
}

export function getCartTotal(items: CartItem[]): number {
  return getCartSubtotal(items) + getDeliveryFeeTotal(items);
}
