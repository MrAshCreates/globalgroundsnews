// frontend/next.config.js

const withPWA = require('next-pwa')({
  dest: 'public',
  // Additional PWA options if needed
});

const withCloudflarePages = require('@cloudflare/next-on-pages/with-cloudflare');
const { withPlugins } = require('next-compose-plugins');

module.exports = withPlugins(
  [
    withCloudflarePages,
    withPWA,
    // Add other plugins here if necessary
  ],
  {
    reactStrictMode: true,
    // Other Next.js configuration options
  }
);