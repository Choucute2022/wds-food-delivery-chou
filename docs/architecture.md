# Architecture — WDS Food Delivery (Frontend)

## 1. Bối cảnh

Monorepo gồm `apps/web` (Next.js 16, App Router) và `apps/api` (placeholder cho Buổi 4). Dữ liệu nhà hàng/món ăn là mock data trong bộ nhớ; đơn hàng được tạo bởi Route Handler và không lưu trữ.

```mermaid
flowchart LR
  Browser["Trình duyệt (Diner)"] -->|HTTP| Next["apps/web — Next.js 16"]
  Next -->|Server Components| Data["Mock data module"]
  Next -->|"POST /api/orders"| Route["Route Handler"]
  Route -->|tra cứu| Data
  Browser -.->|LocalStorage| Cart["Zustand cart store"]
  Dev["Developer"] -->|"docker compose up -d"| DB[("Postgres 16")]
  API["apps/api (Buổi 4)"] -.-> DB
```

## 2. Route map

```mermaid
flowchart TD
  Layout["app/layout.tsx<br/>Header · Footer · Toaster"] --> Home["/  (Server Component)"]
  Layout --> Restaurant["/restaurant/[id]  (Server Component)"]
  Restaurant --> Loading["loading.tsx"]
  Restaurant --> Error["error.tsx"]
  Restaurant --> NotFound["not-found.tsx"]
  Layout --> Checkout["/checkout"]
  Checkout --> Success["/checkout/success?codes=..."]
  Layout --> Api["POST /api/orders  (Route Handler)"]
  Home -->|chọn nhà hàng| Restaurant
  Restaurant -->|thêm món| Drawer["Cart Drawer (Client)"]
  Drawer -->|Thanh toán| Checkout
  Checkout -->|submit| Api
  Api -->|201 orders[]| Success
```

## 3. Ranh giới Server / Client

| Thành phần | Loại | Lý do |
|---|---|---|
| Trang chủ, trang nhà hàng | Server Component | Đọc mock data, render HTML, không cần state trình duyệt |
| Nút thêm món | Client Component | Gọi action của cart store, hiện toast |
| Cart Drawer, floating badge | Client Component | Đọc store, tương tác, phụ thuộc LocalStorage |
| Form checkout | Client Component | React Hook Form, trạng thái submit |
| Trang xác nhận | Client/Server kết hợp | Đọc `codes` từ query string, hiển thị kết quả |
| `POST /api/orders` | Route Handler | Nhận request, tra mock data, trả JSON |

Nguyên tắc: mặc định Server Component; chỉ thêm `"use client"` ở biên cần tương tác.

## 4. ERD

```mermaid
erDiagram
  RESTAURANT ||--o{ MENU_ITEM : "có"
  MENU_ITEM ||--o{ CART_ITEM : "được thêm"
  RESTAURANT ||--o{ ORDER : "nhận"
  ORDER ||--|{ ORDER_LINE : "gồm"

  RESTAURANT {
    string id PK
    string name
    string description
    string imageUrl
    number rating
    number deliveryFee
    number deliveryTimeMinutes
    string[] tags
  }

  MENU_ITEM {
    string id PK
    string restaurantId FK
    string name
    string description
    number price
    string imageUrl
    string category
  }

  CART_ITEM {
    string menuItemId FK
    string restaurantId FK
    string restaurantName
    string name
    number price
    string imageUrl
    number quantity
  }

  ORDER {
    string code PK
    string restaurantId FK
    string restaurantName
    number subtotal
    number deliveryFee
    number total
  }

  ORDER_LINE {
    string menuItemId FK
    string name
    number unitPrice
    number quantity
  }
```

`CartItem` lưu snapshot để giỏ đã lưu không đổi giá khi mock data thay đổi. API đặt hàng **không** dùng snapshot giá từ client: request chỉ gửi `menuItemId` + `quantity`, server tra lại `MenuItem` và `Restaurant`.

## 5. Luồng đặt hàng

```mermaid
sequenceDiagram
  actor D as Diner
  participant UI as Checkout form
  participant Store as Cart store
  participant API as POST /api/orders

  D->>UI: điền thông tin, bấm Đặt hàng
  UI->>UI: Zod validate (lỗi tiếng Việt dưới trường)
  UI->>API: { items: [{menuItemId, quantity}], customer, note }
  API->>API: tra MenuItem/Restaurant, tính subtotal + deliveryFee
  API->>API: nhóm theo restaurantId, sinh Order code
  API-->>UI: 201 { orders: [...] }
  UI->>Store: clearCart()
  UI->>D: chuyển tới /checkout/success?codes=...
```

## 6. Quyết định liên quan

- `docs/adr/0001-multi-restaurant-cart.md` — giỏ đa nhà hàng, một Order mỗi Restaurant.
- Spec và ticket: GitHub issue #1 và các sub-issue.
