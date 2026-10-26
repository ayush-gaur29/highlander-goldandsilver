const https = require('https');
const fs = require('fs');
const path = require('path');

const downloads = [
  {
    url: 'https://cdn.hibid.com/img.axd?id=7923811092&wid=&rwl=false&p=&ext=&w=0&h=0&t=&lp=&c=true&wt=false&sz=MAX&checksum=txL93RL9nKANodP90%2bAfkHPVIhhrSzjX',
    dest: 'assets/items/lot1_morgan_gold_1.jpg'
  },
  {
    url: 'https://cdn.hibid.com/img.axd?id=7923811090&wid=&rwl=false&p=&ext=&w=0&h=0&t=&lp=&c=true&wt=false&sz=MAX&checksum=txL93RL9nKDetfje%2f1vMW6AsGst6vGfV',
    dest: 'assets/items/lot1_morgan_gold_2.jpg'
  },
  {
    url: 'https://cdn.hibid.com/img.axd?id=8006235227&wid=&rwl=false&p=&ext=&w=0&h=0&t=&lp=&c=true&wt=false&sz=MAX&checksum=sRRB3nSO4jwlUYBvGicIcX%2fhXE7b%2bqOB',
    dest: 'assets/items/lot153_morgan_1897_1.jpg'
  },
  {
    url: 'https://cdn.hibid.com/img.axd?id=8006235228&wid=&rwl=false&p=&ext=&w=0&h=0&t=&lp=&c=true&wt=false&sz=MAX&checksum=sRRB3nSO4jz5stZiB4l5WUCAhv9LbNDr',
    dest: 'assets/items/lot153_morgan_1897_2.jpg'
  },
  {
    url: 'https://cdn.hibid.com/img.axd?id=7928715713&wid=&rwl=false&p=&ext=&w=0&h=0&t=&lp=&c=true&wt=false&sz=MAX&checksum=SyTFWyklhSXXOBTXlaBfEuSETckMYOMl',
    dest: 'assets/items/lot9_pilgrim_1921_1.jpg'
  },
  {
    url: 'https://cdn.hibid.com/img.axd?id=7928715714&wid=&rwl=false&p=&ext=&w=0&h=0&t=&lp=&c=true&wt=false&sz=MAX&checksum=SyTFWyklhSUXvCYKuBeAA1eWG0LyzC%2fP',
    dest: 'assets/items/lot9_pilgrim_1921_2.jpg'
  },
  {
    url: 'https://cdn.hibid.com/img.axd?id=8437458910&wid=&rwl=false&p=&ext=&w=0&h=0&t=&lp=&c=true&wt=false&sz=MAX&checksum=stewpyW%2baXtZOn6iIuclgYu3k0UHrrGu',
    dest: 'assets/brand/highlander_catalog_banner.jpg'
  },
  {
    url: 'https://cdn.hibid.com/img.axd?id=8273904970&wid=&rwl=false&p=&ext=&w=0&h=0&t=&lp=&c=true&wt=false&sz=MAX&checksum=qE0V9NtBKEsNrPWJcvRyw1HBzSH9Af9B',
    dest: 'assets/brand/highlander_auction_hero.jpg'
  }
];

function download(item) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(item.dest);
    https.get(item.url, (res) => {
      if (res.statusCode !== 200) {
        console.error(`Failed ${item.dest}: ${res.statusCode}`);
        return resolve(false);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Saved: ${item.dest} (${fs.statSync(item.dest).size} bytes)`);
        resolve(true);
      });
    }).on('error', (err) => {
      fs.unlink(item.dest, () => {});
      console.error(`Error downloading ${item.dest}:`, err.message);
      resolve(false);
    });
  });
}

async function run() {
  for (let item of downloads) {
    await download(item);
  }
}

run();
