const https = require('https');

async function queryGraphQL(query, variables = {}) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ query, variables });
    const options = {
      hostname: 'hibid.com',
      port: 443,
      path: '/graphql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ raw: data, statusCode: res.statusCode });
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function main() {
  const schemaQuery = `
    query {
      __type(name: "AuctionMatch") {
        name
        fields {
          name
        }
      }
    }
  `;
  const schemaRes = await queryGraphQL(schemaQuery);
  console.log('Result:', JSON.stringify(schemaRes));
}

main().catch(console.error);
