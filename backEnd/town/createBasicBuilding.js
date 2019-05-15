const upgradeSection = require('./upgradeSection');

function createBasicBuilding(classBuilding, parent = 'town') {
  const basic = {
    upgrade: upgradeSection(),
    lvl: 0,
    class: classBuilding,
    parent
  };
  return basic;
}

module.exports = createBasicBuilding;
