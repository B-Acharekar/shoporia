// DO NOT include "use client" here
import HeroBanner from "@/components/shop/HeroBanner";
import CategoryCarousel from "@/components/shop/CategoryCarousel";
import FeaturedProducts from "@/components/shop/FeaturedProducts";
import RareFinds from "@/components/shop/RareFinds";
import BestSellingBrands from "@/components/shop/BestSellingBrands";
import TodaysDeals from "@/components/shop/TodayDeals";
import { Suspense } from "react";
import SearchResults from "@/components/shop/SearchResults";

export default function ShopPage() {
  return (
    <div className="max-w-[1440px] mx-auto mt-10 mb-16 px-4 sm:px-8 lg:px-12 space-y-28">
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <SearchResults />
      </Suspense>

      {/* Static sections */}
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
    </div>
  );
}
