const mineTypeList = require("../region/mine/Mine.js").mineTypeList;

const Race = {
  typeList: ["castle", "elf"],
  castle: {
    mine: {
      default: [mineTypeList[0], mineTypeList[1], mineTypeList[2], mineTypeList[6]]
    }
  },
  elf: {}
};
module.exports = Race;
