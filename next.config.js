const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
  },
  exportPathMap: function() {
    return {
      '/': { page: '/' },
    };
  },
});
