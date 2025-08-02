'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import { EbayResponse, EbayItem } from "@/types/ebay";

// Simple in-memory cache to avoid multiple Unsplash calls for same product
const fallbackCache: Record<string, string> = {};

// Generate a stable hash index from a string (itemId)
function getStableIndex(str: string, max: number): number {
  return str.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) % max;
}

// Get a fallback image from Unsplash
async function fetchFallbackImage(productName: string, itemId: string): Promise<string | null> {
  const cacheKey = `${productName}-${itemId}`;
  if (fallbackCache[cacheKey]) {
    return fallbackCache[cacheKey];
  }

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        productName
      )}&per_page=10&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`
    );

    if (!res.ok) {
      console.error("Unsplash API error:", res.status);
      return null;
    }

    const data = await res.json();
    if (!data.results || data.results.length === 0) {
      console.warn("Unsplash: No image found for", productName);
      return null;
    }

    // Pick a consistent image index based on itemId
    const index = getStableIndex(itemId, data.results.length);
    const imageUrl = data.results[index].urls.small;

    fallbackCache[cacheKey] = imageUrl; // cache result
    return imageUrl;
  } catch (err) {
    console.error("Unsplash fallback failed:", err);
    return null;
  }
}

export default function useEbayProducts(query: string, page: number = 1) {
  const [data, setData] = useState<EbayResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/ebay?q=${query}&page=${page}&perPage=20`)
      .then(async (res) => {
        const products: EbayItem[] = res.data.items;

        const withImages = await Promise.all(
          products.map(async (item) => {
            let imageUrl =
              item.image?.imageUrl ||
              item.additionalImages?.[0]?.imageUrl ||
              null;

            if (!imageUrl) {
              const fallback = await fetchFallbackImage(item.title, item.itemId);
              imageUrl = fallback || "/no-image.png";
            }

            return { ...item, resolvedImage: imageUrl };
          })
        );

        setData({ ...res.data, items: withImages });
      })
      .catch((err) => {
        console.error("eBay fetch error:", err);
        setError("Failed to load products");
      })
      .finally(() => setLoading(false));
  }, [query, page]);

  return { data, loading, error };
}
