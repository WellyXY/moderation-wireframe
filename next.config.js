/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['commondatastorage.googleapis.com'],
  },
  // Removed experimental.appDir as it's no longer needed in Next.js 14
}

module.exports = nextConfig 