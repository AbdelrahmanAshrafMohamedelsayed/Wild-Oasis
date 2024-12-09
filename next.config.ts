import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flckupkpcwnkmelxubmv.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/cabin-images/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Added this line
        port: '',
        pathname: '/**', // Adjusted pathname to allow all paths
      },
    ],
  },
};

export default nextConfig;
