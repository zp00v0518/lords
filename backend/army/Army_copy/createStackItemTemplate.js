function createStackItemTemplate(unit = {}) {
  // const { name, race, lvl, up } = unit;
  const template = {
    race: unit.race || "",
    name: unit.name || "",
    lvl: unit.lvl || -1,
    count: 0,
    up: unit.up || 0
  };
  return template;
}
module.exports = createStackItemTemplate;
