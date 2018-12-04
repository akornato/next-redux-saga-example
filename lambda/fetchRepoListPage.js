import axios from 'axios';
require('dotenv').config();

export function handler(event, context, callback) {
  axios({
    url: 'https://api.github.com/graphql',
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GITHUB_GRAPHQL_API_TOKEN}`,
    },
    data: JSON.parse(event.body),
  })
    .then(function(response) {
      callback(null, {
        statusCode: response.status,
        headers: response.headers,
        body: JSON.stringify(response.data),
      });
    })
    .catch(function(error) {
      if (error.response) {
        callback(null, {
          statusCode: error.response.status,
          headers: error.response.headers,
          body: JSON.stringify(error.response.data),
        });
      } else if (error.request) {
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        callback(null, {
          statusCode: 404,
          body: error.message,
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log(error.message);
        callback(null, {
          statusCode: 500,
          body: error.message,
        });
      }
    });
}
