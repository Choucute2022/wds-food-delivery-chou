# Bộ tự kiểm tra bài Food Delivery – Frontend (Buổi 1–3)

## Cách dùng
Chạy ở thư mục gốc của repo:

```bash
node scripts/check-repo.mjs            # kiểm tra nhanh
node scripts/check-repo.mjs --build    # kiểm tra và chạy thêm pnpm build
node scripts/check-repo.mjs --docker   # chạy docker compose up -d rồi down
```

Ý nghĩa kết quả:

- `[PASS]` đã đạt.
- `[FAIL]` bắt buộc phải sửa.
- `[WARN]` script check qua tên file hoặc nội dung code, bạn nên tự kiểm tra lại.

Khi push lên GitHub, workflow `Kiểm tra bài` sẽ tự chạy script và Lighthouse CI. Tick xanh nghĩa là đạt, tick đỏ thì bấm vào xem dòng nào lỗi.

## Script kiểm tra những gì

| Nhóm | Nội dung |
|---|---|
| Môi trường | Node.js (từ 20), pnpm, Git, Docker |
| Repo & Git | `apps/web`, README, AGENTS.md, .gitignore, `/docs`, remote GitHub, không commit node_modules/.env, commit theo Conventional Commits, dấu vết Pull Request, docker compose hợp lệ |
Buổi 1 | Next.js 16, Tailwind, shadcn/ui, Button, Card, Header, Footer, layout, trang Home |
| Buổi 2 | Trang chủ là Server Component, route `/restaurant/[id]`, loading, error, not-found, mock data, Zustand Persist, Drawer, badge, Sonner |
| Buổi 3 | `/checkout`, React Hook Form, Zod, zodResolver, regex SĐT, lỗi tiếng Việt, mock API, spinner, mã đơn, xóa giỏ hàng |
| Nộp bài | README có cách chạy, ảnh chụp, giải thích Server/Client |
| Lighthouse CI | Performance trên 85 ở trang chủ (chạy trên GitHub Actions) |

## Giới hạn của script

- Script chỉ đọc file, git và chạy lệnh, Phần đó nằm trong danh sách kiểm tra tay ở cuối kết quả.
- Các mục `[WARN]` có thể báo nhầm nếu học viên đặt tên khác quy ước.
- Lighthouse CI chỉ đo ở trang chủ `/`. Muốn đo thêm trang khác, thêm URL vào `url` trong `lighthouserc.json`.
