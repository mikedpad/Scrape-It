module.exports = () => {
  const stripAndSplit = str => {
    if (str.includes(`\n\n`)) {
      return stripAndSplit(str.replace(`\n\n`, `\n`));
    }
    if (str.includes(`\n(`)) {
      return stripAndSplit(str.replace(`\n(`, ` (`));
    }
    if (str.includes(`\n`)) {
      return stripAndSplit(str.replace(`\n`, `|`));
    }

    return str.split(`|`);
  };

  const formatTitles = node => {
    node
      .querySelectorAll(`a br`)
      .forEach(n =>
        n.parentElement.replaceChild(document.createTextNode(` `), n),
      );

    return node.innerText;
  };

  const titlesNode = document.querySelector(
    `[data-source='Titles'] .pi-data-value`,
  );

  return {
    url: document.URL,
    name: document.querySelector(`[data-source='Title']`).innerText,
    img: document
      .querySelector(`.pi-image-thumbnail`)
      .src.split(`/revision`)[0],
    titles: titlesNode ? stripAndSplit(formatTitles(titlesNode)) : [],
  };
};
