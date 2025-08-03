"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Rare Finds Categories
const rareFinds = [
  "sports memorabilia",
  "trading cards",
  "collectible figures",
  "comics & art",
  "antiques",
];

export default function RareFinds() {
  const [images, setImages] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadImages = async () => {
      const results: Record<string, string> = {};

      for (const q of rareFinds) {
        try {
          // Call your Unsplash fallback via local API
          const res = await fetch(`/api/ebay?q=${encodeURIComponent(q)}`);
          const data = await res.json();

          // Use first returned item's image OR fallback
          results[q] =
            data?.items?.[0]?.resolvedImage ||
            `/no-image.png`; // fallback image
        } catch (err) {
          console.error(`Failed to fetch image for ${q}:`, err);
          results[q] = "/no-image.png";
        }
      }

      setImages(results);
    };

    loadImages();
  }, []);

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8 border-b pb-2">
        Discover Rare Finds
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {rareFinds.map((q) => (
          <Link
            key={q}
            href={`/shop?q=${encodeURIComponent(q)}`}
            className="group bg-white border border-gray-200 rounded-xl overflow-hidden 
                       shadow-sm hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <div className="w-full h-36 bg-gray-50 overflow-hidden">
              <Image
                src={images[q] || "/no-image.png"}
                alt={q}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-3 text-center">
              <p className="font-medium capitalize text-gray-800 group-hover:text-blue-600">
                {q}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
