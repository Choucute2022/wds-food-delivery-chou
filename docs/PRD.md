# PRD — WDS Food Delivery (Frontend, Buổi 1–3)

## 1. Tổng quan

WDS Food Delivery là một ứng dụng đặt món ăn giao tận nơi, xây dựng trong khuôn khổ khoá học WDS. Phiên bản này chỉ gồm frontend Next.js 16, dùng mock data; backend thật sẽ được làm ở Buổi 4.

Repo là monorepo: frontend ở `apps/web`, backend ở `apps/api` (placeholder). Mục tiêu là một repo hoàn chỉnh, chạy được, có checker và CI xanh, đồng thời là nền tảng cho các buổi sau.

## 2. Mục tiêu

- Người dùng xem được danh sách nhà hàng và menu, thêm món vào giỏ từ nhiều nhà hàng, đặt hàng và nhận mã đơn.
- Giỏ hàng tồn tại qua reload, phản hồi tức thì bằng badge và toast.
- Form checkout validate chặt chẽ với thông báo lỗi tiếng Việt.
- Toàn bộ chuẩn đầu ra của Buổi 1–3 trong đề bài đạt mức `[PASS]` trên checker; Lighthouse trang chủ ≥ 0.85; CI xanh.

## 3. Người dùng và nhu cầu

- **Diner (khách đặt món)**: muốn tìm nhà hàng, xem món kèm ảnh/giá, chọn món cho nhiều người, nhập thông tin giao hàng một lần và nhận mã đơn.
- **Developer/sinh viên**: muốn repo rõ ràng, có tài liệu, checker, CI và lịch sử commit/PR đúng chuẩn.

## 4. Phạm vi

### Buổi 1 — Nền tảng và khung giao diện

- Monorepo, README, AGENTS.md, .gitignore, Docker Compose (Postgres), thư mục tài liệu.
- Next.js 16 + Tailwind CSS 4 + shadcn/ui.
- Header, Footer, Button, Card; trang Home tĩnh với dữ liệu cứng; responsive 375px trở lên.

### Buổi 2 — Dữ liệu, routing và giỏ hàng

- Mock data 3 nhà hàng × 5 món, field gần schema Buổi 4.
- Home là Server Component; `/restaurant/[id]` hiển thị món; `loading.tsx`, `error.tsx`, `not-found.tsx`; gọi `notFound()` với id không tồn tại.
- Chỉ component tương tác dùng `"use client"`.
- Giỏ hàng Zustand: thêm, xóa, tăng/giảm, selector tổng số lượng và tổng tiền.
- Persist LocalStorage; Cart Drawer; floating badge; toast Sonner.
- Giỏ **đa nhà hàng**, nhóm món theo nhà hàng.

### Buổi 3 — Checkout

- Trang `/checkout` mở từ Cart Drawer.
- Zod schema + React Hook Form + zodResolver; lỗi tiếng Việt dưới từng trường.
- SĐT Việt Nam hợp lệ: `0xxxxxxxxx` hoặc `+84xxxxxxxxx`.
- Mock API đặt hàng bằng Route Handler.
- Spinner/khóa nút khi submit; xác nhận kèm Order code; xóa giỏ sau thành công.
- Zod schema User Profile (chỉ schema).

## 5. Luồng chính

1. Người dùng mở `/`, xem danh sách Restaurant.
2. Chọn Restaurant → `/restaurant/[id]`, xem MenuItem kèm ảnh và giá.
3. Bấm thêm món → CartItem vào Cart, badge và toast cập nhật. Có thể thêm từ Restaurant khác mà không mất món cũ.
4. Mở Cart Drawer → xem nhóm theo Restaurant, Subtotal, Delivery fee, tổng cộng; tăng/giảm/xóa.
5. Bấm “Thanh toán” → `/checkout`; nếu Cart trống thì hiện trạng thái trống.
6. Điền Customer (họ tên, SĐT, địa chỉ, ghi chú) → submit.
7. Hệ thống tách Cart thành một Order cho mỗi Restaurant, trả Order code.
8. Xóa Cart, chuyển tới `/checkout/success?codes=...`, hiển thị mã đơn; refresh vẫn còn mã.

## 6. Yêu cầu chức năng chi tiết

| Mã | Yêu cầu |
|---|---|
| FR-01 | Home render phía server, không có `"use client"`. |
| FR-02 | 3 nhà hàng, mỗi nhà hàng 5 món; có `id`, `name`, `price`, `imageUrl`, `restaurantId`. |
| FR-03 | `/restaurant/[id]` hiển thị đủ món; id sai → not-found. |
| FR-04 | Giỏ hàng giữ được khi reload, không lệch hydration. |
| FR-05 | Badge hiển thị tổng số lượng món, luôn hiển thị kể cả 0. |
| FR-06 | Drawer nhóm theo nhà hàng, có subtotal và phí giao từng nhà hàng. |
| FR-07 | Thêm/bớt món hiện toast. |
| FR-08 | Checkout chặn submit khi họ tên, SĐT, địa chỉ sai; mỗi trường một lỗi tiếng Việt. |
| FR-09 | SĐT `0901234567` hợp lệ, `12345` không hợp lệ. |
| FR-10 | Submit hiện spinner, khóa nút, gọi `POST /api/orders`. |
| FR-11 | API tách một Order mỗi Restaurant, tự tính lại giá và phí từ mock data. |
| FR-12 | Xác nhận hiển thị Order code, chịu được refresh. |
| FR-13 | Cart chỉ bị xóa sau khi API trả 2xx. |

## 7. Mô hình dữ liệu (tóm tắt)

- **Restaurant**: id, name, description, imageUrl, rating, deliveryFee, deliveryTimeMinutes, tags.
- **MenuItem**: id, restaurantId, name, description, price, imageUrl, category.
- **CartItem**: menuItemId, restaurantId, restaurantName, name, price, imageUrl, quantity.
- **Order**: code, restaurantId, restaurantName, lines, subtotal, deliveryFee, total.

Tiền là số nguyên VND, hiển thị bằng `Intl.NumberFormat("vi-VN")` kèm `₫`.

## 8. Yêu cầu phi chức năng

- **Responsive**: dùng được từ 375px, không tràn ngang.
- **Hiệu năng**: Lighthouse Performance trang chủ ≥ 0.85.
- **Khả dụng**: ảnh có alt, điều khiển bằng bàn phím được, drawer đóng bằng Esc.
- **Ngôn ngữ**: giao diện và thông báo lỗi tiếng Việt; mã nguồn và thuật ngữ dùng tiếng Anh.
- **Chất lượng**: `pnpm lint`, `pnpm build`, checker không lỗi; commit theo Conventional Commits; có PR.

## 9. Tiêu chí nghiệm thu

- Checker của khoá học (`node scripts/check-repo.mjs --build`) trả về 0 `[FAIL]`.
- Lighthouse CI xanh trên GitHub Actions.
- Checklist thủ công trong README-CHECK.md được kiểm tra đầy đủ.
- Không commit `node_modules` hoặc `.env`.

## 10. Ngoài phạm vi

- Backend thật, database schema, `apps/api` (Buổi 4).
- Đăng nhập, lịch sử đơn, theo dõi giao hàng, thanh toán thật.
- Topping/size, khuyến mãi, freeship, đa tiền tệ.
- Kiểm thử unit/E2E tự động; i18n chuyển ngữ; dark-mode toggle.

## 11. Rủi ro và giả định

- **Giỏ đa nhà hàng** khác thói quen của các app giao đồ ăn; đã ghi nhận trong ADR-0001. Hệ quả là checkout trả nhiều Order code.
- Mock data và API chạy trong cùng Next.js; không có tính bền vững dữ liệu đơn hàng.
- Ảnh minh hoạ là ảnh local, không phụ thuộc mạng khi build/CI.
- Deadline: 8/11/2026.

## 12. Tài liệu liên quan

- `GLOSSARY.md` — thuật ngữ miền nghiệp vụ.
- `docs/architecture.md` — sơ đồ route, ERD, luồng đặt hàng.
- `docs/adr/0001-multi-restaurant-cart.md` — quyết định giỏ đa nhà hàng.
- `README-CHECK.md` — cách chạy checker.
