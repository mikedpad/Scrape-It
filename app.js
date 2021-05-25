const fs = require(`fs-extra`);
const puppeteer = require(`puppeteer`);
const { Command } = require(`commander`);
const { createResourceFilter } = require(`./src/resources`);

const program = new Command()
  .version(`0.0.3`)
  .description(`An app to scrape data from websites`)
  .requiredOption(`-i, --input <filename>`)
  .requiredOption(`-o, --output [filename]`)
  .option(
    `-r, --resource-types [list]`,
    `Comma-separated list of resource types`,
  )
  .option(`-n, --no-headless`, `Disables default headless mode`)
  .parse(process.argv);

async function scrapeFile() {
  const { input, output, headless } = program.opts();

  // Launch the browser window...
  const browser = await puppeteer.launch({
    headless: !!headless,
    // args: [
    //   //   //   `--remote-debugging-port=9222`,
    //   headless ? `--auto-open-devtools-for-tabs` : null,
    // ],
  });

  // Open a new tab
  const [page] = await browser.pages();
  // await page.waitFor(3000);

  // Interrupt all requests (by default)
  const avoidedResources = createResourceFilter(program.resourceTypes);
  await page.setRequestInterception(true);
  page.on(`request`, req => {
    if (req.resourceType().match(avoidedResources)) {
      req.abort();
    } else {
      req.continue();
    }
  });

  const outputData = await require(`./data/${input}`)(page);
  await fs.outputJson(`./output/${output}.json`, outputData, {
    spaces: 2,
  });

  await browser.close();
}

(async () => {
  scrapeFile().catch(err => {
    console.error(err);
    process.exit(1);
  });
})();
