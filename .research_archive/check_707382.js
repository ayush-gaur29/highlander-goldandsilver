const fs = require('fs');

const html = fs.readFileSync('auction_707382.html', 'utf8');
const match = html.match(/<script id="hibid-state" type="application\/json">([\s\S]*?)<\/script>/);

if (match) {
  const json = JSON.parse(match[1]);
  const apollo = json['apollo.state'] || {};
  console.log('Auction 707382:', JSON.stringify(apollo['Auction:707382'], null, 2));
}
