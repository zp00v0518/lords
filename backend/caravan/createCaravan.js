const schema = require('../workWithMongoDB/schema');
const Caravan = require('./Caravan');

function createCaravan() {
  const template = {
    class: schema.document.class.caravan
  };
  const { available } = Caravan;
  Object.keys(available).forEach(key => {
    const name = available[key];
    template[name] = 0;
  });
  return template;
}

module.exports = createCaravan;
