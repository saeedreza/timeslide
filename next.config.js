/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['static01.nyt.com'],
  },
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

export default nextConfig;