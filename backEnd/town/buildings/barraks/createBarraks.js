const createBasicBuilding = require('../../createBasicBuilding');
const { document } = require('../../../workWithMongoDB/schema');
const workSection = require('../workSection');

function createBarraks({ lvl = 0, addValue = 0 }) {
  const basic = createBasicBuilding(document.class.barraks, lvl);
  basic.work = workSection({addValue, static: false});
  return basic;
}

module.exports = createBarraks;
