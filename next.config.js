/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['static01.nyt.com'],
    // Add the hostname here 
    unoptimized: true // Required for static export
  },
  output: "standalone",
  distDir: process.env.NODE_ENV === "production" ? ".next-prod" : ".next",
  typescript: {
    ignoreBuildErrors: true
  },
  async rewrites() {
    return {
      beforeFiles: [{
        source: '/api/stories',
        destination: '/api/stories'
      }]
    };
  }
};
module.exports = nextConfig;