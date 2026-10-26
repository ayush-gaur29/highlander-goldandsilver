const fs = require('fs');

function extract(file) {
  if (!fs.existsSync(file)) return null;
  const html = fs.readFileSync(file, 'utf8');
  const match = html.match(/<script id="hibid-state" type="application\/json">([\s\S]*?)<\/script>/);
  if (!match) return null;
  const json = JSON.parse(match[1]);
  const apollo = json['apollo.state'] || {};
  for (let k of Object.keys(apollo)) {
    if (k.startsWith('Lot:')) {
      const lot = apollo[k];
      return {
        id: lot.id,
        lotNumber: lot.lotNumber,
        lead: lot.lead,
        description: lot.description,
        estimate: lot.estimate,
        bidAmount: lot.bidAmount,
        pictures: lot.pictures?.map(p => ({
          description: p.description,
          fullSizeLocation: p.fullSizeLocation,
          thumbnailLocation: p.thumbnailLocation
        }))
      };
    }
  }
}

console.log('Lot 4:', JSON.stringify(extract('lot_sample_4.html'), null, 2));
