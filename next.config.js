/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

rewrites: async () => [
  {
    source: "/public/fivesportsbrandstrends2022.html",
    destination: "/pages/api/fivesportsbrandstrends2022.js",
  },
],

module.exports = nextConfig
