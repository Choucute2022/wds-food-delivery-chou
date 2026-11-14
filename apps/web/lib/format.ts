export function formatVnd(amount: number) {
  return `${new Intl.NumberFormat("vi-VN").format(amount)} ₫`;
}
