const https = require('https');

const urls = [
  "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFfjC1GsGBQ3LeOZ5B-FlSfu_UjcoOV85vu2L1w_aC9ioEdkirk7DwbDLuy7NbQcG2swUVKA-dWLUn-Glf4ZMZQ38FuVzZqtFLGyGPy89IncVpO9EyGdiRWbdCKFpD_Bjpkm_T5pQt6csfxNfxKTC0-gA==",
  "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE-fp2jTrV9Gpyzuc8bWC0ffnu7MjkMgQCqvPHTAGzOYiQAH-k7IVXYqR24wDQ5QBh38EAbyLf4mw3e-R8bwdgPJv9wbGaDrwNMtbgq6cOyFf_7tuJ_x24FYUKrB7JRHLqNTufp_ULpCvyqiS2TLWGMlfLGarfLfGnKWw=="
];

async function check(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.headers.location);
    }).on('error', (e) => resolve(e.message));
  });
}

async function run() {
  for (let u of urls) {
    const loc = await check(u);
    console.log('->', loc);
  }
}

run();
