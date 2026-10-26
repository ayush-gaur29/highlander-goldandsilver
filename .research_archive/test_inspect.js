const fs = require('fs');

async function main() {
  const code = fs.readFileSync('armorer_collection_js.js', 'utf8');
  console.log('Collection component parsed');
}
main();
