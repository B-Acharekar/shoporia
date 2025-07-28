/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.dummyjson.com",
      "via.placeholder.com",
      "i.ebayimg.com",
      'cgi.sandbox.ebay.com',
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        pathname: "/img/**",
      },
    ],
  },
};

module.exports = nextConfig;
