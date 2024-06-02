function createUnit({ unitInfo, cost, type, hp, race, up = 0, lvl }) {
  const { name, building } = unitInfo;
  return {
    cost,
    hp,
    name,
    type,
    lvl,
    race,
    up,
    building
  };
}

module.exports = createUnit;
