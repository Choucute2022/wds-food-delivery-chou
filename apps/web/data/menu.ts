export type Restaurant = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  rating: number;
  deliveryFee: number;
  deliveryTimeMinutes: number;
  tags: string[];
};

export type MenuItem = {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  isFeatured?: boolean;
};

export const restaurants: Restaurant[] = [
  {
    id: "bun-bo-co-ba",
    name: "Bún Bò Cô Ba",
    description:
      "Nước dùng ninh xương 12 tiếng, bún tươi và thịt bò mềm. Hương vị Huế đậm đà, cay nhẹ.",
    imageUrl: "/images/restaurants/bun-bo-co-ba.jpg",
    rating: 4.8,
    deliveryFee: 15_000,
    deliveryTimeMinutes: 25,
    tags: ["Bún bò", "Ẩm thực Huế", "Việt Nam"],
  },
  {
    id: "pizza-napoli",
    name: "Pizza Napoli",
    description:
      "Đế mỏng nướng củi, phô mai mozzarella và sốt cà chua San Marzano. Công thức từ Naples.",
    imageUrl: "/images/restaurants/pizza-napoli.jpg",
    rating: 4.7,
    deliveryFee: 25_000,
    deliveryTimeMinutes: 35,
    tags: ["Pizza", "Mì Ý", "Ý"],
  },
  {
    id: "sushi-sakura",
    name: "Sushi Sakura",
    description:
      "Cá hồi tươi cắt tại quầy, cơm sushi trộn giấm đỏ. Nguyên liệu nhập mỗi sáng.",
    imageUrl: "/images/restaurants/sushi-sakura.jpg",
    rating: 4.9,
    deliveryFee: 30_000,
    deliveryTimeMinutes: 40,
    tags: ["Sushi", "Sashimi", "Nhật Bản"],
  },
];

export const menuItems: MenuItem[] = [
  {
    id: "bb-dac-biet",
    restaurantId: "bun-bo-co-ba",
    name: "Bún bò đặc biệt",
    description: "Bún, gân, nạm, giò heo và chả cua.",
    price: 65_000,
    imageUrl: "/images/dishes/bun-bo-dac-biet.jpg",
    category: "Món chính",
    isFeatured: true,
  },
  {
    id: "bb-tai",
    restaurantId: "bun-bo-co-ba",
    name: "Bún bò tái",
    description: "Thịt bò tái mỏng, nước dùng nóng hổi.",
    price: 55_000,
    imageUrl: "/images/dishes/bun-bo-tai.jpg",
    category: "Món chính",
  },
  {
    id: "bb-gan",
    restaurantId: "bun-bo-co-ba",
    name: "Bún bò gân",
    description: "Gân bò hầm mềm, ăn kèm rau sống.",
    price: 60_000,
    imageUrl: "/images/dishes/bun-bo-gan.jpg",
    category: "Món chính",
  },
  {
    id: "bb-cha-cua",
    restaurantId: "bun-bo-co-ba",
    name: "Chả cua Huế",
    description: "Chả cua dai thơm, chiên vàng.",
    price: 45_000,
    imageUrl: "/images/dishes/cha-cua-hue.jpg",
    category: "Khai vị",
  },
  {
    id: "bb-banh-bot-loc",
    restaurantId: "bun-bo-co-ba",
    name: "Bánh bột lọc",
    description: "Bánh bột lọc nhân tôm thịt, nước mắm ớt.",
    price: 35_000,
    imageUrl: "/images/dishes/banh-bot-loc.jpg",
    category: "Khai vị",
  },
  {
    id: "pn-margherita",
    restaurantId: "pizza-napoli",
    name: "Pizza Margherita",
    description: "Cà chua, mozzarella, húng quế tươi.",
    price: 159_000,
    imageUrl: "/images/dishes/pizza-margherita.jpg",
    category: "Pizza",
    isFeatured: true,
  },
  {
    id: "pn-pepperoni",
    restaurantId: "pizza-napoli",
    name: "Pizza Pepperoni",
    description: "Pepperoni bò, mozzarella, sốt cà chua.",
    price: 189_000,
    imageUrl: "/images/dishes/pizza-pepperoni.jpg",
    category: "Pizza",
  },
  {
    id: "pn-hai-san",
    restaurantId: "pizza-napoli",
    name: "Pizza hải sản",
    description: "Tôm, mực, nghêu và phô mai.",
    price: 219_000,
    imageUrl: "/images/dishes/pizza-hai-san.jpg",
    category: "Pizza",
  },
  {
    id: "pn-mi-y",
    restaurantId: "pizza-napoli",
    name: "Mì Ý sốt bò bằm",
    description: "Spaghetti sốt bò bằm, phô mai Parmesan.",
    price: 129_000,
    imageUrl: "/images/dishes/mi-y-bo-bam.jpg",
    category: "Mì Ý",
  },
  {
    id: "pn-tiramisu",
    restaurantId: "pizza-napoli",
    name: "Tiramisu",
    description: "Mascarpone, cà phê và cacao.",
    price: 79_000,
    imageUrl: "/images/dishes/tiramisu.jpg",
    category: "Tráng miệng",
  },
  {
    id: "ss-ca-hoi",
    restaurantId: "sushi-sakura",
    name: "Sushi cá hồi 8 miếng",
    description: "Cá hồi Na Uy, cơm giấm đỏ, wasabi.",
    price: 189_000,
    imageUrl: "/images/dishes/sushi-ca-hoi.jpg",
    category: "Sushi",
    isFeatured: true,
  },
  {
    id: "ss-california",
    restaurantId: "sushi-sakura",
    name: "Sushi cuộn California",
    description: "Cua, bơ, dưa leo và trứng cá.",
    price: 149_000,
    imageUrl: "/images/dishes/sushi-california.jpg",
    category: "Sushi",
  },
  {
    id: "ss-sashimi",
    restaurantId: "sushi-sakura",
    name: "Sashimi cá ngừ",
    description: "Cá ngừ vây xanh, 6 lát dày.",
    price: 229_000,
    imageUrl: "/images/dishes/sashimi-ca-ngu.jpg",
    category: "Sashimi",
  },
  {
    id: "ss-com-cuon",
    restaurantId: "sushi-sakura",
    name: "Cơm cuộn lươn",
    description: "Lươn nướng sốt teriyaki, cơm Nhật.",
    price: 169_000,
    imageUrl: "/images/dishes/com-cuon-luon.jpg",
    category: "Sushi",
  },
  {
    id: "ss-miso",
    restaurantId: "sushi-sakura",
    name: "Súp miso",
    description: "Đậu nành lên men, rong biển và đậu phụ.",
    price: 39_000,
    imageUrl: "/images/dishes/miso-soup.jpg",
    category: "Súp",
  },
];

export function getRestaurants(): Restaurant[] {
  return restaurants;
}

export function getRestaurantById(id: string): Restaurant | undefined {
  return restaurants.find((restaurant) => restaurant.id === id);
}

export function getMenuItemsByRestaurant(restaurantId: string): MenuItem[] {
  return menuItems.filter((item) => item.restaurantId === restaurantId);
}

export function getMenuItemById(id: string): MenuItem | undefined {
  return menuItems.find((item) => item.id === id);
}

export function getFeaturedMenuItems(): MenuItem[] {
  return menuItems.filter((item) => item.isFeatured);
}
