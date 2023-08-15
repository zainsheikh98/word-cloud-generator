/** @type {import('next').NextConfig} */
const nextConfig = {
  loader: 'graphql-tag/loader',
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['mongoose', '@typegoose/typegoose'],
  },
}

module.exports = nextConfig
