// components/shop/ProductCard.tsx
import { EbayItem } from "@/types/ebay";

export default function ProductCard({ item }: { item: EbayItem }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition">
      <img
        src={item.resolvedImage}
        alt={item.title}
        className="w-full h-48 object-contain mb-3 bg-gray-50 rounded"
        onError={(e) => (e.currentTarget.src = "/no-image.png")}
      />
      <h3 className="font-medium truncate">{item.title}</h3>
      <p className="text-lg font-semibold mt-1">
        {item.price?.value} {item.price?.currency}
      </p>
      <button className="w-full mt-3 bg-black text-white py-2 rounded-md hover:bg-neutral-800">
        Add to Cart
      </button>
    </div>
  );
}
