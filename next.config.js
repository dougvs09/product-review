/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'product-review-uploads.s3.sa-east-1.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
