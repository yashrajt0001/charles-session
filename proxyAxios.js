// proxyAxios.js
const axios = require('axios');
const { HttpsProxyAgent } = require('https-proxy-agent');
const https = require('https');

// Replace with your proxy credentials
const proxyUrl = 'https://99.79.124.70:80'; // Replace with your proxy URL

// Set up the proxy agent
const agent = new HttpsProxyAgent(proxyUrl);

// Set up a custom HTTPS agent with additional options to handle SSL issues (like self-signed certificates)
const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // Disable SSL verification (use with caution)
  secureProtocol: 'TLSv1_2_method', // Force TLSv1.2 (commonly supported)
});

// Monkey-patch axios global agent with the proxy and custom HTTPS agent
axios.defaults.httpsAgent = httpsAgent;
axios.defaults.proxy = false; // Disable axios' default proxy handling

// Attach the proxy agent to requests
axios.defaults.httpAgent = agent;

module.exports = axios;
