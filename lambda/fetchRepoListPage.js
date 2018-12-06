import axios from 'axios';
require('dotenv').config();

export async function handler(event) {
  try {
    const response = await axios({
      url: 'https://api.github.com/graphql',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GITHUB_GRAPHQL_API_TOKEN}`,
      },
      data: JSON.parse(event.body),
    });
    return {
      statusCode: response.status,
      headers: response.headers,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    if (error.response) {
      return {
        statusCode: error.response.status,
        headers: error.response.headers,
        body: JSON.stringify(error.response.data),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: error.message }),
      };
    }
  }
}
