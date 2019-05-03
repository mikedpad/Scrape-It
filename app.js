/* eslint-disable no-console */
const fs = require(`fs-extra`);
const puppeteer = require(`puppeteer`);

(async () => {
  const input = process.argv[2]; // This argument provides the input
  const browser = await puppeteer.launch(); // Launch the browser window...
  const page = await browser.newPage(); // ... and open a new tab

  // List of URIs to scrape
  const urls = await fs.readJson(`./data/${input}/input.json`);
  const scrapeFunc = require(`./data/${input}`);

  // Scrape for data
  let data = [];
  for (let url of urls) {
    console.log(url);
    await page.goto(url);
    data.push(await page.evaluate(scrapeFunc));
  }

  await fs.outputJson(`./output/${input}.json`, data, {
    spaces: 2,
  });

  await browser.close();
})();
