const createBasicBuilding = require('../../createBasicBuilding');
const { document } = require('../../../workWithMongoDB/schema');

function createMarket({ lvl = 0, addValue = 0 }) {
  const basic = createBasicBuilding(document.class.market, lvl);
  basic.work = {
    is: false,
    date: new Date(),
    bonus: 0,
    addValue,
  };
  return basic;
}

module.exports = createMarket;
