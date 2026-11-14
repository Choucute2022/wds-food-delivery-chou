import { NextResponse } from "next/server";

import { createOrders } from "@/lib/orders";
import { orderRequestSchema } from "@/lib/schemas/order";

const ORDER_DELAY_MS = 400;

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Dữ liệu gửi lên không phải JSON hợp lệ." },
      { status: 400 },
    );
  }

  const parsed = orderRequestSchema.safeParse(payload);

  if (!parsed.success) {
    const errors: Record<string, string> = {};

    for (const issue of parsed.error.issues) {
      const path = issue.path.join(".") || "request";
      errors[path] ??= issue.message;
    }

    return NextResponse.json(
      {
        message: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ.",
        errors,
      },
      { status: 400 },
    );
  }

  const result = createOrders(parsed.data.items);

  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: 400 });
  }

  await new Promise((resolve) => setTimeout(resolve, ORDER_DELAY_MS));

  return NextResponse.json({ orders: result.orders }, { status: 201 });
}
