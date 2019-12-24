const createBasicBuilding = require('../../createBasicBuilding');
const { document } = require('../../../workWithMongoDB/schema');
const workSection = require('../workSection');

function createTavern({ lvl = 0, addValue = 0 }) {
  const basic = createBasicBuilding(document.class.tavern, lvl);
  basic.work = workSection({});
  return basic;
}

module.exports = createTavern;
