const { trimNewlines } = require(`./funcs`);

const scrapeName = () =>
  document.querySelector(`[data-source='Title']`).innerText;

const scrapeImageURI = () =>
  document.querySelector(`.pi-image-thumbnail`).src.split(`/revision`)[0];

const scrapeTitles = async () => {
  const formatTitles = node => {
    node
      .querySelectorAll(`a br`)
      .forEach(n => n.replaceWith(document.createTextNode(` `)));

    return node.innerText;
  };

  const titlesNode = document.querySelector(
    `[data-source='Titles'] .pi-data-value`,
  );

  return titlesNode ? formatTitles(titlesNode) : null;
};

module.exports = async (page, input) => {
  let data = [];
  for (let url of input) {
    await page.goto(url);
    const d = {
      url,
      name: await page.evaluate(scrapeName),
      img: await page.evaluate(scrapeImageURI),
    };
    console.log(`=========================================\n${d.name}`);
    const titles = await page.evaluate(scrapeTitles);
    data.push(
      titles
        ? {
            ...d,
            titles: trimNewlines(titles),
          }
        : d,
    );
  }

  return data;
};
