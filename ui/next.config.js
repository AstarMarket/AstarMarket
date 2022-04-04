/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SHIBUYA_SUBSCAN_URL: process.env.SHIBUYA_SUBSCAN_URL,
  }
}

module.exports = nextConfig
