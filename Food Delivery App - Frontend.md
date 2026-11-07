# Food Delivery App - Frontend

<aside>
<img src="https://app.notion.com/icons/bullseye_green.svg" alt="https://app.notion.com/icons/bullseye_green.svg" width="40px" />

**Mục tiêu:** Tự dựng lại toàn bộ phần Frontend đã học thành một repo hoàn chỉnh. Repo này sẽ là nền tảng để giúp bạn học các nội dung buổi sau :3

</aside>

## [**Deadline: 8/11/2026](https://calendar.google.com/calendar/render?action=TEMPLATE&text=DL%3A%20Food%20Delivery%20App%20-%20FE&dates=20261108/20261109) |** [Repo Github Template](https://github.com/phantatdung233/wds-food-delivery-template) | [Nộp Bài](https://forms.gle/UEmGY7qczjrw7Mto9)

## Buổi 1 - Nền tảng dự án

### A. Môi trường, Git flow & Repo

**Việc cần làm**

- [ ]  Cài Node.js (LTS), pnpm, Git, Docker Desktop, OpenCode và VS Code.
- [ ]  Tạo repo GitHub (public) có tên `wds-food-delivery-<tên-bạn>`.
- [ ]  Tổ chức monorepo: Frontend ở `apps/web`, Backend ở `apps/api` (chuẩn bị cho buổi 4).
- [ ]  Tạo `README.md` giới thiệu dự án, hướng dẫn cách chạy kèm screenshots.
- [ ]  Tạo `AGENTS.md` cho OpenCode và `.gitignore` chuẩn.
- [ ]  Tạo thư mục `/docs` để lưu PRD (có thể nhờ AI gợi ý).
- [ ]  Viết `docker-compose.yml` cơ bản.
- [ ]  Làm mỗi task trên một nhánh `feat/...` , commit theo Conventional Commits.

**Chuẩn đầu ra (AC)**

- [ ]  `node -v`, `pnpm -v`, `git --version` và `docker -v` không báo lỗi.
- [ ]  Repo trên GitHub đã có code được push với các commit chuẩn
- [ ]  Các nhánh `feat/...` đã được gộp vào `main` qua Pull Request.
- [ ]  Chạy `docker compose up -d`, các service lên bình thường, không báo lỗi.
- [ ]  Thư mục `/docs` có đủ file PRD.
- [ ]  `README.md`, `AGENTS.md` và `.gitignore` có nội dung hợp lý, không để file trống.

### B. Khung giao diện - Tailwind CSS + shadcn/ui

**Việc cần làm**

- [ ]  Khởi tạo project **Next.js 16** trong `apps/web` bằng pnpm.
- [ ]  Setup đầy đủ **Tailwind CSS** và **shadcn/ui**.
- [ ]  Dựng layout khung gồm Header và Footer.
- [ ]  Thêm các component cơ bản của shadcn/ui như Button, Card…
- [ ]  Dựng trang Home tĩnh với dữ liệu cứng (có thể dùng OpenCode và các kỹ thuật AI đã học).

**Chuẩn đầu (AC)**

- [ ]  Chạy `pnpm dev` mở được trang Home, terminal và console không báo lỗi.
- [ ]  Trang Home có Header, Footer, Button và Card hiển thị đúng style.
- [ ]  Layout co giãn hợp lý từ Mobile (khoảng 375px) lên Desktop, không bị tràn ngang.
- [ ]  Trang Home hiển thị dữ liệu tĩnh, chưa cần gọi API.

## Buổi 2 - App Router, Server/Client Components & giỏ hàng Zustand

**Việc cần làm**

- [ ]  Tạo mock data trong `/data`, gồm tối thiểu 3 nhà hàng, mỗi nhà hàng 5 món. Đặt tên field gần với schema ở Buổi 4 (`id`, `name`, `price`, `imageUrl`, `restaurantId`...).
- [ ]  Làm trang chủ hiển thị danh sách nhà hàng bằng **Server Component**.
- [ ]  Tạo các trang `/restaurant/[id]` hiển thị danh sách món ăn kèm hình ảnh và giá.
- [ ]  Dùng nested layout, kèm `loading.tsx`, `error.tsx` và trang `not-found`.
- [ ]  Chỉ dùng `"use client"` ở những component cần tương tác như nút thêm món và giỏ hàng.
- [ ]  Tạo Cart Store bằng **Zustand** với action thêm, xóa, tăng giảm số lượng, thêm selector tính tổng số lượng và tổng tiền.
- [ ]  Bật **Zustand Persist** để lưu giỏ hàng vào LocalStorage.
- [ ]  Làm Cart Drawer để xem trước đơn hàng.
- [ ]  Làm Floating cart badge hiển thị tổng số lượng món.
- [ ]  Hiện Toast (Sonner) mỗi khi thêm hoặc bớt món.

**Chuẩn đầu ra (AC)**

- [ ]  Trang chủ hiển thị đủ nhà hàng từ mock data, bấm vào từng nhà hàng thì sang đúng `/restaurant/[id]`.
- [ ]  Trang `/restaurant/[id]` hiển thị đầy đủ các món kèm hình ảnh và giá.
- [ ]  Nhập một id không tồn tại thì hiện trang not-found.
- [ ]  Thêm món rồi reload trang, giỏ hàng vẫn còn nguyên.
- [ ]  Thêm hoặc bớt món thì badge đổi số ngay lập tức và có Toast xuất hiện.
- [ ]  Giao diện responsive 100% và điểm Lighthouse Performance trên 85.

## Buổi 3 - Form Checkout với React Hook Form, Zod & Mock API

**Việc cần làm**

- [ ]  Tạo trang `/checkout`, có nút dẫn từ Cart Drawer sang.
- [ ]  Viết Zod schema cho form gồm họ tên, SĐT Việt Nam, địa chỉ giao hàng và ghi chú.
- [ ]  Dùng React Hook Form kết hợp Zod resolver để validate trước khi submit.
- [ ]  Viết thông báo lỗi tiếng Việt rõ ràng cho từng trường.
- [ ]  Dựng mock API đặt hàng bằng MSW hoặc Route Handler.
- [ ]  Xử lý trạng thái submit: hiện spinner và vô hiệu hóa nút khi đang gửi.
- [ ]  Sau khi submit thành công, hiện màn hình xác nhận kèm mã đơn giả lập và xóa giỏ hàng.
- [ ]  Tự viết thêm Zod schema cho User Profile.

**Chuẩn đầu ra (AC)**

- [ ]  Bỏ trống hoặc nhập sai họ tên, SĐT hay địa chỉ thì form không cho submit.
- [ ]  Mỗi trường nhập sai hiện đúng một thông báo lỗi tiếng Việt ngay bên dưới trường đó.
- [ ]  SĐT hợp lệ (ví dụ `0901234567`) qua được validate, không hợp lệ thì bị báo lỗi.
- [ ]  Bấm đặt hàng thấy spinner, sau đó hiện màn hình xác nhận có mã đơn giả lập.
- [ ]  Quay lại xem thì giỏ hàng đã được xóa sạch.

## Tự kiểm tra

Sau khi hoàn thành 3 buổi, dùng bộ check có sẵn trong template để kiểm tra các mục chuẩn đầu ra. Đọc `README-CHECK.md` để biết cách sử dụng.