"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ads = [
  { id: 1, img: "/ads/fashion-sale.jpg", link: "/shop?category=fashion" },
  { id: 2, img: "/ads/electronics-offer.jpg", link: "/shop?category=electronics" },
  { id: 3, img: "/ads/home-deals.jpg", link: "/shop?category=home" },
];

export default function AdBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ads.length);
    }, 4000); // Change every 4s
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 mt-10 relative h-[200px] md:h-[250px] overflow-hidden rounded-lg shadow-md">
      <AnimatePresence mode="wait">
        <motion.a
          key={ads[index].id}
          href={ads[index].link}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <img
            src={ads[index].img}
            alt="Advertisement"
            className="w-full h-full object-cover cursor-pointer"
          />
        </motion.a>
      </AnimatePresence>
    </div>
  );
}
