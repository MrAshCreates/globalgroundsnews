const withPWA = require('next-pwa')({
  dest: 'public',
});

const { withPlugins } = require('next-compose-plugins');

const nextConfig = {
  reactStrictMode: true,
};

const composedPlugins = withPlugins([withPWA], nextConfig);

module.exports = composedPlugins;
module.exports = {
  experimental: {
    modularizeImports: {
      lodash: {
        transform: 'lodash/{{member}}',
      },
    },
  },
};
module.exports = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.optimization.splitChunks = false;
    }
    return config;
  },
};
module.exports = {
  compress: true,
};