const schema = require("../../workWithMongoDB/schema");
const army_types = require("./army_types");
const race_types = require("../../race/types_races");
const rampart_units = require("../units/rampart");
const type = schema.document.class;

const Army = {
  types: army_types,
  armyBuildings: {
    barraks_1: { name: type.barraks + "_1", maxLvl: 2 },
    barraks_2: { name: type.barraks + "_2", maxLvl: 2 },
    barraks_3: { name: type.barraks + "_3", maxLvl: 2 },
    barraks_4: { name: type.barraks + "_4", maxLvl: 2 },
    barraks_5: { name: type.barraks + "_5", maxLvl: 2 },
    barraks_6: { name: type.barraks + "_6", maxLvl: 2 },
    barraks_7: { name: type.barraks + "_7", maxLvl: 2 }
  },
  army_base_range: [1000, 2000],
  race: {
    [race_types.rampart]: rampart_units,
  }
};

module.exports = Army;
