function cretateUnit({ name, cost, type, health, race, lvl = 1 }) {
  return {
    cost,
    health,
    name,
    type,
    lvl,
    race
  };
}

module.exports = cretateUnit;
