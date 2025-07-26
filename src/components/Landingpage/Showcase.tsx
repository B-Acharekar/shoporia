'use client';
import Link from 'next/link';
import Image from 'next/image';

const showcaseItems = [
  {
    title: 'New Arrivals',
    description: 'Fresh styles, curated weekly.',
    image: '/images/showcase-new.jpg',
    link: '/shop/new',
  },
  {
    title: 'Smart Gadgets',
    description: 'Tech that blends into your life.',
    image: '/images/showcase-gadgets.jpg',
    link: '/shop/gadgets',
  },
  {
    title: 'Minimal Apparel',
    description: 'Clean cuts. Timeless fits.',
    image: '/images/showcase-apparel.jpg',
    link: '/shop/apparel',
  },
  {
    title: 'Accessories',
    description: 'Complete your look.',
    image: '/images/showcase-accessories.jpg',
    link: '/shop/accessories',
  },
];
const Showcase = () => {
  return (
    <section className="bg-white py-20 px-6 sm:px-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {showcaseItems.map((item, index) => (
          <Link
            href={item.link}
            key={index}
            className="relative group block w-full h-[400px] overflow-hidden rounded-3xl shadow-sm"
          >
            <Image
              src={item.image}
              alt={item.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition duration-300"></div>
            <div className="absolute bottom-8 left-8 text-white z-10">
              <h3 className="text-3xl font-semibold mb-1">{item.title}</h3>
              <p className="text-lg">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Showcase;
