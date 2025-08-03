"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import HeroBanner from "@/components/shop/HeroBanner";
import CategoryCarousel from "@/components/shop/CategoryCarousel";
import FeaturedProducts from "@/components/shop/FeaturedProducts";
import ProductGrid from "@/components/shop/ProductGrid";
import PaginationControls from "@/components/shop/PaginationControls";
import RareFinds from "@/components/shop/RareFinds";
import BestSellingBrands from "@/components/shop/BestSellingBrands";
import TodaysDeals from "@/components/shop/TodayDeals";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const [page, setPage] = useState(1);

  const isSearching = queryParam.trim().length > 0;

  return (
    <div className="max-w-[1440px] mx-auto mt-10 mb-16 px-4 sm:px-8 lg:px-12 space-y-28">
      {!isSearching ? (
        <>
          {/* Hero Banner */}
          <HeroBanner />

          {/* Categories */}
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

          {/* Featured Products */}
          <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-6 rounded-3xl shadow-inner">
            <FeaturedProducts />
          </section>

          {/* Rare Finds */}
          <section>
            <RareFinds />
          </section>

          {/* Best Selling Brands */}
          <section>
            <BestSellingBrands />
          </section>

          {/* Today's Deals */}
          <section className="bg-gray-50 rounded-3xl shadow-sm p-8">
            <TodaysDeals />
          </section>
        </>
      ) : (
        <>
          <section>
            <ProductGrid query={queryParam} page={page} setPage={setPage} />
          </section>


        </>
      )}
    </div>
  );
}
