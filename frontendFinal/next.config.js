/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  env: {
    SERVIDOR: process.env.SERVIDOR
  },
};