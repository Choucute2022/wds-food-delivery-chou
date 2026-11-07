# WDS Food Delivery

Từ vựng của miền nghiệp vụ đặt món giao hàng. Code dùng thuật ngữ tiếng Anh trong tài liệu này; giao diện hiển thị nhãn tiếng Việt tương ứng.

## Language

**Restaurant**:
Một quán ăn chuẩn bị và giao các MenuItem của chính nó.
_Avoid_: Store, shop, vendor, merchant

**MenuItem**:
Một món ăn có thể đặt, thuộc đúng một Restaurant, gồm tên, mô tả, giá và ảnh.
_Avoid_: Product, dish, food

**Cart**:
Tập món người dùng đang chọn trước khi đặt hàng. Một Cart có thể chứa món từ nhiều Restaurant.
_Avoid_: Basket, order, checkout

**CartItem**:
Một MenuItem trong Cart kèm số lượng và bản chụp hiển thị của tên, giá, ảnh và Restaurant.
_Avoid_: Line item, product row

**Order**:
Yêu cầu giao hàng đã được xác nhận, chỉ chứa CartItem của đúng một Restaurant và có một Order code.
_Avoid_: Purchase, transaction

**Order code**:
Mã con người đọc được của một Order, định dạng `FD-YYYYMMDD-XXXX`.
_Avoid_: Order id, reference number

**Customer**:
Người đặt Order, được nhận diện bằng họ tên, số điện thoại và địa chỉ giao hàng.
_Avoid_: User, account, buyer, client

**Delivery fee**:
Số tiền một Restaurant thu để giao Order của mình; không nằm trong Subtotal và được cộng theo từng Restaurant.
_Avoid_: Shipping cost, ship fee, phí ship

**Subtotal**:
Tổng giá MenuItem × số lượng của một Restaurant, trước Delivery fee.
_Avoid_: Total, cart total

**Multi-restaurant Cart**:
Một Cart có CartItem từ nhiều hơn một Restaurant; khi checkout sẽ tách thành một Order cho mỗi Restaurant.
_Avoid_: Mixed cart, split cart
