"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const brands = ["Apple", "Samsung", "Nike", "Sony", "Lego"];

export default function BestSellingBrands() {
  const [images, setImages] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadImages = async () => {
      const results: Record<string, string> = {};
      for (const brand of brands) {
        try {
          // Fetch from Unsplash via API (consistent with Rare Finds)
          const res = await fetch(`/api/ebay?q=${encodeURIComponent(brand)}`);
          const data = await res.json();

          results[brand] =
            data?.items?.[0]?.resolvedImage ||
            `/brands/${brand.toLowerCase()}.png` || // fallback to your static brand logos
            "/no-image.png";
        } catch (err) {
          console.error(`Failed to fetch brand image for ${brand}:`, err);
          results[brand] = `/brands/${brand.toLowerCase()}.png`;
        }
      }
      setImages(results);
    };

    loadImages();
  }, []);

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8 border-b pb-2">
        Best-Selling Brands
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {brands.map((brand) => (
          <Link
            key={brand}
            href={`/shop?q=${encodeURIComponent(brand)}`}
            className="group bg-white border border-gray-200 rounded-xl overflow-hidden 
                       shadow-sm hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <div className="w-full h-36 bg-gray-50 flex items-center justify-center overflow-hidden">
              <Image
                src={images[brand] || `/brands/${brand.toLowerCase()}.png`}
                alt={brand}
                width={200}
                height={200}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 p-4"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.src = `/brands/${brand.toLowerCase()}.png`;
                }}
              />
            </div>
            <div className="p-3 text-center">
              <p className="font-medium text-gray-800 group-hover:text-blue-600">
                {brand}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
