const fs = require('fs');
const content = fs.readFileSync('armorer_index.js', 'utf8');

const regex = /function \$b\([^)]*\)\{[\s\S]*?\}\s*function/g;
const match = regex.exec(content);
if (match) {
  console.log(match[0]);
} else {
  const idx = content.lastIndexOf('function $b(');
  console.log('Last idx:', idx);
  console.log(content.slice(idx, idx + 1000));
}
