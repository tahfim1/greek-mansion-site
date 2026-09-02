import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [360, 390, 640, 768, 1024, 1280, 1440, 1920],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
  devIndicators: false,
};

export default nextConfig;
