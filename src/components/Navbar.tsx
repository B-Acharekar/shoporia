'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { Search, ChevronDown, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/shop?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center gap-6 text-sm font-medium text-zinc-800">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-black whitespace-nowrap">
          Shoporia
        </Link>

        {/* Category Dropdown */}
        <div className="hidden md:flex items-center gap-1 cursor-pointer px-2 py-1 border border-zinc-200 rounded hover:bg-zinc-100">
          <span>All</span>
          <ChevronDown size={16} />
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex flex-1 max-w-3xl items-center"
        >
          <input
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-2 border border-zinc-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-r-md hover:bg-zinc-800 flex items-center justify-center"
          >
            <Search size={18} />
          </button>
        </form>

        {/* Nav Links */}
        <div className="hidden lg:flex gap-5 items-center">
          <Link href="#features" className="hover:text-zinc-500 transition">Features</Link>
          <Link href="/about" className="hover:text-zinc-500 transition">About</Link>
          <Link href="/contact" className="hover:text-zinc-500 transition">Contact</Link>
          <Link href="/shop" className="hover:text-zinc-500 transition">Shop</Link>
        </div>

        {/* User Section */}
        {user ? (
          <div className="flex items-center gap-6">
            {/* Account Dropdown */}
            <div className="relative group">
              <button className="flex flex-col text-left">
                <span className="text-xs text-zinc-500">Hello, {user.name?.split(' ')[0] || 'User'}</span>
                <span className="font-semibold flex items-center gap-1">
                  Account & Lists
                  <ChevronDown size={14} />
                </span>
              </button>
              <div className="absolute hidden group-hover:block bg-white border border-zinc-200 shadow-lg right-0 mt-2 rounded-md w-48 z-50">
                <ul className="py-2 text-sm text-zinc-700">
                  <li>
                    <Link href="/profile" className="block px-4 py-2 hover:bg-zinc-100">Your Profile</Link>
                  </li>
                  <li>
                    <Link href="/orders" className="block px-4 py-2 hover:bg-zinc-100">Your Orders</Link>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 hover:bg-zinc-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Returns & Orders */}
            <Link href="/orders" className="text-sm font-semibold hover:text-zinc-500">
              Returns & Orders
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <ShoppingCart size={22} />
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1.5">
                0
              </span>
            </Link>
          </div>
        ) : (
          <Link
            href="/login"
            className="px-4 py-1.5 border border-zinc-300 rounded-full text-sm font-medium text-zinc-800 hover:border-zinc-500 hover:text-zinc-900 transition"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
