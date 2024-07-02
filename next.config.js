/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "async-network.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "polygonscan.com"
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com"
      }
    ],
  },
};

module.exports = nextConfig;