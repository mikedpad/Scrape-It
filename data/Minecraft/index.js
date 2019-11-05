const scrape = () => {
  return Array.from(
    document.querySelectorAll(`.wikitable.sortable tr td:first-child`),
  ).reduce((acc, node) => {
    const { lastElementChild: a } = node;
    acc.push({
      name: a.title,
      href: a.href,
    });

    return acc;
  }, []);
};

module.exports = async (page, input) => {
  await page.goto(input[0]);
  return await page.evaluate(scrape);
};
