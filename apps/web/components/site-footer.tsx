import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t bg-muted/40">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <UtensilsCrossed className="size-5" aria-hidden="true" />
            </span>
            WDS Food
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Đặt món từ nhiều nhà hàng trong một lần, giao tận cửa. Dự án học tập của
            khoá WDS.
          </p>
        </div>

        <nav aria-label="Khám phá" className="text-sm">
          <h2 className="font-semibold">Khám phá</h2>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li>
              <Link className="hover:text-foreground" href="/">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link className="hover:text-foreground" href="#restaurants">
                Nhà hàng
              </Link>
            </li>
            <li>
              <Link className="hover:text-foreground" href="#dishes">
                Món nổi bật
              </Link>
            </li>
          </ul>
        </nav>

        <div className="text-sm">
          <h2 className="font-semibold">Hỗ trợ</h2>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li>Hotline: 1900 0000</li>
            <li>Email: hello@wdsfood.vn</li>
            <li>8:00 – 22:00 mỗi ngày</li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 WDS Food. Dự án học tập, không phải dịch vụ thật.</p>
          <p>Made with Next.js &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
