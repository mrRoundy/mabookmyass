/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gyytvnpsjazrkcfxolxg.supabase.co',
        port: '',
        pathname: '/storage/v1/object/sign/image/**',
      },
    ],
  },
};

module.exports = nextConfig;