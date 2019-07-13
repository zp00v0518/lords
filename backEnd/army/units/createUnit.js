function cretateUnit({ name, cost, type, attak, defense, health }) {
  const param = {
    name,
    cost,
    type,
    attak,
    defense,
    health
  };
  return param;
}

module.exports = cretateUnit;
