/* eslint-disable no-console */
const path = require(`path`);
const fs = require(`fs-extra`);
const puppeteer = require(`puppeteer`);
const program = require(`commander`);

program
  .version(`0.0.2`)
  .description(`An app to scrape data from websites`)
  .option(
    `-i, --input <inputFolder>`,
    `Script with instructions on what data to scrape`,
  )
  .option(
    `-o, --output [outputFile]`,
    `File with exported JSON object`,
    `output`,
  )
  .option(
    `-r, --resource-types [list]`,
    `Comma-separated list of resource types`,
  )
  .option(`-n, --no-headless`, `Disables default headless mode`)
  .parse(process.argv);

const regex = (() => {
  const resTypes = [
    `stylesheet`,
    `image`,
    `media`,
    `font`,
    `script`,
    `texttrack`,
    `xhr`,
    `fetch`,
    `eventsource`,
    `websocket`,
    `manifest`,
    `other`,
  ];

  const resTypeArgs = program.resourceTypes
    ? program.resourceTypes.split(`,`)
    : [];

  return RegExp(
    `^(${resTypes.filter(val => !resTypeArgs.includes(val)).join(`|`)})$`,
  );
})();

(async () => {
  const { input, output, headless } = program;

  // Launch the browser window...
  const browser = await puppeteer.launch({
    headless: headless,
    args: [
      //   `--remote-debugging-port=9222`,
      headless ? `--auto-open-devtools-for-tabs` : null,
    ],
  });

  // Open a new tab
  const [page] = await browser.pages();
  // await page.waitFor(3000);

  // Interrupt all requests (by default)
  await page.setRequestInterception(true);
  page.on(`request`, req => {
    if (req.resourceType().match(regex)) {
      req.abort();
    } else {
      req.continue();
    }
  });

  const inputData = await fs.readJson(`./data/${input}/index.json`);

  const scrapeFunc = require(`./data/${input}`);
  const outputData = await scrapeFunc(page, inputData);

  await fs.outputJson(`./output/${output}.json`, outputData, {
    spaces: 2,
  });

  await browser.close();
})();
