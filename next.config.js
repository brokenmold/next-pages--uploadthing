/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: false,      // Uploadthing
  },
}

module.exports = nextConfig
