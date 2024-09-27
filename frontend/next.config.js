const withPWA = require('next-pwa')({
  dest: 'public',
});

const { withPlugins } = require('next-compose-plugins');

const nextConfig = {
  reactStrictMode: true,
};

const composedPlugins = withPlugins([withPWA], nextConfig);

// Code-splitting and bundle optimization
module.exports = {
  ...composedPlugins,
  experimental: {
    modularizeImports: {
      lodash: {
        transform: 'lodash/{{member}}',
      },
    },
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.optimization.splitChunks = false; // Disable splitChunks for server to reduce size
    }
    return config;
  },
  compress: true, // Enable compression for the build
};