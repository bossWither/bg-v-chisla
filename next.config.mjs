/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/bg-v-chisla',
  assetPrefix: '/bg-v-chisla/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
