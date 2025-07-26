'use client';

import Link from 'next/link';

export default function About() {
  return (
    <section className="w-full h-screen bg-white flex items-center justify-center px-6 sm:px-20">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl sm:text-5xl font-light text-gray-900 mb-6">
          About <span className="text-blue-600">Shoporia</span>
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Welcome to <strong>Shoporia</strong> — your premier destination for high-quality products crafted with care and innovation.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Our goal is to offer a seamless and delightful shopping experience inspired by the elegance and simplicity you expect from premium brands — without unnecessary complexity.
        </p>

        <Link
          href="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-full text-base font-medium hover:opacity-90 transition"
        >
          ← Back to Home
        </Link>
      </div>
    </section>
  );
}
