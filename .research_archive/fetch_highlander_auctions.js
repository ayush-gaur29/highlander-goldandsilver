const https = require('https');
const fs = require('fs');

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
  const query = `
    query AuctionsByAuctioneerSearch($auctioneerId: Int, $status: AuctionLotStatus = null, $pageNumber: Int, $pageLength: Int) {
      auctionSearch(
        input: {auctioneerId: $auctioneerId, status: $status}
        pageNumber: $pageNumber
        pageLength: $pageLength
      ) {
        pagedResults {
          pageLength
          pageNumber
          totalCount
          filteredCount
          results {
            matchinglotcount
            auction {
              id
              eventName
              description
              eventDateBegin
              eventDateEnd
              lotCount
              biddingNotice
              auctionNotice
            }
          }
        }
      }
    }
  `;

  console.log('Running query with status null...');
  let res = await queryGraphQL(query, {
    auctioneerId: 149899,
    status: null,
    pageNumber: 1,
    pageLength: 25
  });
  console.log('Result:', JSON.stringify(res, null, 2));
}

main().catch(console.error);
