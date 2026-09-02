import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [360, 390, 640, 768, 1024, 1280, 1440, 1920],
  },
  devIndicators: false,
};

export default nextConfig;
