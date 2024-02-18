/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io',],
    formats: ['image/avif', 'image/webp'],
    loader: 'default',
    path: '/_next/image',
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
  },
  transpilePackages: ["@refinedev/nextjs-router"],
};

module.exports = nextConfig;
