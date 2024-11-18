/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
          port: '', // Laissez vide si aucune configuration de port n'est nécessaire
          pathname: '/**', // Accepter toutes les images du domaine
        },
      ],
    },
  };
  
  export default nextConfig;
  