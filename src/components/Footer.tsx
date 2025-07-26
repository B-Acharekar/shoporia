import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full bg-zinc-100 text-zinc-600 py-12 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col md:flex-row justify-between gap-8 text-sm">
        <div>
          <h3 className="text-lg font-semibold text-black mb-2">Shoporia</h3>
          <p className="max-w-xs">A beautifully crafted mock e-commerce experience inspired by premium design.</p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-medium text-zinc-800">Quick Links</span>
          <Link href="/shop" className="hover:underline">Shop</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-medium text-zinc-800">Legal</span>
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="hover:underline">Terms of Service</Link>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-zinc-500">
        &copy; {new Date().getFullYear()} Shoporia. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
