const trimNewlines = (s, i = 0) => {
  if (!s) {
    return null;
  }

  switch (true) {
    case s.includes(`\n\n`):
      return trimNewlines(s.replace(`\n\n`, `\n`), ++i);
    case s.includes(`\n(`):
      return trimNewlines(s.replace(`\n(`, ` (`), ++i);
    case s.includes(`\n`):
      return trimNewlines(s.replace(`\n`, `|`), ++i);
    default:
      return s.split(`|`);
  }
};

module.exports = {
  trimNewlines,
};
