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
        left: dir === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  // Update scroll progress
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollProgress =
        el.scrollLeft / (el.scrollWidth - el.clientWidth);
      setProgress(Math.min(scrollProgress, 1));
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-800">
          {title}
        </h2>
        <a
          href={`/shop?q=${query}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
        >
          See all →
        </a>
      </div>

      <div className="relative group">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 
                     bg-white/90 shadow-md p-2 rounded-full text-gray-700 
                     opacity-0 -translate-x-3 group-hover:translate-x-0 
                     group-hover:opacity-100 transition-all duration-300"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Product Row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto px-4 md:px-12 scroll-smooth 
                     snap-x snap-mandatory scrollbar-hide"
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="min-w-[200px]">
                  <SkeletonCard />
                </div>
              ))
            : data?.items?.slice(0, 10).map((item) => (
                <div
                  key={item.itemId}
                  className="min-w-[200px] max-w-[200px] bg-white rounded-xl 
                             border border-gray-100 shadow-sm snap-start 
                             hover:shadow-xl hover:scale-105 hover:-translate-y-1 
                             transition transform duration-300"
                >
                  <div className="w-full h-44 flex items-center justify-center bg-gray-50 rounded-t-xl">
                    <img
                      src={item.resolvedImage}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain p-3"
                    />
                  </div>
                  <div className="px-4 py-3">
                    <p className="truncate text-sm font-medium text-gray-700">
                      {item.title}
                    </p>
                    <p className="font-semibold text-gray-900 mt-2">
                      {item.price?.value} {item.price?.currency}
                    </p>
                  </div>
                </div>
              ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 
                     bg-white/90 shadow-md p-2 rounded-full text-gray-700 
                     opacity-0 translate-x-3 group-hover:translate-x-0 
                     group-hover:opacity-100 transition-all duration-300"
        >
          <ChevronRight size={22} />
        </button>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-12 right-12 h-1 bg-gray-200 rounded-full overflow-hidden mt-3">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  return (
    <div className="space-y-16">
      <FeaturedRow title="Trending Smartphones" query="smartphone" />
      <FeaturedRow title="Latest Laptops" query="laptop" />
      <FeaturedRow title="Stylish Shoes" query="shoes" />
      <FeaturedRow title="Watches You’ll Love" query="watches" />
    </div>
  );
}
