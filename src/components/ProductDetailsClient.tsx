"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { EbayItem } from "@/types/ebay";
import { useCart } from "@/context/CartContext"; // ✅ use CartContext instead of localStorage

export default function ProductDetailsClient() {
  const [product, setProduct] = useState<EbayItem | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();
  const itemId = searchParams.get("id");
  const source = searchParams.get("src") || "ebay";

  const { addToCart } = useCart(); // ✅ grab addToCart from context

  useEffect(() => {
    async function fetchProduct() {
      if (!itemId) {
        setError("Product ID not found.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/ebay/item?id=${itemId}`);
        const data = await res.json();

        if (!data?.title) {
          setError("Product not found.");
        } else {
          setProduct(data);
        }
      } catch {
        setError("Error loading product.");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [itemId]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.itemId,
      title: product.title,
      price: Number(product.price?.value) || 0,
      currency: product.price?.currency || "USD",
      image: product.resolvedImage || "/no-image.png",
      quantity: 1,
      source,
    });

    router.push("/cart");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <svg
          className="animate-spin h-8 w-8 text-black"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-10 text-lg">{error}</div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-16 text-gray-900 bg-white">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-black text-sm hover:underline mb-8"
      >
        <HiOutlineArrowNarrowLeft className="text-base" />
        Back to Products
      </button>

      {product && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-[#f9f9f9] p-6 rounded-2xl shadow-md">
            <Image
              src={product.resolvedImage || "/no-image.png"}
              alt={product.title}
              width={600}
              height={600}
              className="w-full h-[500px] object-contain"
              priority
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-semibold">{product.title}</h1>
            <p className="text-gray-500 text-sm uppercase">
              {product.condition || "New"}
            </p>
            <p className="text-[26px] font-semibold text-black">
              {product.price?.value} {product.price?.currency}
            </p>
            <p className="text-gray-600">
              {product.subtitle || "No description available."}
            </p>

            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-900 transition text-sm"
            >
              Add to Bag
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
