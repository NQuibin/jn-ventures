/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yrqgssyewhmofkpeyakd.supabase.co',
      },
    ],
  },
}

module.exports = nextConfig
