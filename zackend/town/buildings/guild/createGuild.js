const createBasicBuilding = require('../../createBasicBuilding');
const { document } = require('../../../workWithMongoDB/schema');
const workSection = require('../workSection');

function createGuild({ lvl = 0, addValue = 0 }) {
  const basic = createBasicBuilding(document.class.guild, lvl);
  basic.work = workSection({addValue});
  return basic;
}

module.exports = createGuild;
