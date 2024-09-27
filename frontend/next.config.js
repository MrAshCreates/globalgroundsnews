const withPWA = require('next-pwa')({
  dest: 'public',
});

const { withPlugins } = require('next-compose-plugins');

const nextConfig = {
  reactStrictMode: true,
};

const composedPlugins = withPlugins([withPWA], nextConfig);

module.exports = composedPlugins;