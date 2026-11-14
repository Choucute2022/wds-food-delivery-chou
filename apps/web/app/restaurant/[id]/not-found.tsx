import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function RestaurantNotFound() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center px-4 py-20 text-center sm:px-6">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <UtensilsCrossed className="size-7" aria-hidden="true" />
      </span>
      <h1 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
        Không tìm thấy nhà hàng
      </h1>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">
        Nhà hàng bạn mở không tồn tại hoặc đã ngừng nhận đơn. Hãy chọn một nhà hàng khác
        trong danh sách.
      </p>
      <Link href="/#restaurants" className={cn(buttonVariants({ size: "lg" }), "mt-6")}>
        Xem danh sách nhà hàng
      </Link>
    </div>
  );
}
