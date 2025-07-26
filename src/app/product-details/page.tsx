'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';

type Product = {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image?: string;
    thumbnail?: string;
};

export default function ProductDetails() {
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get('id');
    const source = searchParams.get('src') || 'dummy';

    useEffect(() => {
        async function fetchProduct() {
            if (!id) {
                setError('Product ID not found in URL.');
                setLoading(false);
                return;
            }

            try {
                const actualId = source === 'dummy' ? Number(id) - 1000 : id;
                const res = await fetch(
                    source === 'fake'
                        ? `https://fakestoreapi.com/products/${id}`
                        : `https://dummyjson.com/products/${actualId}`
                );
                const data = await res.json();

                if (!data || !data.title) {
                    setError('Product not found.');
                } else {
                    setProduct(data);
                }
            } catch (err) {
                console.error('Failed to fetch product:', err);
                setError('Error loading product details.');
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id, source]);

    const handleSubmit = () => {
        if (!product) return;

        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

        const existingIndex = existingCart.findIndex(
            (item: any) => item.id === product.id && item.source === source
        );

        if (existingIndex !== -1) {
            existingCart[existingIndex].quantity += 1;
        } else {
            existingCart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image || product.thumbnail,
                quantity: 1,
                source,
            });
        }

        localStorage.setItem('cart', JSON.stringify(existingCart));
        router.push('/cart');
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[400px]">
                <svg className="animate-spin h-10 w-10 text-black" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-600 py-10 text-lg">{error}</div>;
    }

    return (
        <main className="max-w-6xl min-w-screen mx-auto px-6 py-20 text-gray-900 bg-white">
            <div className="mt-14 text-center md:text-left">
                <button
                    onClick={() => router.back()}
                    className="inline-flex items-center gap-1 text-black hover:underline text-sm"
                >
                    <HiOutlineArrowNarrowLeft className="text-base" />
                    Back to Products
                </button>
            </div>
            {product && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                    <div className="rounded-3xl overflow-hidden shadow-xl bg-[#f9f9f9] p-6">
                        <img
                            src={product.image || product.thumbnail}
                            alt={product.title}
                            className="w-full h-[500px] object-contain"
                        />
                    </div>

                    <div className="space-y-6">
                        <h1 className="text-4xl font-semibold tracking-tight leading-snug">{product.title}</h1>
                        <p className="text-gray-500 text-sm uppercase tracking-wide">{product.category || 'Uncategorized'}</p>
                        <p className="text-[28px] font-semibold text-black">${product.price.toFixed(2)}</p>
                        <p className="text-gray-600 leading-relaxed">{product.description || 'No description available.'}</p>

                        <button
                            onClick={handleSubmit}
                            className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-900 transition text-sm font-medium"
                        >
                            Add to Bag
                        </button>

                    </div>
                </div>
            )}

        </main>
    );
}
