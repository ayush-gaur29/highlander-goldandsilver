const https = require('https');

const urls = [
  "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE5ltcjI0hlEAedgP3lKu5BjUWlbI8lqCA8prp3jcDTdR83ja1qPL98KUXjuaT9Hf6qfhLp-7MdFttT-Aq1M23zd3PzdDxd07nz75NvJbJm0064UXYQi7bWZoTIK4lB8P_h8aXzYJef2s8V2DVUYROaCFe8ehT8UL-w8EN-ALHaDWjkGlDyqTtB5FOYXEzEq3zgZjI3wPJj38eN7_M=",
  "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFiVgSmOrqCXa7jzY6HOp67kJH25n--wWR49LliTk_aGvUpkbwSr5FOpTVwjXmV-o5T1SJTRdztDgGbp8LCWhIKXg4vo3NkauzE2ZZjY67Z1ENIqBCh3op-lUY98ht7IzLFoSuqiKDvjzJBTooCXfYJKmvLdrPwyhRq",
  "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGz2bAnQOfv1Vh6IxR_h_7cSjPqOFU2xgNRHAOcFUUPC1Vp3nuKZpIgp_Tu5747ZSBVGcv_YvQLYkFpnABxRXCzbgWNgxGiGyL0So46i6ZroKHMtkwQoZDNGlXemgiF2ATV9jUMI5wXPw28SXpyCV6UvowoAvNHHyjB8i22jybwFyuylp8V6Q==",
  "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGoE9DJtQwU5ptfKzcEIqRckQ-lRX77dHkJ-Iu5vZEt8pGxaePrxZHIc1HENdpKgzNllWkylNtgpgotwQ1b2ihTNk3-5QD1hNQPYtIQOUlNK9qfDYNWMUtqpkyWSFcGmC1pMqMtFaLx07qaj-O3nAdBfbfdacjBCX1ldA==",
  "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGazJsS6PE2UtML-4t3ar-o67RMHIiKgzGx3UCNXiZVpA9us0bjjTvJj5uGtRhkXGyjoX8eSL-rVxRMOGIKdm_Ljy7uSuMVM0iz6XO60UjQGNu1IP8ZnNKA1Abrflhg5LmOwx4OMbpJoYAz5BCyLTrfjXXxaArHbnVlD0zUSl2Bt5Y0",
  "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGvoGUMkjZfKUYlRMDM2j3D4MC6wXYxYUPdtfPRA98vGTlg-8dFoB4-sDWgKIGt2ydUWofsAK-kmJrfaGlDTcRJjRc1Iw4eSQ_39ELcJ8vbVnWUGSs5-De5n6V1rZg4l-9eedggLBV2YMGwE_o46t661ukAQV3PdNMEkpV9x6uJ18eF",
  "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGe-bgmTBVkFSvIbAUfTxLzX5HCEQNOwmcOusNmHYNmKoucDZeDqPh0SzkTdUQa15L8YWy2_bpvb7x2XPg9zQClwiYgG8GGll6F-ZuUAWwrsDBZvYZaTuelE1JDgNw2qIJRPxKqlHxjqCtcaWpGrjsupLGcm7pOcStBGmp_wdy2sngAWBN2",
  "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQESdaF2A3wy8oGR9VO7nq8xsJ1sStmTmaN_7uipvYpJfRAFMnEpaHhwaZma0RRq6jZK2PXaEq0PAvGIFUzamCcwQAVbV3Y2lnO4jI1Jodl4s66HaTEA7sQJflAPnjCs8O36QOFFgHvkNa08svaACV0LOmREhF46Zgd03PDt95IqGpNCd7kkNOEUxA3RNuaFwA=="
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
