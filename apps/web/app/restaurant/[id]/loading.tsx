export default function RestaurantLoading() {
  return (
    <div
      className="mx-auto w-full max-w-6xl animate-pulse px-4 py-8 sm:px-6 lg:px-8"
      aria-busy="true"
      aria-label="Đang tải nhà hàng"
    >
      <div className="h-4 w-36 rounded bg-muted" />

      <div className="mt-5 overflow-hidden rounded-2xl ring-1 ring-foreground/10">
        <div className="aspect-[16/9] max-h-80 w-full bg-muted sm:aspect-[21/9]" />
        <div className="flex flex-col gap-4 bg-card p-5 sm:p-6">
          <div className="h-7 w-56 rounded bg-muted" />
          <div className="h-4 w-full max-w-xl rounded bg-muted" />
          <div className="h-4 w-64 rounded bg-muted" />
          <div className="mt-2 flex gap-2">
            <div className="h-6 w-16 rounded-full bg-muted" />
            <div className="h-6 w-20 rounded-full bg-muted" />
            <div className="h-6 w-14 rounded-full bg-muted" />
          </div>
        </div>
      </div>

      <div className="mt-10 h-6 w-32 rounded bg-muted" />
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
          >
            <div className="aspect-[16/10] bg-muted" />
            <div className="flex flex-col gap-3 p-4">
              <div className="h-5 w-3/4 rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-5 w-24 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">Đang tải thực đơn…</span>
    </div>
  );
}
