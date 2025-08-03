'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { Search, ChevronDown, ShoppingCart } from 'lucide-react';
import { useCart } from "@/context/CartContext"; // adjust path if needed

const categories = [
  { name: "New Electronics" },
  { name: "Collectibles" },
  { name: "Parts & Accessories" },
  { name: "Fashion" },
  { name: "Health & Beauty" },
  { name: "Home & Garden" },
  { name: "Refurbished" },
];

const Navbar = () => {
  const { data: session } = useSession();
  const [query, setQuery] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const { cart } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/shop?q=${encodeURIComponent(query)}`;
    }
  };

  const user = session?.user;

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Left: Logo + Categories */}
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-black">
              Shoporia
            </Link>

            {/* Category Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              <button className="flex items-center text-sm font-medium text-neutral-700 hover:text-black">
                Categories
                <ChevronDown size={16} className="ml-1" />
              </button>
              {showCategories && (
                <div className="absolute mt-2 w-56 bg-white border border-neutral-200 rounded-md shadow-lg z-50">
                  <ul className="py-2">
                    {categories.map((cat) => (
                      <li key={cat.name}>
                        <Link
                          href={`/shop?q=${encodeURIComponent(cat.name.toLowerCase())}`}
                          className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
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

          {/* Center: Search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 mx-6 max-w-xl"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border border-neutral-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="bg-black text-white px-4 rounded-r-md hover:bg-neutral-800"
            >
              <Search size={18} />
            </button>
          </form>

          {/* Right: User & Cart */}
          <div className="flex items-center gap-6">
            {user ? (
              <div className="relative group">
                <button className="text-left">
                  <span className="block text-xs text-neutral-500">
                    Hello, {user.name?.split(' ')[0]}
                  </span>
                  <span className="flex items-center font-semibold gap-1">
                    Account <ChevronDown size={14} />
                  </span>
                </button>

                <div className="absolute right-0 mt-2 w-48 bg-white border border-neutral-200 rounded-md shadow-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-150 z-50">
                  <ul className="py-2">
                    <li>
                      <Link href="/profile" className="block px-4 py-2 hover:bg-neutral-100">
                        Your Profile
                      </Link>
                    </li>
                    <li>
                      <Link href="/orders" className="block px-4 py-2 hover:bg-neutral-100">
                        Your Orders
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="w-full text-left px-4 py-2 hover:bg-neutral-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-sm font-medium text-black hover:text-neutral-600"
              >
                Login
              </Link>
            )}

            <Link href="/cart" className="relative">
              <ShoppingCart size={22} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-2 text-xs bg-black text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
