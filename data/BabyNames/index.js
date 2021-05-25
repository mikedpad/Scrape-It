/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const nameUrls = [
  {
    name: `male`,
    url: `https://namecensus.com/male_names_alpha.htm`,
  },
  // {
  //   name: `female`,
  //   url: `https://namecensus.com/female_names_alpha.htm`,
  // },
  // {
  //   name: `surname`,
  //   url: `https://namecensus.com/data/1000.html`,
  // },
];

module.exports = async page => {
  const data = [];

  for (const entry of nameUrls) {
    const { url } = entry;
    await page.goto(url);

    data = await page.evaluate(() => {
      const nodeList = document.querySelectorAll(`#myTable > tbody > tr`);
      return Array.from(nodeList)
        .slice(1)
        .map(({ innerText }) => {
          const [name, frequency, amount, rank] = innerText.split(`\t`);
          return {
            name: name.charAt(0) + name.slice(1).toLowerCase(),
            frequency,
            amount,
            rank,
          };
        });
    });
  }

  return data;
};
