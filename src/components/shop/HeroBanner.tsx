'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const banners = [
  {
    id: 1,
    keyword: 'season sale',
    img: '/banners/sale1.jpg',
    title: 'Biggest Deals of the Season',
    subtitle: 'Save up to 50% on top picks',
    link: '/shop',
  },
  {
    id: 2,
    keyword: 'electronics',
    img: '/banners/electronics.jpg',
    title: 'Electronics. Reinvented.',
    subtitle: 'The brands you love, at prices you’ll love more.',
    link: '/shop?category=electronics',
  },
  {
    id: 3,
    keyword: 'fashion clothes',
    img: '/banners/fashion.jpg',
    title: 'Fashion Without Limits',
    subtitle: 'Elevate your style this season.',
    link: '/shop?category=fashion',
  },
];

// Fetch dynamic Unsplash fallback
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

  // Load Unsplash fallback
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

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + banners.length) % banners.length);
  const nextSlide = () =>
    setIndex((prev) => (prev + 1) % banners.length);

  return (
    <div className="relative w-full h-[480px] md:h-[560px] overflow-hidden rounded-3xl bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={banners[index].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={images[index] || banners[index].img}
            alt={banners[index].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-6">
            <h2 className="text-3xl md:text-5xl font-semibold text-white drop-shadow-md tracking-tight">
              {banners[index].title}
            </h2>
            <p className="mt-3 text-lg md:text-xl text-gray-200 drop-shadow-sm">
              {banners[index].subtitle}
            </p>
            <a
              href={banners[index].link}
              className="mt-6 px-8 py-3 bg-white text-black rounded-full font-medium text-base hover:bg-gray-100 transition"
            >
              Shop Now
            </a>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-6 -translate-y-1/2 bg-black/40 backdrop-blur-sm p-2 rounded-full text-white hover:bg-black/60 transition"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-6 -translate-y-1/2 bg-black/40 backdrop-blur-sm p-2 rounded-full text-white hover:bg-black/60 transition"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? 'bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
