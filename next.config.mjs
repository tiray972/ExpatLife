import CopyPlugin from 'copy-webpack-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new CopyPlugin({
          patterns: [
            { from: 'public/sw.js', to: 'public/' },
          ],
        })
      );
    }
    return config;
  },
};

export default nextConfig;
