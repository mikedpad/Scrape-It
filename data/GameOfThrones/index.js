/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const characterUrls = [
  `https://gameofthrones.fandom.com/wiki/Jon_Snow`,
  `https://gameofthrones.fandom.com/wiki/Sansa_Stark`,
  `https://gameofthrones.fandom.com/wiki/Arya_Stark`,
  `https://gameofthrones.fandom.com/wiki/Bran_Stark`,
  `https://gameofthrones.fandom.com/wiki/Cersei_Lannister`,
  `https://gameofthrones.fandom.com/wiki/Jaime_Lannister`,
  `https://gameofthrones.fandom.com/wiki/Tyrion_Lannister`,
  `https://gameofthrones.fandom.com/wiki/Daenerys_Targaryen`,
  `https://gameofthrones.fandom.com/wiki/Yara_Greyjoy`,
  `https://gameofthrones.fandom.com/wiki/Theon_Greyjoy`,
  `https://gameofthrones.fandom.com/wiki/Euron_Greyjoy`,
  `https://gameofthrones.fandom.com/wiki/Melisandre`,
  `https://gameofthrones.fandom.com/wiki/Jorah_Mormont`,
  `https://gameofthrones.fandom.com/wiki/Sandor_Clegane`,
  `https://gameofthrones.fandom.com/wiki/Gregor_Clegane`,
  `https://gameofthrones.fandom.com/wiki/Samwell_Tarly`,
  `https://gameofthrones.fandom.com/wiki/Gilly`,
  `https://gameofthrones.fandom.com/wiki/Sam`,
  `https://gameofthrones.fandom.com/wiki/Varys`,
  `https://gameofthrones.fandom.com/wiki/Brienne_of_Tarth`,
  `https://gameofthrones.fandom.com/wiki/Davos_Seaworth`,
  `https://gameofthrones.fandom.com/wiki/Bronn`,
  `https://gameofthrones.fandom.com/wiki/Podrick_Payne`,
  `https://gameofthrones.fandom.com/wiki/Tormund`,
  `https://gameofthrones.fandom.com/wiki/Grey_Worm`,
  `https://gameofthrones.fandom.com/wiki/Gendry`,
  `https://gameofthrones.fandom.com/wiki/Beric_Dondarrion`,
  `https://gameofthrones.fandom.com/wiki/Drogon`,
  `https://gameofthrones.fandom.com/wiki/Rhaegal`,
  `https://gameofthrones.fandom.com/wiki/Lyanna_Mormont`,
  `https://gameofthrones.fandom.com/wiki/Missandei`,
  `https://gameofthrones.fandom.com/wiki/Qyburn`,
  `https://gameofthrones.fandom.com/wiki/Ghost`,
  `https://gameofthrones.fandom.com/wiki/Summer`,
  `https://gameofthrones.fandom.com/wiki/Nymeria_(direwolf)`,
  `https://gameofthrones.fandom.com/wiki/Edmure_Tully`,
  `https://gameofthrones.fandom.com/wiki/Meera_Reed`,
  `https://gameofthrones.fandom.com/wiki/Jaqen_H%27ghar`,
  `https://gameofthrones.fandom.com/wiki/Hot_Pie`,
  `https://gameofthrones.fandom.com/wiki/Yohn_Royce`,
  `https://gameofthrones.fandom.com/wiki/Daario_Naharis`,
  `https://gameofthrones.fandom.com/wiki/Eddison_Tollett`,
];

function trimNewlines(str) {
  // Remove sequential newline characters
  if (str.includes(`\n\n`)) {
    return trimNewlines(str.replace(`\n\n`, `\n`));
  }
  // Edge-case where newline precedes `(`
  if (str.includes(`\n(`)) {
    return trimNewlines(str.replace(`\n(`, ` (`));
  }
  // Replace single newline character with pipe
  if (str.includes(`\n`)) {
    return trimNewlines(str.replace(`\n`, `|`));
  }
  return str.split(`|`);
}

function scrape({ selectors }) {
  const nameNode = document.querySelector(selectors.name);
  const imageNode = document.querySelector(selectors.image);
  const titleNode = document.querySelector(selectors.title);

  const out = {
    name: nameNode.innerText,
    image: imageNode.src.split(`/revision`)[0],
  };

  if (titleNode) {
    const titles = titleNode.querySelectorAll(`a br`);
    titles.forEach(n => n.replaceWith(document.createTextNode(` `)));
    out.titles = titles.innerText;
  }

  return out;
}

// function scrapeName() {
//   return document.querySelector(`[data-source='Title']`).innerText;
// }

// function scrapeImageURI() {
//   return document
//     .querySelector(`.pi-image-thumbnail`)
//     .src.split(`/revision`)[0];
// }

// function scrapeTitles() {
//   function formatTitles(node) {
//     node
//       .querySelectorAll(`a br`)
//       .forEach(n => n.replaceWith(document.createTextNode(` `)));

//     return node.innerText;
//   }
//   // const titles = document.querySelector(
//   //   `[data-source='Titles'] .pi-data-value`,
//   // );

//   return titles ? formatTitles(titles) : undefined;
// }

module.exports = async page => {
  const data = [];
  const selectors = {
    name: `[data-source='Title']`,
    image: `.pi-image-thumbnail`,
    title: `[data-source='Titles'] .pi-data-value`,
  };

  for (const url of characterUrls) {
    await page.goto(url);
    const { name, image, titles } = await page.evaluate(scrape, { selectors });
    data.push({
      name,
      url,
      image,
      titles: titles ? trimNewlines(titles) : [],
    });
  }

  return data;
};
