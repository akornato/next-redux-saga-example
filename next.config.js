require('dotenv').config();
const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    // the token is not in git but it's still included in the client build
    // so in a 'real' app we'd either implement client auth or proxy the api
    GITHUB_GRAPHQL_API_TOKEN: process.env.GITHUB_GRAPHQL_API_TOKEN,
  },
  exportPathMap: function() {
    return {
      '/': { page: '/' },
    };
  },
});
