import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Bike, Clock, Star } from "lucide-react";

import { AddToCartButton } from "@/components/add-to-cart-button";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getMenuItemsByRestaurant,
  getRestaurantById,
  getRestaurants,
} from "@/data/menu";
import { formatVnd } from "@/lib/format";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return getRestaurants().map((restaurant) => ({ id: restaurant.id }));
}

export async function generateMetadata({ params }: PageProps<"/restaurant/[id]">) {
  const { id } = await params;
  const restaurant = getRestaurantById(id);

  if (!restaurant) {
    return { title: "Không tìm thấy nhà hàng" };
  }

  return {
    title: restaurant.name,
    description: restaurant.description,
  };
}

export default async function RestaurantPage({
  params,
}: PageProps<"/restaurant/[id]">) {
  const { id } = await params;
  const restaurant = getRestaurantById(id);

  if (!restaurant) {
    notFound();
  }

  const menuItems = getMenuItemsByRestaurant(restaurant.id);
  const categories = [...new Set(menuItems.map((item) => item.category))];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/#restaurants"
        className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Tất cả nhà hàng
      </Link>

      <section className="mt-5 overflow-hidden rounded-2xl ring-1 ring-foreground/10">
        <div className="relative aspect-[16/9] max-h-80 w-full sm:aspect-[21/9]">
          <Image
            src={restaurant.imageUrl}
            alt={`Ảnh nhà hàng ${restaurant.name}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1152px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 bg-card p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {restaurant.name}
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground sm:text-base">
                {restaurant.description}
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
              <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden="true" />
              {restaurant.rating}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden="true" />
              {restaurant.deliveryTimeMinutes} phút
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Bike className="size-4" aria-hidden="true" />
              Phí giao {formatVnd(restaurant.deliveryFee)}
            </span>
            <span>{menuItems.length} món</span>
          </div>

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
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">Thực đơn</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Giá món chưa gồm phí giao {formatVnd(restaurant.deliveryFee)}.
        </p>

        <div className="mt-6 flex flex-col gap-10">
          {categories.map((category) => {
            const items = menuItems.filter((item) => item.category === category);

            return (
              <div key={category}>
                <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                  {category}
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => (
                    <Card key={item.id} className="gap-0 overflow-hidden pt-0">
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={item.imageUrl}
                          alt={`Ảnh món ${item.name}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{item.name}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="justify-between">
                        <span className="text-base font-semibold">
                          {formatVnd(item.price)}
                        </span>
                        <AddToCartButton menuItem={item} restaurant={restaurant} />
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="mt-10">
        <Link
          href="/#restaurants"
          className={cn(buttonVariants({ variant: "outline" }), "w-full sm:w-auto")}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Xem nhà hàng khác
        </Link>
      </div>
    </div>
  );
}
