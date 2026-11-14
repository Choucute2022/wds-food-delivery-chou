"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RestaurantError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-16 text-center sm:px-6">
      <Card className="w-full">
        <CardHeader className="items-center">
          <span className="mb-2 flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="size-6" aria-hidden="true" />
          </span>
          <CardTitle className="text-xl">Không tải được nhà hàng</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-5">
          <p className="text-sm text-muted-foreground">
            Đã có lỗi khi tải thực đơn. Bạn thử lại, hoặc quay về trang chủ để chọn nhà
            hàng khác.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button onClick={() => retry()}>
              <RotateCcw className="size-4" aria-hidden="true" />
              Thử lại
            </Button>
            <Link
              href="/"
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Về trang chủ
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
