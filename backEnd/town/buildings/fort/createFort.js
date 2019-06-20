const createBasicBuilding = require('../../createBasicBuilding');
const { document } = require('../../../workWithMongoDB/schema');

function createFort({ lvl = 0, addValue = 0 }) {
  const basic = createBasicBuilding(document.class.fort, lvl);
  basic.work = {
    is: false,
    date: new Date(),
    bonus: 0,
    addValue
  };
  return basic;
}

module.exports = createFort;
