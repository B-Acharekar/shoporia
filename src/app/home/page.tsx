'use client';

import FeaturedProducts from '@/components/Home/FeaturedProducts';
import SaleBanner from '@/components/Home/SaleBanner';
import Testimonials from '@/components/Home/Testimonials';

export default function HomePage() {
  return (
    <main className="bg-white text-black px-6 sm:px-10 max-w-7xl min-w-screen mx-auto">
      <div className="h-24" />

      <SaleBanner />

      {/* Flex layout for sidebar + featured products */}
      <section className="mt-16 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <FeaturedProducts />
        </div>
      </section>

      <Testimonials />
      <div className="h-32" />
    </main>
  );
}
