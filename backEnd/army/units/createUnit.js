function cretateUnit({ name, cost, type, health, lvl = 1 }) {
  return {
    cost,
    health,
    name,
    type,
    lvl
  };
}

module.exports = cretateUnit;
