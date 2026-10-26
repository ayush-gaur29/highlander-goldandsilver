const fs = require('fs');

function scanFile(filename) {
  if (!fs.existsSync(filename)) return;
  const content = fs.readFileSync(filename, 'utf8');
  console.log(`\n=== Scanning ${filename} ===`);
  
  // Find lot URLs
  const lotUrls = content.match(/\/lot\/\d+\/[a-z0-9-]+/gi) || [];
  const uniqueLots = Array.from(new Set(lotUrls));
  console.log(`Found ${uniqueLots.length} lot links:`);
  uniqueLots.slice(0, 15).forEach(l => console.log(' ', l));

  // Find image URLs
  const imgUrls = content.match(/https:\/\/cdn\.hibid\.com\/img\.axd\?id=\d+[^"'\s&]+/g) || [];
  const uniqueImgs = Array.from(new Set(imgUrls));
  console.log(`Found ${uniqueImgs.length} image URLs`);
}

scanFile('catalog_782127.html');
scanFile('auction_707382.html');
scanFile('hibid_company.html');
