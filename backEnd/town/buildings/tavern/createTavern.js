const createBasicBuilding = require('../../createBasicBuilding');
const { document } = require('../../../workWithMongoDB/schema');

function createTavern() {
  const basic = createBasicBuilding(document.class.tavern, 1);
  basic.work = {
    is: true,
    date: new Date(),
    bonus: 0,
    addValue: 2000
  };
  return basic;
}

module.exports = createTavern;
