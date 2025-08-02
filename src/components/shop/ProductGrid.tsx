"use client";

import SkeletonCard from "@/components/SkeletonCard";
import { EbayResponse } from "@/types/ebay";

interface ProductGridProps {
  data: EbayResponse | null;
  loading: boolean;
}

export default function ProductGrid({ data, loading }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {loading
        ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
        : data?.items?.map((item) => (
            <div
              key={item.itemId}
              className="border rounded-lg p-4 hover:shadow-lg transition"
            >
              <img
                src={item.resolvedImage}
                alt={item.title}
                className="w-full h-48 object-contain mb-3 bg-gray-50 rounded"
                onError={(e) => (e.currentTarget.src = "/no-image.png")}
              />
              <h3 className="font-medium truncate">{item.title}</h3>
              <p className="text-lg font-semibold mt-1">
                {item.price?.value} {item.price?.currency}
              </p>
              <button className="w-full mt-3 bg-black text-white py-2 rounded-md hover:bg-neutral-800">
                Add to Cart
              </button>
            </div>
          ))}
    </div>
  );
}
