import Link from "next/link";
import { SearchX } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center px-4 py-20 text-center sm:px-6">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <SearchX className="size-7" aria-hidden="true" />
      </span>
      <p className="mt-5 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
        Lỗi 404
      </p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
        Trang không tồn tại
      </h1>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">
        Đường dẫn bạn mở không có trong WDS Food. Hãy quay về trang chủ và chọn món từ
        danh sách nhà hàng.
      </p>
      <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-6")}>
        Về trang chủ
      </Link>
    </div>
  );
}
