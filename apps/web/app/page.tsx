import Image from "next/image";
import Link from "next/link";
import {
  Bike,
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
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
import {
  getFeaturedMenuItems,
  getMenuItemsByRestaurant,
  getRestaurants,
} from "@/data/menu";
import { formatVnd } from "@/lib/format";
import { cn } from "@/lib/utils";

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
  const restaurants = getRestaurants();
  const featuredDishes = getFeaturedMenuItems();
  const restaurantNameById = new Map(
    restaurants.map((restaurant) => [restaurant.id, restaurant.name]),
  );
  const deliveryTimes = restaurants.map((restaurant) => restaurant.deliveryTimeMinutes);
  const fastest = Math.min(...deliveryTimes);
  const slowest = Math.max(...deliveryTimes);
  const totalDishes = restaurants.reduce(
    (count, restaurant) => count + getMenuItemsByRestaurant(restaurant.id).length,
    0,
  );
  const heroRestaurant = restaurants[0];

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-orange-50 via-background to-amber-50 dark:from-orange-950/30 dark:via-background dark:to-amber-950/20">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8">
          <div className="flex flex-col items-start gap-5">
            <span className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
              Dự án học tập WDS · Buổi 2
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
                <dd className="text-base font-semibold sm:text-xl">{restaurants.length}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Món ăn</dt>
                <dd className="text-base font-semibold sm:text-xl">{totalDishes}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Thời gian</dt>
                <dd className="text-base font-semibold sm:text-xl">
                  {fastest}–{slowest} phút
                </dd>
              </div>
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-orange-300/40 to-rose-300/40 blur-2xl"
            />
            {heroRestaurant ? (
              <Card className="relative gap-0 overflow-hidden pt-0 shadow-xl">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={heroRestaurant.imageUrl}
                    alt={`Ảnh minh hoạ ${heroRestaurant.name}`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 448px"
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle>{heroRestaurant.name}</CardTitle>
                    <span className="inline-flex items-center gap-1 text-sm font-medium">
                      <Star
                        className="size-4 fill-amber-400 text-amber-400"
                        aria-hidden="true"
                      />
                      {heroRestaurant.rating}
                    </span>
                  </div>
                  <CardDescription>{heroRestaurant.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-4" aria-hidden="true" />
                      {heroRestaurant.deliveryTimeMinutes} phút
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Bike className="size-4" aria-hidden="true" />
                      {formatVnd(heroRestaurant.deliveryFee)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ) : null}
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
            Ba nhà hàng mẫu với phong cách ẩm thực khác nhau, dữ liệu lấy từ module
            mock data của Buổi 2.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <Card key={restaurant.id} className="gap-0 overflow-hidden pt-0">
              <div className="relative aspect-[4/3]">
                <Image
                  src={restaurant.imageUrl}
                  alt={`Ảnh minh hoạ ${restaurant.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle>{restaurant.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {restaurant.tags[0]}
                    </CardDescription>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium">
                    <Star
                      className="size-4 fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    />
                    {restaurant.rating}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {restaurant.description}
                </p>
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
                  href={`/restaurant/${restaurant.id}`}
                  className={cn(buttonVariants({ variant: "outline" }), "w-full")}
                >
                  Xem thực đơn
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section id="dishes" className="scroll-mt-20 border-y bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Món nổi bật hôm nay
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              Giá chưa gồm phí giao của từng nhà hàng.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredDishes.map((dish) => {
              const restaurantName = restaurantNameById.get(dish.restaurantId);
              return (
                <Card key={dish.id} className="gap-0 overflow-hidden pt-0">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={dish.imageUrl}
                      alt={`Ảnh minh hoạ ${dish.name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardDescription>{restaurantName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{dish.description}</p>
                  </CardContent>
                  <CardFooter className="justify-between">
                    <span className="text-base font-semibold">
                      {formatVnd(dish.price)}
                    </span>
                    <Link
                      href={`/restaurant/${dish.restaurantId}`}
                      className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                    >
                      Xem nhà hàng
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
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
