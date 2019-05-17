const scrape = () => {
  return Array.from(
    document.querySelector(`.wikitable`).firstElementChild.children,
  )
    .slice(1)
    .reduce((acc, node) => {
      const {
        firstElementChild: { lastElementChild: a },
      } = node;
      acc.push({
        name: a.title,
        href: a.href,
      });

      return acc;
    }, []);
};

module.exports = async (page, input) => {
  await page.goto(input[0]);
  await page.waitForNavigation({ waitUntil: `domcontentloaded` });
  return await page.evaluate(scrape);
};
