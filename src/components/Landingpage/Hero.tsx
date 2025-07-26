'use client';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="w-full h-screen bg-white flex items-center justify-center px-6 sm:px-20">
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl sm:text-7xl font-light text-gray-900 leading-tight tracking-tight">
          Shoporia
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Redefining the way you shop — simple, elegant, and fast.
        </p>
        <div className="mt-8">
          <Link
            href="/home"
            className="bg-black text-white text-lg px-8 py-3 rounded-full hover:opacity-90 transition"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
