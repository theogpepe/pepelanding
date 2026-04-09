/** @type {import('next').NextConfig} */
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig = {
  output: "export",
  reactStrictMode: true,
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

module.exports = nextConfig;
