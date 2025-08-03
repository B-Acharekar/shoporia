"use client";

import { useRef, useState, useEffect } from "react";
import useEbayProducts from "@/hooks/useEbayProducts";
import SkeletonCard from "@/components/SkeletonCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

function FeaturedRow({ title, query }: { title: string; query: string }) {
  const { data, loading } = useEbayProducts(query, 1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -260 : 260,
        behavior: "smooth",
      });
    }
  };

  // Progress calculation
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollProgress = el.scrollLeft / (el.scrollWidth - el.clientWidth);
      setProgress(Math.min(scrollProgress, 1));
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="mb-14">
      {/* Section Heading */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
          {title}
        </h2>
        <a
          href={`/shop?q=${query}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
        >
          See all →
        </a>
      </div>

      {/* Carousel Container */}
      <div className="relative group">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 
                     bg-white/80 backdrop-blur-sm shadow-md p-2 rounded-full text-gray-700 
                     opacity-0 -translate-x-3 group-hover:translate-x-0 
                     group-hover:opacity-100 transition-all duration-300"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Product Row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto px-10 scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="min-w-[220px]">
                  <SkeletonCard />
                </div>
              ))
            : data?.items?.slice(0, 12).map((item) => (
                <div
                  key={item.itemId}
                  className="min-w-[220px] max-w-[220px] bg-white rounded-lg 
                             border border-gray-200 shadow-sm snap-start 
                             hover:shadow-lg hover:border-blue-400 
                             hover:-translate-y-1 hover:scale-105 
                             transition transform duration-300"
                >
                  {/* Image */}
                  <div className="w-full h-48 flex items-center justify-center bg-gray-50 rounded-t-lg overflow-hidden">
                    <img
                      src={item.resolvedImage}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain p-3 transition-transform group-hover:scale-105"
                    />
                  </div>

                  {/* Info */}
                  <div className="px-3 py-3">
                    <p className="truncate text-sm font-medium text-gray-700 leading-snug">
                      {item.title}
                    </p>
                    <p className="font-bold text-gray-900 mt-1">
                      {item.price?.value} {item.price?.currency}
                    </p>
                    {item.itemAffiliateWebUrl && (
                      <a
                        href={item.itemAffiliateWebUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 block text-xs text-blue-600 hover:underline"
                      >
                        View on eBay
                      </a>
                    )}
                  </div>
                </div>
              ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 
                     bg-white/80 backdrop-blur-sm shadow-md p-2 rounded-full text-gray-700 
                     opacity-0 translate-x-3 group-hover:translate-x-0 
                     group-hover:opacity-100 transition-all duration-300"
        >
          <ChevronRight size={22} />
        </button>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-10 right-10 h-1 bg-gray-200 rounded-full overflow-hidden mt-3">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  return (
    <div className="space-y-14">
      <FeaturedRow title="Trending Smartphones" query="smartphone" />
      <FeaturedRow title="Latest Laptops" query="laptop" />
      <FeaturedRow title="Stylish Shoes" query="shoes" />
      <FeaturedRow title="Watches You’ll Love" query="watches" />
    </div>
  );
}
