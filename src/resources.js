const resourceTypes = [
  `stylesheet`,
  `image`,
  `media`,
  `font`,
  `script`,
  `texttrack`,
  `xhr`,
  `fetch`,
  `eventsource`,
  `websocket`,
  `manifest`,
  `other`,
];

function createResourceFilter(types) {
  const typeArgs = types ? types.split(`,`) : [];
  const filteredArgs = resourceTypes.filter(type => !typeArgs.includes(type));
  const joinedArgs = filteredArgs.join(`|`);
  return RegExp(`^(${joinedArgs})$`);
}

module.exports = { createResourceFilter };
