// frontend/next.config.js

const withPWA = require('next-pwa')({
  dest: 'public',
  // Additional PWA options if needed
});

const { withPlugins } = require('next-compose-plugins');
const { withCloudflarePagesAdapter } = require('@cloudflare/next-on-pages');

const nextConfig = {
  reactStrictMode: true,
  // Other Next.js configuration options
};

// Compose your plugins
const composedPlugins = withPlugins(
  [
    withPWA,
    // Add other plugins here if necessary
  ],
  nextConfig
);

// Export the configuration wrapped with the Cloudflare Pages adapter
module.exports = withCloudflarePagesAdapter(composedPlugins);