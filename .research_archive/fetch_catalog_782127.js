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
  const queryAuction = `
    query AuctionDetails($id: Int!) {
      auction(id: $id) {
        id
        eventName
        description
        eventDateBegin
        eventDateEnd
        biddingNotice
        auctionNotice
        termsAndConditions
        featuredPicture {
          fullSizeLocation
        }
      }
    }
  `;

  const queryLots = `
    query LotsInAuction($auctionId: Int!, $isArchive: Boolean) {
      lotSearch(
        input: {auctionId: $auctionId, isArchive: $isArchive}
        pageLength: 50
        pageNumber: 1
      ) {
        pagedResults {
          totalCount
          results {
            id
            lotNumber
            lead
            description
            estimate
            bidAmount
            featuredPicture {
              fullSizeLocation
              hdThumbnailLocation
              thumbnailLocation
              description
            }
          }
        }
      }
    }
  `;

  console.log('Fetching auction details for 782127...');
  let resA = await queryGraphQL(queryAuction, { id: 782127 });
  fs.writeFileSync('catalog_782127_auction.json', JSON.stringify(resA, null, 2));
  console.log('Auction:', resA.data?.auction?.eventName);

  console.log('Fetching lots for 782127...');
  let resL = await queryGraphQL(queryLots, { auctionId: 782127, isArchive: true });
  fs.writeFileSync('catalog_782127_lots.json', JSON.stringify(resL, null, 2));
  console.log('Lots count:', resL.data?.lotSearch?.pagedResults?.totalCount);
}

main().catch(console.error);
