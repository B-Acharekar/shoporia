'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { Search, ChevronDown, ShoppingCart, Menu } from 'lucide-react';

const categories = [
  { name: 'Electronics', link: '/shop?q=electronics' },
  { name: 'Fashion', link: '/shop?q=fashion' },
  { name: 'Home & Garden', link: '/shop?q=home' },
  { name: 'Health & Beauty', link: '/shop?q=beauty' },
  { name: 'Sports & Outdoors', link: '/shop?q=sports' },
  { name: 'Motors', link: '/shop?q=motors' },
  { name: 'Collectibles & Art', link: '/shop?q=collectibles' },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const [query, setQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/shop?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-sm border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-6 text-sm font-medium text-zinc-800">
        
        {/* Left Section */}
        <div className="flex items-center gap-6 relative">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tight text-black whitespace-nowrap">
            Shoporia
          </Link>

          {/* Category Dropdown */}
          <div 
            className="hidden md:flex items-center gap-1 cursor-pointer px-3 py-1.5 border border-zinc-200 rounded-lg hover:bg-zinc-100 transition relative"
            onMouseEnter={() => setCategoryOpen(true)}
            onMouseLeave={() => setCategoryOpen(false)}
          >
            <span className="text-sm font-medium">All Categories</span>
            <ChevronDown size={16} />
            
            {/* Dropdown Menu */}
            {categoryOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-zinc-200 shadow-lg rounded-md z-50">
                <ul className="py-2">
                  {categories.map((cat) => (
                    <li key={cat.name}>
                      <Link 
                        href={cat.link}
                        className="block px-4 py-2 hover:bg-zinc-100 text-sm"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex flex-1 max-w-3xl items-center border border-zinc-300 rounded-lg overflow-hidden shadow-sm"
        >
          <input
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white hover:bg-zinc-800 flex items-center justify-center transition"
          >
            <Search size={18} />
          </button>
        </form>

        {/* User & Cart Section */}
        <div className="hidden lg:flex gap-6 items-center">
          {user ? (
            <>
              <div className="relative group">
                <button className="flex flex-col text-left">
                  <span className="text-xs text-zinc-500">
                    Hello, {user.name?.split(' ')[0] || 'User'}
                  </span>
                  <span className="font-semibold flex items-center gap-1">
                    Account
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
              <Link href="/cart" className="relative hover:text-zinc-600 transition">
                <ShoppingCart size={22} />
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1.5">
                  0
                </span>
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="px-5 py-2 border border-zinc-300 rounded-full text-sm font-medium text-zinc-800 hover:border-zinc-500 hover:text-zinc-900 transition"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
