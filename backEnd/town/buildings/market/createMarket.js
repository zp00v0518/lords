const createBasicBuilding = require('../../createBasicBuilding');
const { document } = require('../../../workWithMongoDB/schema');

function createMarket() {
  const basic = createBasicBuilding(document.class.market, 1);
  basic.work = {
    is: true,
    date: new Date(),
    bonus: 0,
    addValue: 2000
  };
  return basic;
}

module.exports = createMarket;
