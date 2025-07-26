'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
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

type CartItem = {
    id: number;
    title: string;
    price: number;
    image?: string;
    quantity: number;
    source: string;
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
                setError('Product ID not found.');
                setLoading(false);
                return;
            }

            try {
                const actualId = source === 'dummy' ? Number(id) - 1000 : id;
                const url = source === 'fake'
                    ? `https://fakestoreapi.com/products/${id}`
                    : `https://dummyjson.com/products/${actualId}`;
                const res = await fetch(url);
                const data = await res.json();

                if (!data?.title) {
                    setError('Product not found.');
                } else {
                    setProduct(data);
                }
            } catch {
                setError('Error loading product.');
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id, source]);

    const addToCart = () => {
        if (!product) return;

        const cart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
        const existingIndex = cart.findIndex(
            (item) => item.id === product.id && item.source === source
        );

        if (existingIndex !== -1) {
            cart[existingIndex].quantity += 1;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image || product.thumbnail,
                quantity: 1,
                source,
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        router.push('/cart');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[400px]">
                <svg className="animate-spin h-8 w-8 text-black" viewBox="0 0 24 24" fill="none">
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
        <main className="max-w-6xl mx-auto px-6 py-16 text-gray-900 bg-white">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-black text-sm hover:underline mb-8"
            >
                <HiOutlineArrowNarrowLeft className="text-base" />
                Back to Products
            </button>

            {product && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-[#f9f9f9] p-6 rounded-2xl shadow-md">
                        <Image
                            src={product.image || product.thumbnail || ''}
                            alt={product.title}
                            width={600}
                            height={600}
                            className="w-full h-[500px] object-contain"
                            priority
                        />
                    </div>

                    <div className="space-y-6">
                        <h1 className="text-4xl font-semibold">{product.title}</h1>
                        <p className="text-gray-500 text-sm uppercase">{product.category || 'Uncategorized'}</p>
                        <p className="text-[26px] font-semibold text-black">${product.price.toFixed(2)}</p>
                        <p className="text-gray-600">{product.description || 'No description available.'}</p>

                        <button
                            onClick={addToCart}
                            className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-900 transition text-sm"
                        >
                            Add to Bag
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
