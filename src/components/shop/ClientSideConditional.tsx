// components/shop/ClientSideConditional.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import SearchResults from "./SearchResults";
import HeroBanner from "./HeroBanner";
import CategoryCarousel from "./CategoryCarousel";
import FeaturedProducts from "./FeaturedProducts";
import RareFinds from "./RareFinds";
import BestSellingBrands from "./BestSellingBrands";
import TodaysDeals from "./TodayDeals";

export default function ClientSideConditional() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim();
  const isSearchActive = !!query;

  if (isSearchActive) {
    return (
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <SearchResults />
      </Suspense>
    );
  }

  return (
    <>
      <HeroBanner />
      <section className="mt-20">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Browse by Categories
          </h2>
          <a
            href="/shop?q=all"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View all →
          </a>
        </div>
        <CategoryCarousel />
      </section>
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-6 rounded-3xl shadow-inner">
        <FeaturedProducts />
      </section>
      <RareFinds />
      <BestSellingBrands />
      <section className="bg-gray-50 rounded-3xl shadow-sm p-8">
        <TodaysDeals />
      </section>
    </>
  );
}
