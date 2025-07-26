'use client';
import { FaShoppingBag, FaRocket, FaSyncAlt } from 'react-icons/fa';
import Image from 'next/image';

const features = [
  {
    title: 'Effortless Shopping',
    description:
      'Browse, discover, and purchase your favorite products with zero friction. Our clean, intuitive interface makes shopping feel like second nature.',
    icon: <FaShoppingBag className="text-primary w-8 h-8" />,
    image: '/images/feature-shopping.png',
  },
  {
    title: 'Lightning Fast Experience',
    description:
      'Built for speed and performance. Every click, swipe, and scroll is optimized to make your journey smoother than ever.',
    icon: <FaRocket className="text-primary w-8 h-8" />,
    image: '/images/feature-speed.png',
  },
  {
    title: 'Smart & Seamless Returns',
    description:
      'Change your mind? No worries. Our return policy is as streamlined as our checkout — just a few taps away.',
    icon: <FaSyncAlt className="text-primary w-8 h-8" />,
    image: '/images/feature-returns.png',
  },
];

const Features = () => {
  return (
    <section id="features" className="w-full bg-[#f9f9fa] py-20 px-6 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto space-y-24">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex flex-col-reverse lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
          >
            {/* Text Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <div className="mb-4">{feature.icon}</div>
              <h2 className="text-3xl font-bold text-zinc-900 mb-4">{feature.title}</h2>
              <p className="text-zinc-600 text-lg leading-relaxed">{feature.description}</p>
            </div>

            {/* Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
