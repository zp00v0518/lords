function cretateUnit({ name, cost, type, hp, race, lvl = 1 }) {
  return {
    cost,
    hp,
    name,
    type,
    lvl,
    race
  };
}

module.exports = cretateUnit;
