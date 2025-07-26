/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.dummyjson.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        pathname: '/img/**',
      },
    ],
  },
};

module.exports = nextConfig;
