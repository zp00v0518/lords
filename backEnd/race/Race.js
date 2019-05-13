// const mineTypeList = require("../region/mine/Mine.js").typeList;
const Rampart = require('./Rampart');

const Race = {
  typeList: ["rampart", "elf"],
  rampart: Rampart,
  // rampart: {
  //   mine: {
  //     default: [mineTypeList[0], mineTypeList[1], mineTypeList[2], mineTypeList[6]]
  //   }
  // },
  elf: {}
};
module.exports = Race;
