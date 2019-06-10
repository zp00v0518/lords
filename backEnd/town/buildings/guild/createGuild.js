const createBasicBuilding = require('../../createBasicBuilding');
const { document } = require('../../../workWithMongoDB/schema');

function createGuild() {
  const basic = createBasicBuilding(document.class.guild, 1);
  basic.work = {
    is: true,
    date: new Date(),
    bonus: 0,
    addValue: 2000
  };
  return basic;
}

module.exports = createGuild;
