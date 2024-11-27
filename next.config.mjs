/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '', // Leave empty if no specific port is required
        pathname: '/**', // Allow all images from this domain
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '', // Leave empty if no specific port is required
        pathname: '/**', // Allow all images from this domain
      },
    ],
  },
};

export default nextConfig;
