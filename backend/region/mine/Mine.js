const resources = require("../../resources/Resources");
const schema = require("../../workWithMongoDB/schema");
const config = require("../../config");

const Mine = {
  classInstance: schema.document.class.mine,
  valueUpgrade: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
  valueMining: {
    gold: 2000,
    wood: 2,
    ore: 2,
    gem: 1,
    sulfur: 1,
    crystal: 1,
    mercury: 1
  },
  typeList: resources.typeList,
  parent: "region",
  // возвращает время в течении которого будет проводиться улучшение, в милисекундах
  getTimeUpgrade: function(lvl, persent) {
    lvl += 1;
    // увеличиваю время на множитель, если процент <  100
    persent = persent < 100 ? 100 + (persent - 100) * 1.5 : persent;
    // переворачиваю значение, т.к при движении ползунка время должно уменьшаться, а стоимость расти
    persent = 100 - (persent - 100);
    let sec = config.time.sec / config.time.speedGame;
    let minute = config.time.minute / config.time.speedGame;
    let lvl2 = minute * 20;
    if (lvl > 1) {
      let result = lvl2; // c первого на второй лвл
      for (let i = 2; i < lvl; i++) {
        result = lvl2 * 2.1;
        lvl2 = result;
      }
      return (result / 100) * persent;
    } else if (lvl <= 1) {
      return ((sec * 40) / 100) * persent;
    }
  },
  getResourcesForUpgrade(lvl, persent) {
    lvl += 1;
    persent = persent > 100 ? 100 + (persent - 100) * 1.5 : persent;
    const value = ((this.valueUpgrade[lvl] * 1000) / 100) * persent;
    if (!value) {
      return false;
    }
    return [
      {
        resource: resources.typeList[0],
        value: +value.toFixed(0)
      }
    ];
  }
};

module.exports = Mine;
