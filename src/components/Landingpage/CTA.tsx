'use client';
import { useState } from 'react';

const CTA = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // In real-world: Send email to backend/Mailchimp/etc.
    alert(`Subscribed with: ${email}`);
    setEmail('');
  };

  return (
    <section className="bg-gray-100 py-20 px-6 sm:px-12 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">
          Stay in the Loop
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Get the latest updates, product launches, and exclusive offers straight to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full sm:flex-1 px-5 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700 text-base transition"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default CTA;
