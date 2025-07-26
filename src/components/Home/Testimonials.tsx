'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const testimonials = [
    {
        name: 'Aman Sharma',
        review: 'Shoporia has the cleanest UI and amazing performance. Feels like Apple!',
    },
    {
        name: 'Sana Verma',
        review: 'The shopping experience is seamless. The design is 🔥',
    },
    {
        name: 'Ravi Kulkarni',
        review: 'Best ecommerce UI I’ve seen in a while. Super smooth!',
    },
    {
        name: 'Meena Iyer',
        review: 'Loved how fast and easy it was to checkout. Brilliant work!',
    },
];

const Testimonials = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section className="py-20 border-t border-zinc-200 overflow-hidden">
            <h2 className="text-3xl font-bold text-center mb-12">What Customers Say</h2>

            <div className="relative w-full overflow-x-hidden">
                <motion.div
                    className="flex gap-6"
                    initial={{ x: 0 }}
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{
                        ease: 'linear',
                        duration: 20,
                        repeat: Infinity,
                    }}
                >
                    {[...testimonials, ...testimonials].map((t, i) => (
                        <div
                            key={i}
                            className="min-w-[300px] max-w-sm bg-white border border-zinc-200 p-6 rounded-xl shadow-sm"
                        >
                            <p className="text-zinc-700 text-lg italic">“{t.review}”</p>
                            <h4 className="mt-6 font-medium text-zinc-500 text-sm uppercase">{t.name}</h4>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
