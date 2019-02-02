const resources = require("../../resources/Resources");

const Mine = {
  valueUpgrade: [1, 2, 3, 5, 8, 13, 21, 34, 55],
  typeList: resources.typeList,
  parent: "region",
  //возвращает время в течении которого будет проводиться улучшение, в милисекундах
  getTimeUpgrade: function(lvl, persent) {
    //увеличиваю время на множитель, если процент <  100
    persent = persent < 100 ? 100 + (persent - 100) * 1.5 : persent;
    //переворачиваю значение, т.к при движении ползунка время должно уменьшаться, а стоимость расти
    persent = 100 - (persent - 100);
    let sec = 1000;
    let minute = 60 * sec;
    let lvl2 = minute * 20;
    if (lvl > 1) {
      let result = lvl2; //с первого на второй лвл
      for (let i = 2; i < lvl; i++) {
        result = lvl2 * 2.1;
        lvl2 = result;
      }

      return (result / 100) * persent;
    } else if (lvl <= 1) {
      return (40000 / 100) * persent;
    }
  },
  getResourcesForUpgrade(lvl, persent) {
    persent = persent > 100 ? 100 + (persent - 100) * 1.5 : persent;
    const value = ((this.valueUpgrade[lvl] * 1000) / 100) * persent;
    return [
      {
        resource: resources.typeList[0],
        value: value.toFixed(0)
      }
    ];
  }
};

module.exports = Mine;
