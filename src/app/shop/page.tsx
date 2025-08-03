import { Suspense } from "react";
import ClientSideConditional from "@/components/shop/ClientSideConditional";

export default function ShopPage() {
  return (
    <div className="max-w-[1440px] mx-auto mt-10 mb-16 px-4 sm:px-8 lg:px-12 space-y-28">
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <ClientSideConditional />
      </Suspense>
    </div>
  );
}
