const https = require('https');

const url = "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE5ltcjI0hlEAedgP3lKu5BjUWlbI8lqCA8prp3jcDTdR83ja1qPL98KUXjuaT9Hf6qfhLp-7MdFttT-Aq1M23zd3PzdDxd07nz75NvJbJm0064UXYQi7bWZoTIK4lB8P_h8aXzYJef2s8V2DVUYROaCFe8ehT8UL-w8EN-ALHaDWjkGlDyqTtB5FOYXEzEq3zgZjI3wPJj38eN7_M=";

https.get(url, (res) => {
  console.log('Status code:', res.statusCode);
  console.log('Location:', res.headers.location);
});
