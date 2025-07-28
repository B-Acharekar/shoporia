'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Source = 'ebay';
type SortOrder = '' | 'asc' | 'desc';
type Product = { id: string; title: string; price: number; category: string; image: string; source: Source; };

const TOP_CATEGORIES = ["electronics", "fashion", "home", "toys", "sports", "collectibles", "health", "beauty", "books"];

export default function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<SortOrder>('');
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(10000);
    const [loading, setLoading] = useState<boolean>(true);
    const perPage = 20; // 20 items per page

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                const res = await fetch(
                    `/api/ebay?q=${encodeURIComponent(searchTerm || activeCategory)}&page=${page}&perPage=20`
                );
                const data = await res.json();

                const mapped: Product[] = (data.items || []).map((item: any, idx: number) => ({
                    id: `${page}-${idx}`,
                    title: item.title,
                    price: item.price?.value ? Number(item.price.value) : 0,
                    category: item.categories?.[0]?.categoryName || activeCategory,
                    image: item.image?.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg',
                    source: 'ebay',
                }));

                setProducts(mapped);
                setTotalPages(data.totalPages || 1);
            } catch (err) {
                console.error("Failed:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [page, searchTerm, activeCategory]);



    // Sorting + Price filter
    const filtered = products
        .filter(p => (activeCategory === 'all' || p.category === activeCategory))
        .filter(p => p.price >= minPrice && p.price <= maxPrice)
        .sort((a, b) => sortOrder === 'asc' ? a.price - b.price : sortOrder === 'desc' ? b.price - a.price : 0);

    return (
        <section className="pt-24 px-4 md:px-12 bg-gray-50">
            <div className="bg-white shadow-md sticky top-16 z-40 flex gap-4 px-4 py-3 border rounded-lg mb-6 overflow-x-auto">
                {TOP_CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => { setActiveCategory(cat); setPage(1); }}
                        className={`px-5 py-2 rounded-full border ${activeCategory === cat ? 'bg-black text-white' : 'bg-white hover:bg-black hover:text-white'}`}>
                        {cat}
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="mb-6 max-w-2xl mx-auto">
                <input type="text" placeholder="Search for anything..."
                    className="border rounded-lg px-4 py-3 w-full"
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }} />
            </div>

            {/* Products */}
            {loading ? <p className="text-center py-20">Loading...</p> :
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {filtered.map(product => (
                            <div key={product.id} className="border rounded-2xl p-6 bg-white hover:shadow-xl transition text-center">
                                <Image src={product.image} alt={product.title} width={300} height={300} unoptimized
                                    className="w-full h-52 object-contain mb-4" />
                                <h3 className="font-semibold text-base line-clamp-2">{product.title}</h3>
                                <p className="text-sm text-zinc-500 capitalize mb-1">{product.category}</p>
                                <p className="font-semibold text-lg mb-4">${product.price}</p>
                                <Link href={`/product-details?id=${product.id}&src=${product.source}`}
                                    className="block bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition">
                                    View Details
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
<div className="flex justify-center items-center mt-8 gap-4">
  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="px-4 py-2 border rounded disabled:opacity-50"
  >
    Prev
  </button>

  <span>Page {page} of {totalPages}</span>

  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
    className="px-4 py-2 border rounded disabled:opacity-50"
  >
    Next
  </button>
</div>

                </div>}
        </section>
    );
}
