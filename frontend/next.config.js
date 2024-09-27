// frontend/next.config.js
/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  // Your existing Next.js config options here
};

module.exports = withPWA(nextConfig);