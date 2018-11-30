const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    gitHubToken: '23d380f73d94740763afbf2ddda955cca409f199',
  },
  exportPathMap: function() {
    return {
      '/': { page: '/' },
    };
  },
  webpack(config, { isServer, buildId, dev }) {
    if (!isServer) {
      config.module.rules
        .find(({ test }) => test.test('style.css'))
        .use.push({
          loader: 'css-purify-webpack-loader',
          options: {
            includes: ['./pages/*.js', './components/*.js'],
          },
        });
    }

    return config;
  },
});
