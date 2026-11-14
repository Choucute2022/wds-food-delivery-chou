import { getMenuItemById, getRestaurantById } from "@/data/menu";
import type { OrderLineInput } from "@/lib/schemas/order";

export type OrderLine = {
  menuItemId: string;
  name: string;
  unitPrice: number;
  quantity: number;
};

export type Order = {
  code: string;
  restaurantId: string;
  restaurantName: string;
  lines: OrderLine[];
  subtotal: number;
  deliveryFee: number;
  total: number;
};

export type CreateOrdersResult =
  | { ok: true; orders: Order[] }
  | { ok: false; message: string };

type GroupedOrder = {
  restaurantName: string;
  deliveryFee: number;
  lines: OrderLine[];
};

function createOrderCode(): string {
  const day = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = crypto.randomUUID().slice(0, 4).toUpperCase();
  return `FD-${day}-${suffix}`;
}

/**
 * Turns the client's `{ menuItemId, quantity }` list into one Order per
 * restaurant. Names, prices and delivery fees always come from the mock data,
 * never from the request. See ADR-0001.
 */
export function createOrders(
  items: OrderLineInput[],
): CreateOrdersResult {
  const groups = new Map<string, GroupedOrder>();

  for (const { menuItemId, quantity } of items) {
    const menuItem = getMenuItemById(menuItemId);

    if (!menuItem) {
      return {
        ok: false,
        message: `Món "${menuItemId}" không có trong thực đơn.`,
      };
    }

    const restaurant = getRestaurantById(menuItem.restaurantId);

    if (!restaurant) {
      return {
        ok: false,
        message: `Không tìm thấy nhà hàng của món "${menuItem.name}".`,
      };
    }

    const group = groups.get(restaurant.id) ?? {
      restaurantName: restaurant.name,
      deliveryFee: restaurant.deliveryFee,
      lines: [],
    };

    group.lines.push({
      menuItemId: menuItem.id,
      name: menuItem.name,
      unitPrice: menuItem.price,
      quantity,
    });
    groups.set(restaurant.id, group);
  }

  const orders = [...groups.entries()].map(([restaurantId, group]) => {
    const subtotal = group.lines.reduce(
      (total, line) => total + line.unitPrice * line.quantity,
      0,
    );

    return {
      code: createOrderCode(),
      restaurantId,
      restaurantName: group.restaurantName,
      lines: group.lines,
      subtotal,
      deliveryFee: group.deliveryFee,
      total: subtotal + group.deliveryFee,
    };
  });

  return { ok: true, orders };
}
