const fs = require('fs');

const content = fs.readFileSync('hibid_main.js', 'utf8');

const idx = content.indexOf('AuctionsByAuctioneerSearch');
if (idx !== -1) {
  console.log(content.slice(idx - 50, idx + 800));
}
