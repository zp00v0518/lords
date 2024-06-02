const createBasicBuilding = require('../../createBasicBuilding');
const { document } = require('../../../workWithMongoDB/schema');
const workSection = require('../workSection');

function createMarket({ lvl = 0, addValue = 0 }) {
  const basic = createBasicBuilding(document.class.market, lvl);
  basic.work = workSection({addValue});
  return basic;
}

module.exports = createMarket;
