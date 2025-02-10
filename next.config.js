/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['static01.nyt.com'],
    // Add the hostname here 
    unoptimized: true // Required for static export
  },
  output: 'export',
  distDir: process.env.NODE_ENV === "production" ? ".next-prod" : ".next",
  typescript: {
    ignoreBuildErrors: true
  }
};
module.exports = nextConfig;