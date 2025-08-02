'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Initial banners (with product keywords instead of only static images)
const banners = [
  {
    id: 1,
    keyword: 'season sale',
    img: '/banners/sale1.jpg', // fallback to local if Unsplash fails
    title: 'Biggest Deals of the Season',
    subtitle: 'Shop now and save up to 50%',
    link: '/shop',
  },
  {
    id: 2,
    keyword: 'electronics',
    img: '/banners/electronics.jpg',
    title: 'Electronics Mega Sale',
    subtitle: 'Top brands at unbeatable prices',
    link: '/shop?category=electronics',
  },
  {
    id: 3,
    keyword: 'fashion clothes',
    img: '/banners/fashion.jpg',
    title: 'Trendy Fashion Picks',
    subtitle: 'Upgrade your wardrobe today',
    link: '/shop?category=fashion',
  },
];

// Fetch dynamic Unsplash image
async function fetchFallbackImage(productName: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        productName
      )}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.results?.[0]?.urls?.regular || null;
  } catch (error) {
    console.error('Unsplash fallback failed:', error);
    return null;
  }
}

export default function HeroBanner() {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  // Load Unsplash fallback images
  useEffect(() => {
    const loadImages = async () => {
      const results = await Promise.all(
        banners.map(async (banner) => {
          const fallback = await fetchFallbackImage(banner.keyword);
          return fallback || banner.img;
        })
      );
      setImages(results);
    };
    loadImages();
  }, []);

  // Auto-slide every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + banners.length) % banners.length);
  const nextSlide = () =>
    setIndex((prev) => (prev + 1) % banners.length);

  return (
    <div className="relative w-full h-[420px] overflow-hidden rounded-xl shadow-md">
      <AnimatePresence mode="wait">
        <motion.div
          key={banners[index].id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <img
            src={images[index] || banners[index].img}
            alt={banners[index].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-12 text-white">
            <h2 className="text-4xl font-bold drop-shadow">{banners[index].title}</h2>
            <p className="mt-2 text-lg drop-shadow">{banners[index].subtitle}</p>
            <a
              href={banners[index].link}
              className="mt-4 px-6 py-2 bg-yellow-400 text-black font-medium rounded hover:bg-yellow-300 transition"
            >
              Shop Now
            </a>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Left arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black transition"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black transition"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
