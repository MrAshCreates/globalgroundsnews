const withPWA = require('next-pwa')({
  dest: 'public',
});

const { withPlugins } = require('next-compose-plugins');

const nextConfig = {
  reactStrictMode: true,
};

const composedPlugins = withPlugins([withPWA], nextConfig);

// Bundle optimization
module.exports = {
  ...composedPlugins,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.optimization.splitChunks = false; // Disable splitChunks for server-side
      config.externals = config.externals || [];
      config.externals.push({
        // Exclude unnecessary server-side dependencies
      });
    }
    return config;
  },
  compress: true, // Enable gzip compression
};