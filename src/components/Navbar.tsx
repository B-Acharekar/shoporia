'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white/70 backdrop-blur border-b border-zinc-200">
      <nav className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex justify-between items-center text-sm font-medium text-zinc-800">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-black">
          Shoporia
        </Link>

        <div className="flex gap-6 items-center">
          {!user && (
            <>
              <Link href="#features" className="hover:text-zinc-500 transition">Features</Link>
              <Link href="/about" className="hover:text-zinc-500 transition">About</Link>
              <Link href="/contact" className="hover:text-zinc-500 transition">Contact</Link>
              <Link href="#" className="hover:text-zinc-500 transition">Shop</Link>
            </>
          )}

          {user ? (
            <>
              <span className="text-sm text-zinc-700">
                Hi, {user.name?.split(' ')[0] || 'User'}
              </span>
              <button
                onClick={logout}
                className="px-4 py-1.5 border border-zinc-300 rounded-full text-sm font-medium text-zinc-800 hover:border-zinc-500 hover:text-zinc-900 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-1.5 border border-zinc-300 rounded-full text-sm font-medium text-zinc-800 hover:border-zinc-500 hover:text-zinc-900 transition"
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
