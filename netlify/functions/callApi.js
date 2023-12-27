// netlify/functions/callApi.js
const axios = require('axios');

exports.handler = async (event) => {
  try {
    // Validate that the request method is GET
    if (event.httpMethod !== 'GET') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    // Parse the request body
    const data = JSON.parse(event.body);

    // Check if required parameters are present
    if (!data.apiKey) {
      return { statusCode: 400, body: 'Missing required parameters' };
    }

    // Your API endpoint
    const apiUrl = 'https://api.forthcrm.com/v1/contacts/885728210/debts/enrolled';

    // Make the API request
    const response = await axios.post(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'API-Key': '0db948a6-50f1-d9f3-4579-4f8036dc3830',
      },
    });

    // Log the API response
    console.log(response.data);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'API request successful', data: response.data }),
    };
  } catch (error) {
    console.error('Error calling API:', error.response ? error.response.data : error.message);

    return {
      statusCode: error.response ? error.response.status : 500,
      body: JSON.stringify({ message: 'Error calling API', error: error.message }),
    };
  }
};