"use client";

import { useState } from "react";
import HeroBanner from "@/components/shop/HeroBanner";
import CategoryCarousel from "@/components/shop/CategoryCarousel";
import FeaturedProducts from "@/components/shop/FeaturedProducts";
import ProductGrid from "@/components/shop/ProductGrid";
import PaginationControls from "@/components/shop/PaginationControls";
import useEbayProducts from "@/hooks/useEbayProducts";
import { useSearchParams } from "next/navigation";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || ""; 
  const [page, setPage] = useState(1);

  const { data, loading, error } = useEbayProducts(queryParam || "laptop", page);

  const isSearching = queryParam.trim().length > 0;

  return (
    <div className="max-w-7xl mx-auto mt-28 px-4 sm:px-8">
      {!isSearching && (
        <>
          {/* Hero Banner */}
          <section className="mb-12">
            <HeroBanner />
          </section>

          {/* Categories */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
              Shop by Category
            </h2>
            <CategoryCarousel />
          </section>

          {/* Featured Products */}
          <section className="mb-16">
            <FeaturedProducts />
          </section>
        </>
      )}

      {/* Main Product Grid */}
      <section className="mb-16">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <ProductGrid data={data} loading={loading} />
      </section>

      {/* Pagination (only show if search OR always?) */}
      {isSearching && (
        <section className="flex justify-center mb-20">
          <PaginationControls
            page={page}
            totalPages={data?.totalPages || 1}
            setPage={setPage}
          />
        </section>
      )}
    </div>
  );
}
