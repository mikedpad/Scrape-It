const scrapeNames = () => {
  const names = Array.from(
    document.querySelectorAll(`#myTable tr td:first-child`),
  )
    .filter((_, i) => i < 300)
    .map(
      ({ innerText }, i) =>
        innerText.charAt(0) + innerText.slice(1).toLowerCase(),
    );

  return names;
};

module.exports = async (page, input) => {
  let data = {};

  for (let entry of input) {
    const { url, name } = entry;
    await page.goto(url);
    data = {
      ...data,
      [name]: await page.evaluate(scrapeNames),
    };
  }

  return data;
};
