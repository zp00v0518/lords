const Resources = require('../resources/Resources');

function createAvailable() {
  const template = {};
  const { types, baseResource, unicResource } = Resources;
  Object.keys(types).forEach(key => {
    const name = types[key];
    if (key === 'gold') {
      template[name] = 30000;
      return;
    }
    if (baseResource.includes(name)) {
      template[name] = 15;
      return;
    }
    if (unicResource.includes(name)) {
      template[name] = 6;
    }
  });
  return template;
}

module.exports = createAvailable;
