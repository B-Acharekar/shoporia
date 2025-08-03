"use client";

import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    name: "New Electronics",
    keyword: "electronics",
    fallback: "/images/categories/electronics.jpg",
  },
  {
    name: "Collectibles",
    keyword: "collectibles",
    fallback: "/images/categories/collectibles.jpg",
  },
  {
    name: "Parts & Accessories",
    keyword: "car parts",
    fallback: "/images/categories/parts.jpg",
  },
  {
    name: "Fashion",
    keyword: "fashion",
    fallback: "/images/categories/fashion.jpg",
  },
  {
    name: "Health & Beauty",
    keyword: "beauty products",
    fallback: "/images/categories/beauty.jpg",
  },
  {
    name: "Home & Garden",
    keyword: "home decor",
    fallback: "/images/categories/home.jpg",
  },
  {
    name: "Refurbished",
    keyword: "refurbished electronics",
    fallback: "/images/categories/refurbished.jpg",
  },
];

export default function CategoryCarousel() {
  return (
    <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
      {categories.map((cat) => (
        <Link
          href={`/shop?q=${encodeURIComponent(cat.keyword)}`}
          key={cat.name}
          className="flex-shrink-0 w-28 sm:w-32 md:w-36 group"
        >
          <div className="w-full h-28 sm:h-32 md:h-36 rounded-full overflow-hidden border shadow-sm bg-white group-hover:shadow-lg group-hover:scale-105 transition">
            <Image
              src={cat.fallback}
              alt={cat.name}
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="mt-3 text-center font-medium text-gray-800 text-sm group-hover:text-black transition">
            {cat.name}
          </p>
        </Link>
      ))}
    </div>
  );
}

