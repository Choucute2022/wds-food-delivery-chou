# WDS Food Delivery — Agent Guide

## Project

Monorepo cho ứng dụng đặt món giao hàng của khoá WDS. Frontend ở `apps/web` (Next.js 16, App Router). `apps/api` là placeholder cho Buổi 4. Dữ liệu hiện tại là mock trong bộ nhớ; chưa có backend hay database thật.

## Commands

Chạy từ thư mục gốc repo:

| Lệnh | Việc |
|---|---|
| `pnpm install` | Cài dependency cho toàn workspace (lockfile ở root) |
| `pnpm dev` | Chạy Next.js dev server tại `apps/web` |
| `pnpm build` | Build production |
| `pnpm lint` | ESLint |
| `pnpm check` | Chạy checker của khoá học |
| `pnpm check:build` | Checker + build |
| `docker compose up -d` | Bật Postgres 16 (dùng cho Buổi 4) |

## Structure

```
apps/
  web/            Next.js 16 App Router (app/, components/, lib/, data/)
  api/            Placeholder, implement ở Buổi 4
docs/
  PRD.md          Yêu cầu sản phẩm
  architecture.md Route map, ERD, luồng đặt hàng
  adr/            Architecture Decision Records
  agents/         Cấu hình cho agent (issue tracker, triage, domain docs)
scripts/          check-repo.mjs (checker của khoá học)
```

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui · Zustand (persist) · React Hook Form · Zod · Sonner · Postgres 16 (Docker).

## Conventions

- **Ngôn ngữ**: UI và thông báo lỗi tiếng Việt; identifier, tên file và thuật ngữ trong code dùng tiếng Anh. Xem `GLOSSARY.md`.
- **Server/Client**: mặc định Server Component. Chỉ thêm `"use client"` ở component cần state, event handler hoặc API trình duyệt.
- **Tiền**: số nguyên VND; hiển thị bằng `Intl.NumberFormat("vi-VN")` kèm `₫`.
- **Giỏ hàng**: đa nhà hàng, lưu mảng phẳng `CartItem` kèm snapshot; nhóm theo nhà hàng là derived. Checkout tạo một `Order` cho mỗi `Restaurant`. Xem `docs/adr/0001-multi-restaurant-cart.md`.
- **Dữ liệu đặt hàng**: client chỉ gửi `menuItemId` + `quantity`; server tra mock data và tự tính giá/phí.
- **Git**: Conventional Commits. Mỗi buổi một nhánh `feat/...`, gộp vào `main` qua Pull Request.
- **Next.js 16**: `apps/web/AGENTS.md` do `next dev` tự sinh và sẽ được ghi lại; giữ nguyên block Next.js trong file đó.

## Domain docs

- `GLOSSARY.md` — thuật ngữ miền nghiệp vụ.
- `docs/adr/` — quyết định kiến trúc.
- `docs/agents/domain.md` — quy tắc đọc tài liệu miền.
- `docs/PRD.md`, `docs/architecture.md` — yêu cầu và sơ đồ.

## Agent skills

### Issue tracker

GitHub Issues in `Choucute2022/wds-food-delivery-chou`, via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: root `GLOSSARY.md` and `docs/adr/`. See `docs/agents/domain.md`.
