const scrape = () =>
  Array.from(
    document.querySelectorAll(
      `#mw-content-text > div > div:nth-child(26) > div.collapsible-content > div > ul li`,
    ),
  ).reduce(
    (acc, { lastElementChild: { title, href } }) => [...acc, { title, href }],
    [],
  );

module.exports = async page => {
  await page.goto(`https://minecraft.gamepedia.com/Block`);
  return page.evaluate(scrape);
};
