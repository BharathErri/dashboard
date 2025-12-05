/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com", // existing host
      },
      {
        protocol: "https",
        hostname: "**.cloudinary.com", // ✅ add Cloudinary host
        pathname: "**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

