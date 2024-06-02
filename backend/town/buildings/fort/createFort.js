const createBasicBuilding = require('../../createBasicBuilding');
const { document } = require('../../../workWithMongoDB/schema');
const workSection = require('../workSection');

function createFort({ lvl = 0, addValue = 0 }) {
  const basic = createBasicBuilding(document.class.fort, lvl);
  basic.work = workSection({addValue});
  return basic;
}

module.exports = createFort;
