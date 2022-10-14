/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com", "cf.shopee.com.my", "upload.wikimedia.org"],
  },
};

module.exports = nextConfig;
