"use client";

import useEbayProducts from "@/hooks/useEbayProducts";
import Link from "next/link";
import SkeletonCard from "@/components/SkeletonCard"; // create if not already
import { EbayItem } from "@/types/ebay";
import Image from "next/image";

export default function TodaysDeals() {
  // Default query is "trending"
  const { data, loading, error } = useEbayProducts("trending", 1);

  if (error) {
    return (
      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Today’s Deals
        </h2>
        <p className="text-red-500">Failed to load deals. Please try again later.</p>
      </section>
    );
  }

  return (
    <section className="mt-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Today’s Deals</h2>
        <Link
          href="/shop?q=deals"
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : data?.items?.slice(0, 10).map((item: EbayItem) => (
              <Link
                key={item.itemId}
                href={`/shop?q=${encodeURIComponent(item.title)}`}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden 
                           shadow-sm hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <div className="w-full h-44 flex items-center justify-center bg-gray-50 overflow-hidden">
                  <Image
                    src={item.resolvedImage?? `./no-image.png`}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain p-4 
                               group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="truncate text-sm font-medium text-gray-800 group-hover:text-blue-600">
                    {item.title}
                  </p>
                  <p className="text-green-600 font-semibold mt-2">
                    {item.price?.value} {item.price?.currency}
                  </p>
                  {item.price?.value && (
                    <p className="text-xs text-gray-500 line-through mt-1">
                      ${Math.round(Number(item.price?.value) * 1.3)}
                    </p>
                  )}
                </div>
              </Link>
            ))}
      </div>
    </section>
  );
}
