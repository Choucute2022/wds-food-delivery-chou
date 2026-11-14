import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Trang chủ" },
  { href: "#restaurants", label: "Nhà hàng" },
  { href: "#dishes", label: "Món nổi bật" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md text-lg font-semibold tracking-tight"
        >
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <UtensilsCrossed className="size-5" aria-hidden="true" />
          </span>
          <span>WDS Food</span>
        </Link>

        <nav aria-label="Điều hướng chính" className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                item.href === "#dishes" && "hidden sm:block",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#restaurants"
            className={cn(buttonVariants({ size: "lg" }), "ml-1 hidden sm:inline-flex")}
          >
            Đặt món
          </Link>
        </nav>
      </div>
    </header>
  );
}
