import Link from "next/link";
import {
  Bike,
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  UtensilsCrossed,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatVnd } from "@/lib/format";
import { cn } from "@/lib/utils";

const restaurants = [
  {
    name: "Bún Bò Cô Ba",
    cuisine: "Ẩm thực Huế",
    description: "Nước dùng ninh xương 12 tiếng, bún tươi và thịt bò mềm.",
    rating: 4.8,
    deliveryFee: 15_000,
    deliveryTimeMinutes: 25,
    tags: ["Bún bò", "Việt Nam"],
    gradient: "from-orange-400 via-amber-500 to-rose-500",
  },
  {
    name: "Pizza Napoli",
    cuisine: "Ẩm thực Ý",
    description: "Đế mỏng nướng củi, phô mai mozzarella và sốt cà chua San Marzano.",
    rating: 4.7,
    deliveryFee: 25_000,
    deliveryTimeMinutes: 35,
    tags: ["Pizza", "Ý"],
    gradient: "from-red-400 via-orange-500 to-yellow-400",
  },
  {
    name: "Sushi Sakura",
    cuisine: "Ẩm thực Nhật",
    description: "Cá hồi tươi cắt tại quầy, cơm sushi trộn giấm đỏ.",
    rating: 4.9,
    deliveryFee: 30_000,
    deliveryTimeMinutes: 40,
    tags: ["Sushi", "Nhật Bản"],
    gradient: "from-rose-400 via-pink-500 to-fuchsia-500",
  },
];

const dishes = [
  {
    name: "Bún bò đặc biệt",
    restaurant: "Bún Bò Cô Ba",
    description: "Bún, gân, nạm, giò heo và chả cua.",
    price: 65_000,
  },
  {
    name: "Pizza Margherita",
    restaurant: "Pizza Napoli",
    description: "Cà chua, mozzarella, húng quế tươi.",
    price: 159_000,
  },
  {
    name: "Sushi cá hồi 8 miếng",
    restaurant: "Sushi Sakura",
    description: "Cá hồi Na Uy, cơm giấm đỏ, wasabi.",
    price: 189_000,
  },
];

const highlights = [
  {
    icon: Bike,
    title: "Giao nhanh 25–40 phút",
    description: "Theo dõi thời gian dự kiến của từng nhà hàng ngay trên thẻ.",
  },
  {
    icon: ShieldCheck,
    title: "Đặt một lần, nhiều nhà hàng",
    description: "Một giỏ hàng cho cả nhóm, không phải checkout nhiều lần.",
  },
  {
    icon: MapPin,
    title: "Giao tận cửa",
    description: "Nhập địa chỉ một lần, áp dụng cho mọi đơn trong giỏ.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-orange-50 via-background to-amber-50 dark:from-orange-950/30 dark:via-background dark:to-amber-950/20">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8">
          <div className="flex flex-col items-start gap-5">
            <span className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
              Dự án học tập WDS · Buổi 1
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              Món ngon từ nhiều nhà hàng, giao tận cửa
            </h1>
            <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
              Chọn món Việt, Ý hay Nhật trong cùng một giỏ hàng. Một địa chỉ, một lần
              đặt, nhiều nhà hàng cùng giao.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button render={<Link href="#restaurants" />} size="lg">
                Khám phá nhà hàng
              </Button>
              <Link
                href="#dishes"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                Xem món nổi bật
              </Link>
            </div>
            <dl className="mt-2 grid grid-cols-3 gap-3 text-sm sm:gap-6">
              <div>
                <dt className="text-muted-foreground">Nhà hàng</dt>
                <dd className="text-base font-semibold sm:text-xl">3</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Món ăn</dt>
                <dd className="text-base font-semibold sm:text-xl">15</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Thời gian</dt>
                <dd className="text-base font-semibold sm:text-xl">25–40 phút</dd>
              </div>
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-orange-300/40 to-rose-300/40 blur-2xl"
            />
            <Card className="relative gap-0 pt-0 shadow-xl">
              <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-orange-400 via-amber-500 to-rose-500">
                <UtensilsCrossed
                  className="size-16 text-white/90"
                  aria-hidden="true"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <CardTitle>Bún Bò Cô Ba</CardTitle>
                  <span className="inline-flex items-center gap-1 text-sm font-medium">
                    <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                    4.8
                  </span>
                </div>
                <CardDescription>Nước dùng ninh xương 12 tiếng</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-4" aria-hidden="true" />
                    25 phút
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Bike className="size-4" aria-hidden="true" />
                    {formatVnd(15_000)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section
        id="restaurants"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Nhà hàng nổi bật
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Ba nhà hàng mẫu với phong cách ẩm thực khác nhau. Dữ liệu đang là dữ liệu
            cứng của Buổi 1.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <Card key={restaurant.name} className="gap-0 pt-0">
              <div
                role="img"
                aria-label={`Ảnh minh hoạ ${restaurant.name}`}
                className={cn(
                  "flex aspect-[4/3] items-center justify-center bg-gradient-to-br",
                  restaurant.gradient,
                )}
              >
                <UtensilsCrossed className="size-12 text-white/90" aria-hidden="true" />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle>{restaurant.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {restaurant.cuisine}
                    </CardDescription>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium">
                    <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                    {restaurant.rating}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-sm text-muted-foreground">{restaurant.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {restaurant.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-4" aria-hidden="true" />
                    {restaurant.deliveryTimeMinutes} phút
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Bike className="size-4" aria-hidden="true" />
                    {formatVnd(restaurant.deliveryFee)}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href="#restaurants"
                  className={cn(buttonVariants({ variant: "outline" }), "w-full")}
                >
                  Xem thực đơn
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section
        id="dishes"
        className="scroll-mt-20 border-y bg-muted/30"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Món nổi bật hôm nay
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              Giá đã bao gồm VAT, chưa gồm phí giao của từng nhà hàng.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dishes.map((dish) => (
              <Card key={dish.name}>
                <CardHeader>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardDescription>{dish.restaurant}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{dish.description}</p>
                </CardContent>
                <CardFooter className="justify-between">
                  <span className="text-base font-semibold">{formatVnd(dish.price)}</span>
                  <Button variant="outline" size="sm">
                    Thêm vào giỏ
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="flex flex-col gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <item.icon className="size-5" aria-hidden="true" />
              </span>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
