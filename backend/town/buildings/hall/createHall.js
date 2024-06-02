const createBasicBuilding = require('../../createBasicBuilding');
const { document } = require('../../../workWithMongoDB/schema');
const workSection = require('../workSection');

function createHall() {
  const basic = createBasicBuilding(document.class.hall, 1);
  basic.work = workSection({});
  return basic;
}

module.exports = createHall;
