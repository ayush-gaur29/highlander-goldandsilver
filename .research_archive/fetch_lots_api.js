const https = require('https');
const fs = require('fs');

async function testUrl(path, postData = null) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'hibid.com',
      port: 443,
      path: path,
      method: postData ? 'POST' : 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
        ...(postData ? {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        } : {})
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({ path, statusCode: res.statusCode, data: data.slice(0, 1000) });
      });
    });

    req.on('error', (e) => resolve({ path, error: e.message }));
    if (postData) req.write(postData);
    req.end();
  });
}

async function main() {
  const postBody = JSON.stringify({
    query: "",
    options: {
      auctionId: 782127,
      auctioneerId: null,
      categoryId: null,
      pageNumber: 1,
      pageLength: 20
    }
  });

  const endpoints = [
    ['/v1/search/lot', postBody],
    ['/api/v1/search/lot', postBody],
    ['/v1/search/lots', postBody],
    ['/v1/search/eventitem', postBody],
    ['/v1/lot/search', postBody]
  ];

  for (let [ep, body] of endpoints) {
    let res = await testUrl(ep, body);
    console.log(ep, res.statusCode, res.data ? res.data.slice(0, 150) : res.error);
  }
}

main().catch(console.error);
