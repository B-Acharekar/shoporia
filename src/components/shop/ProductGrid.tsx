"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SkeletonCard from "@/components/SkeletonCard";
import useEbayProducts from "@/hooks/useEbayProducts";
import PaginationControls from "./PaginationControls";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext"; // ✅ Use CartContext
import { EbayItem } from "@/types/ebay";

interface ProductGridProps {
  query: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function ProductGrid({ query, page, setPage }: ProductGridProps) {
  const { data, loading } = useEbayProducts(query, page);
  const [sortOption, setSortOption] = useState("relevance");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

  const { addToCart } = useCart(); // ✅ From context

  useEffect(() => {
    setPage(1);
  }, [sortOption, priceRange, setPage]);

  useEffect(() => {
    if (data?.totalPages && page > data.totalPages) {
      setPage(1);
    }
  }, [data, page, setPage]);

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
          Showing results for <span className="text-gray-900">“{query}”</span>
        </h2>

        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm 
                       bg-white shadow-sm focus:ring-2 focus:ring-gray-800 
                       focus:border-gray-800 transition"
          >
            <option value="relevance">Sort by Relevance</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="newest">Newest Arrivals</option>
          </select>

          {/* Price Filter */}
          <div className="flex items-center gap-2 text-sm">
            <input
              type="number"
              min={0}
              placeholder="Min"
              className="w-20 border rounded px-2 py-1 text-sm"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
            />
            <span>—</span>
            <input
              type="number"
              min={0}
              placeholder="Max"
              className="w-20 border rounded px-2 py-1 text-sm"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
            />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : data?.items
              ?.filter((item) => {
                const price = Number(item.price?.value) || 0;
                return price >= priceRange[0] && price <= priceRange[1];
              })
              .sort((a, b) => {
                const priceA = Number(a.price?.value) || 0;
                const priceB = Number(b.price?.value) || 0;

                if (sortOption === "priceLowHigh") return priceA - priceB;
                if (sortOption === "priceHighLow") return priceB - priceA;
                return 0;
              })
              .map((item) => (
                <div
                  key={item.itemId}
                  className="group bg-white rounded-2xl border border-gray-200 
                             shadow-sm hover:shadow-xl hover:-translate-y-1 
                             transition-all duration-300 overflow-hidden"
                >
                  <Link
                    href={`/product-details?id=${item.itemId}&src=ebay`}
                    className="block"
                  >
                    <div className="w-full h-60 flex items-center justify-center bg-gray-50">
                      <img
                        src={item.resolvedImage}
                        alt={item.title}
                        className="max-h-full max-w-full object-contain p-6 
                                 group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => (e.currentTarget.src = "/no-image.png")}
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-gray-800 font-medium text-sm truncate group-hover:text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-green-600 font-semibold mt-2 text-lg">
                        {item.price?.value} {item.price?.currency}
                      </p>
                      {item.price?.value && (
                        <p className="text-xs text-gray-500 line-through mt-1">
                          {Math.round(Number(item.price?.value) * 1.3)}
                        </p>
                      )}
                    </div>
                  </Link>

                  {/* Add to Cart */}
                  <div className="px-5 pb-5">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        addToCart({
                          id: item.itemId,
                          title: item.title,
                          price: Number(item.price?.value) || 0,
                          currency: item.price?.currency || "USD",
                          image: item.resolvedImage || "/no-image.png",
                          quantity: 1,
                          source: "ebay",
                        });
                      }}
                      className="w-full py-2 rounded-lg bg-slate-900 text-white text-sm font-medium
                                 hover:bg-slate-800 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
      </div>

      {/* Pagination */}
      {data?.totalPages && data.totalPages > 1 && (
        <div className="flex justify-center">
          <PaginationControls
            page={page}
            totalPages={data.totalPages}
            setPage={setPage}
          />
        </div>
      )}
    </div>
  );
}
