const https = require('https');

const urls = [
  "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFFwnVjXDKCjDMktA0mtdELoZy3T6Bj1WdWbMO1rWDHCRXE8OGRz6pm_Ji-q7X6_DBbMrnMslu4LTfEZAYYkDQXrVFqogFzNY-5zQFIGJZq8RB_MsZa6br82vDbioyKzjtfMZK8V1wABOs5w6RqalUv",
  "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFf3VSgyQKsEErrjVX4Pk473HKjtWQQQLjl07yrGUC-13PqbQCnXwAtnRedqBA0N7fUWvv8Ic3dJq9d8uNe1RxYgWfkDdpNk9t4pIpen3FaRwPk0G5oVLiFv7tgqBSm5tbRbVXbxQYW04ai6IPkoUBnosVlLDcqVMlZ",
  "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEaKwv66gb6u_RFh8osWy9igVyMStX7-6hjSaMSjW4b1H7l2XO6RAppdpUxw-fjeYs1afC230i7_F33Fet9piUbqCPuvlDBElBgJcpc7EMP-8eD23WQg-MP8AQUi7B51sD1jEpTn_WdwcRVT1VUbyCDavtruw9aaJmR",
  "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFlUnkxmHufVZz4nFab7kW965occivOAnMsNH-ngt1SzuSwk4Nc1PsusXPJNWsWaaUOiPSKV_2E93OC3N1IlI0Gs6eRR3BI6DUvMC8yWpmFXTEf82a_KEWp2I7_uV3zMhQ2R8QAPObI6LotF_LxfoJChvPdN3x0AMZZMy0Tgn7bIug=",
  "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEIRU4O0MYnmxP8G9FdsHVAk6XbQmWxrVY4McnIBkWxPv5M5uGVHUEinaybDlPc-C7l2SQEfVTPEdNIUE9pyYSSgD1_z0_NuogXu-80oJvQS9UpWj8AK39xUjq5Nq5YL7k3hSYoNjm_BlGgTRKCc8dLfzifzNaTWCiPsTkU2suiQq6CkvXOCg==",
  "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEPeprGw-deuDHFDX9aTHgw90fyTZKSCv88LM8o5x0_1_WMXsJa0k3inK8ama2f5WrFP4fqG-Ulx-mQajpA4pW0_bhPnn42iFbWbvcMEe2YT7nmw0-oMeNMqInL3VpQTuYUF7ToS2wDDqhTZWoR9uM0vBEDP5-U4GGLcuDqySGLOpLV3mQX43mAOCDR4v2-LLPJiLHNVQQeMUqkMd4W2uAu9yav-hgtoWqkYJuwbk6LZX2GpsNc-xj4p6diCFNXXlAweaMvywwMwfrePRJMQLsqc3vVjFNUhPo="
];

async function check(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.headers.location);
    }).on('error', (e) => resolve(e.message));
  });
}

async function run() {
  for (let u of urls) {
    const loc = await check(u);
    console.log('->', loc);
  }
}

run();
