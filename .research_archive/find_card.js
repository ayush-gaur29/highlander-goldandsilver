const fs = require('fs');

const content = fs.readFileSync('armorer_index.js', 'utf8');

const funcIdx = content.indexOf('function $b(');
console.log(content.slice(funcIdx, funcIdx + 2000));
