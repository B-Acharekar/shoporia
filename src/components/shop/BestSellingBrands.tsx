"use client";

import Link from "next/link";
import Image from "next/image";

const brands = [
  {
    name: "Apple",
    logo: "/images/brands/apple.png",
  },
  {
    name: "Samsung",
    logo: "/images/brands/samsung.png",
  },
  {
    name: "Nike",
    logo: "/images/brands/nike.png",
  },
  {
    name: "Sony",
    logo: "/images/brands/sony.png",
  },
  {
    name: "Lego",
    logo: "/images/brands/lego.png",
  },
];

export default function BestSellingBrands() {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8 border-b pb-2">
        Best-Selling Brands
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {brands.map((brand) => (
          <Link
            key={brand.name}
            href={`/shop?q=${encodeURIComponent(brand.name)}`}
            className="group bg-white border border-gray-200 rounded-xl overflow-hidden 
                       shadow-sm hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <div className="w-full h-36 bg-gray-50 flex items-center justify-center overflow-hidden">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={200}
                height={200}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 p-4"
              />
            </div>
            <div className="p-3 text-center">
              <p className="font-medium text-gray-800 group-hover:text-blue-600">
                {brand.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
