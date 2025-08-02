"use client";

import { useEffect, useState } from "react";

const categories = [
  { name: "Electronics", keyword: "electronics" },
  { name: "Fashion", keyword: "fashion clothes" },
  { name: "Home", keyword: "home decor" },
  { name: "Toys", keyword: "kids toys" },
  { name: "Sports", keyword: "sports equipment" },
];

async function fetchCategoryImage(keyword: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        keyword
      )}&per_page=1&orientation=squarish&client_id=${
        process.env.NEXT_PUBLIC_UNSPLASH_KEY
      }`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.results?.[0]?.urls?.small || null;
  } catch (error) {
    console.error("Unsplash category image failed:", error);
    return null;
  }
}

export default function CategoryCarousel() {
  const [images, setImages] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadImages = async () => {
      const results: Record<string, string> = {};
      for (const cat of categories) {
        const img = await fetchCategoryImage(cat.keyword);
        results[cat.name] = img || "/no-image.png"; // fallback placeholder
      }
      setImages(results);
    };
    loadImages();
  }, []);

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 mb-8 scrollbar-hide">
      {categories.map((cat) => (
        <div
          key={cat.name}
          className="flex-shrink-0 w-32 cursor-pointer group"
        >
          <img
            src={images[cat.name]}
            alt={cat.name}
            className="w-full h-24 object-cover rounded-lg shadow-sm group-hover:shadow-md transition"
          />
          <p className="mt-2 text-center font-medium group-hover:text-yellow-600 transition">
            {cat.name}
          </p>
        </div>
      ))}
    </div>
  );
}
