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
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
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
  const query = `
    query LotSearch($searchText: String) {
      lotSearch(
        input: {searchText: $searchText}
        pageNumber: 1
        pageLength: 20
      ) {
        pagedResults {
          totalCount
        }
      }
    }
  `;

  let res = await queryGraphQL(query, { searchText: "Gold" });
  console.log('Result:', JSON.stringify(res, null, 2));
}

main().catch(console.error);
