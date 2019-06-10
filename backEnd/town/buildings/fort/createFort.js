const createBasicBuilding = require('../../createBasicBuilding');
const { document } = require('../../../workWithMongoDB/schema');

function createFort() {
  const basic = createBasicBuilding(document.class.fort, 1);
  basic.work = {
    is: true,
    date: new Date(),
    bonus: 0,
    addValue: 2000
  };
  return basic;
}

module.exports = createFort;
