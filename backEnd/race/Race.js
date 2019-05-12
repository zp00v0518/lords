const mineTypeList = require("../region/mine/Mine.js").typeList;

const Race = {
  typeList: ["rampart", "elf"],
  rampart: {
    mine: {
      default: [mineTypeList[0], mineTypeList[1], mineTypeList[2], mineTypeList[6]]
    }
  },
  elf: {}
};
module.exports = Race;
