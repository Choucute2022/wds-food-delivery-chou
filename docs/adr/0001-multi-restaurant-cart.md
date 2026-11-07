# Multi-restaurant cart with one order per restaurant

Hầu hết ứng dụng giao đồ ăn giới hạn giỏ hàng trong một nhà hàng. Dự án này chọn **Multi-restaurant Cart** vì người dùng thường đặt cho một nhóm có khẩu vị khác nhau và không muốn tách thành nhiều lần checkout. Hệ quả là khi đặt hàng, hệ thống tạo **một Order cho mỗi Restaurant** trong giỏ; mỗi Order có Subtotal, Delivery fee và Order code riêng, nhưng tất cả dùng chung một Customer và một địa chỉ giao hàng.

## Considered Options

- **Single-restaurant cart** (bị loại): đơn giản và thực tế hơn về vận chuyển, nhưng buộc người dùng checkout nhiều lần khi đặt cho nhóm.
- **Một Order gộp nhiều Restaurant** (bị loại): một mã đơn duy nhất, nhưng không phản ánh việc mỗi nhà hàng giao hàng và thu phí riêng.

## Consequences

- Cart lưu mảng phẳng các CartItem kèm snapshot `restaurantId` và `restaurantName`; nhóm theo nhà hàng là dữ liệu suy ra, không lưu.
- Tổng tiền phải tính theo từng Restaurant rồi cộng lại; Delivery fee không được gộp thành một khoản phẳng.
- API đặt hàng trả về một mảng Order; trang xác nhận hiển thị nhiều Order code và phải chịu được refresh.
