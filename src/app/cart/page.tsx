"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { CartItem } from "@/types/cart";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    try {
      const parsed = JSON.parse(saved || "[]");
      if (Array.isArray(parsed)) {
        setCart(parsed);
      } else {
        setCart([]);
      }
    } catch {
      setCart([]);
    }
  }, []);

  const handleRemove = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 bg-white">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-black transition mb-6"
      >
        <FiArrowLeft size={18} />
        <span className="text-sm">Back to Products</span>
      </button>

      <h2 className="text-3xl font-semibold text-gray-900 mb-8 tracking-tight">
        Your Bag
      </h2>

      {cart.length === 0 ? (
        <p className="text-gray-400 text-lg">Your cart is currently empty.</p>
      ) : (
        <>
          {/* Cart Items */}
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 border border-gray-200 rounded-xl bg-gray-50 hover:shadow transition"
              >
                <div className="relative w-full sm:w-24 h-28 bg-white rounded-lg overflow-hidden">
                  <Image
                    src={item.image || "/no-image.png"}
                    alt={item.title}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-base font-medium text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    {item.price.toFixed(2)} {item.currency}
                  </p>
                  <p className="text-xs text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-sm text-gray-500 hover:text-red-500 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Subtotal + Checkout */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t pt-6">
            <div className="text-lg font-medium text-gray-900">
              Subtotal: {total.toFixed(2)} {cart[0]?.currency || "USD"}
            </div>
            <button
              onClick={() => router.push("/checkout")}
              className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-900 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </main>
  );
}
