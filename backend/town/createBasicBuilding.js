import upgradeSection from './upgradeSection.js';

function createBasicBuilding(classBuilding, lvl = 0, parent = 'town') {
  const basic = {
    upgrade: upgradeSection(),
    lvl: lvl,
    class: classBuilding,
    parent,
    type: classBuilding
  };
  return basic;
}

module.exports = createBasicBuilding;

export default createBasicBuilding
