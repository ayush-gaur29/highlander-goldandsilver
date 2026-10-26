const fs = require('fs');

const html = fs.readFileSync('lot_sample_1.html', 'utf8');
const match = html.match(/<script id="hibid-state" type="application\/json">([\s\S]*?)<\/script>/);

if (match) {
  const json = JSON.parse(match[1]);
  fs.writeFileSync('lot_sample_1_state.json', JSON.stringify(json, null, 2));
  console.log('Keys in apollo.state:', Object.keys(json['apollo.state'] || {}));
  
  // Find lot keys
  for (let k of Object.keys(json['apollo.state'] || {})) {
    if (k.startsWith('Lot:') || k.startsWith('Auction:')) {
      console.log('Object', k, '->', JSON.stringify(json['apollo.state'][k]).slice(0, 300));
    }
  }
} else {
  console.log('No hibid-state found');
}
