const withPWA = require('next-pwa')({
  dest: 'public',
});

const { withPlugins } = require('next-compose-plugins');

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    modularizeImports: {
      lodash: {
        transform: 'lodash/{{member}}',
      },
    },
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxSize: 200000, // Reduce the maximum chunk size to 200 KB
      };
      config.externals = [...config.externals, /^pg$/, /^mysql$/, /^sqlite3$/, /^mongodb$/]; // Example of excluding large server-side packages
    }
    return config;
  },
  compress: true, // Enable compression for the build
};

module.exports = withPlugins([withPWA], nextConfig);