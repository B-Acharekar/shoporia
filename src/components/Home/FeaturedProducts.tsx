'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Source = 'fake' | 'dummy';

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  source: Source;
};

type FakeStoreProduct = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
};

type DummyJsonProduct = {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
};

type DummyJsonResponse = {
  products: DummyJsonProduct[];
};

type SortOrder = '' | 'asc' | 'desc';

export default function AllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [fakeRes, dummyRes] = await Promise.all([
          fetch('https://fakestoreapi.com/products'),
          fetch('https://dummyjson.com/products?limit=30'),
        ]);

        const fakestore: FakeStoreProduct[] = await fakeRes.json();
        const dummyJson: DummyJsonResponse = await dummyRes.json();

        const merged: Product[] = [
          ...fakestore.map<Product>((p) => ({
            id: p.id,
            title: p.title,
            price: p.price,
            category: p.category || 'General',
            image: p.image || 'https://via.placeholder.com/300x300?text=No+Image',
            source: 'fake',
          })),
          ...dummyJson.products.map<Product>((p) => ({
            id: p.id + 1000,
            title: p.title,
            price: p.price,
            category: p.category || 'General',
            image: p.thumbnail || 'https://via.placeholder.com/300x300?text=No+Image',
            source: 'dummy',
          })),
        ];

        const cats = ['all', ...Array.from(new Set(merged.map((p) => p.category)))];

        setCategories(cats);
        setProducts(merged);
        setFiltered(merged);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    let updated = [...products];

    if (activeCategory !== 'all') {
      updated = updated.filter((p) => p.category === activeCategory);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      updated = updated.filter((p) => p.title.toLowerCase().includes(q));
    }

    updated = updated.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    if (sortOrder === 'asc') {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      updated.sort((a, b) => b.price - a.price);
    }

    setFiltered(updated);
  }, [products, activeCategory, searchTerm, sortOrder, minPrice, maxPrice]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <section className="py-10 px-4 md:px-12">
      <h2 className="text-3xl font-bold text-center mb-6">All Products</h2>

      {/* Search */}
      <div className="mb-6 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search products..."
          className="border rounded-lg px-4 py-3 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="md:w-64 w-full">
          <div className="border p-4 rounded-xl bg-white space-y-6 sticky top-24">
            {/* Categories */}
            <div>
              <h4 className="font-semibold mb-2">Categories</h4>
              <div className="flex flex-wrap md:flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`px-4 py-1.5 text-sm capitalize rounded-full border transition-all ${
                      activeCategory === cat
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black border-zinc-300 hover:border-black'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <h4 className="font-semibold mb-2">Sort by Price</h4>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                className="border rounded-lg px-3 py-2 w-full"
              >
                <option value="">Default</option>
                <option value="asc">Low → High</option>
                <option value="desc">High → Low</option>
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <h4 className="font-semibold mb-2">Price Range</h4>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="border rounded-lg px-3 py-1.5 w-full"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="border rounded-lg px-3 py-1.5 w-full"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          {loading ? (
            <div className="text-center py-20 text-zinc-500 font-medium">Loading products...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center text-zinc-400 text-lg py-12">No products found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-2xl p-6 hover:shadow-xl transition bg-white text-center"
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="w-full h-52 object-contain mb-4 rounded-lg bg-white"
                  />
                  <h3 className="font-semibold text-lg text-zinc-900 mb-1 line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-zinc-500 capitalize mb-1">{product.category}</p>
                  <p className="font-semibold text-xl text-black mb-4">${product.price}</p>
                  <Link
                    href={`/product-details?id=${product.id}&src=${product.source}`}
                    className="w-full block text-center bg-black text-white py-2 rounded-full hover:bg-gray-900 transition"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </section>
  );
}
