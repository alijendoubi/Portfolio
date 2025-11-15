/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
  },
  transpilePackages: ['@portfolio/common'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@portfolio/common': require('path').resolve(__dirname, '../../common'),
    };
    return config;
  },
};

module.exports = nextConfig;
