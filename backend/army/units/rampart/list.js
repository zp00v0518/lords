const Town = require("../../../town/Town");
const { listBuildings } = Town;

const list = {
  kentavr: { name: "kentavr", building: listBuildings.barraks_1.name },
  kentavr_2: { name: "kentavr_2", building: listBuildings.barraks_1.name },
  gnom: { name: "gnom", building: listBuildings.barraks_2.name },
  gnom_2: { name: "gnom_2", building: listBuildings.barraks_2.name },
  elf: { name: "elf", building: listBuildings.barraks_3.name },
  elf_2: { name: "elf_2", building: listBuildings.barraks_3.name },
  pegas: { name: "pegas", building: listBuildings.barraks_4.name },
  pegas_2: { name: "pegas_2", building: listBuildings.barraks_4.name },
  dendroid: { name: "dendroid", building: listBuildings.barraks_5.name },
  dendroid_2: { name: "dendroid_2", building: listBuildings.barraks_5.name },
  unicorn: { name: "unicorn", building: listBuildings.barraks_6.name },
  unicorn_2: { name: "unicorn_2", building: listBuildings.barraks_6.name },
  green_dragon: {
    name: "green_dragon",
    building: listBuildings.barraks_7.name
  },
  green_dragon_2: {
    name: "green_dragon_2",
    building: listBuildings.barraks_7.name
  }
};

module.exports = list;
