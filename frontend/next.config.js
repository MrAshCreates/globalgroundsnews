// frontend/next.config.js

const withPWA = require('next-pwa')({
  dest: 'public',
  // Additional PWA options if needed
});

const { withCloudflare } = require('@cloudflare/next-on-pages/plugin');
const { withPlugins } = require('next-compose-plugins');

module.exports = withPlugins(
  [
    withPWA,
    withCloudflare,
    // Add other plugins here if necessary
  ],
  {
    reactStrictMode: true,
    // Other Next.js configuration options
  }
);