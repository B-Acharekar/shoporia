"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const categories = [
  { name: "New Electronics", keywords: ["electronics", "gadgets"], fallback: "/images/categories/electronics.jpg" },
  { name: "Collectibles", keywords: ["collectibles", "art", "toys"], fallback: "/images/categories/collectibles.jpg" },
  { name: "Parts & Accessories", keywords: ["car parts", "automotive"], fallback: "/images/categories/parts.jpg" },
  { name: "Fashion", keywords: ["fashion", "clothing", "style"], fallback: "/images/categories/fashion.jpg" },
  { name: "Health & Beauty", keywords: ["beauty products", "skincare"], fallback: "/images/categories/beauty.jpg" },
  { name: "Home & Garden", keywords: ["home decor", "garden"], fallback: "/images/categories/home.jpg" },
  { name: "Refurbished", keywords: ["refurbished electronics", "renewed"], fallback: "/images/categories/refurbished.jpg" },
];

async function fetchCategoryImage(keywords: string[]): Promise<string | null> {
  for (const keyword of keywords) {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(keyword)}&per_page=1&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`
      );
      if (!res.ok) continue;

      const data = await res.json();
      if (data.results?.length > 0) {
        return data.results[0].urls.small;
      }
    } catch (error) {
      console.error(`Unsplash failed for ${keyword}:`, error);
    }
  }
  return null;
}

export default function CategoryCarousel() {
  const [images, setImages] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadImages = async () => {
      const cached = localStorage.getItem("categoryImages");
      const results: Record<string, string> = cached ? JSON.parse(cached) : {};

      // fetch only for missing categories
      await Promise.all(
        categories.map(async (cat) => {
          if (!results[cat.name]) {
            const img = await fetchCategoryImage(cat.keywords);
            results[cat.name] = img || cat.fallback;
          }
        })
      );

      setImages(results);
      localStorage.setItem("categoryImages", JSON.stringify(results));
    };

    loadImages();
  }, []);

  return (
    <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
      {categories.map((cat) => (
        <Link
          href={`/shop?q=${encodeURIComponent(cat.keywords[0])}`}
          key={cat.name}
          className="flex-shrink-0 w-28 sm:w-32 md:w-36 group"
        >
          <div className="w-full h-28 sm:h-32 md:h-36 rounded-full overflow-hidden border shadow-sm bg-white group-hover:shadow-lg group-hover:scale-105 transition">
            <Image
              src={images[cat.name] || cat.fallback}
              alt={cat.name}
              width={200}
              height={200}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = cat.fallback;
              }}
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
