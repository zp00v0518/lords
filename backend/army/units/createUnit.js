function createUnit({ name, cost, type, hp, race, up = 0, lvl }) {
  return {
    cost,
    hp,
    name,
    type,
    lvl,
    race,
    up
  };
}

module.exports = createUnit;
