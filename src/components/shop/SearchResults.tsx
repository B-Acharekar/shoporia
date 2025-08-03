// components/shop/SearchResults.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import ProductGrid from "@/components/shop/ProductGrid";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() || "";
  const [page, setPage] = useState(1);

  if (!query) return null;

  return (
    <section>
      <ProductGrid query={query} page={page} setPage={setPage} />
    </section>
  );
}
