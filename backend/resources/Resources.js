const checkSource = require('./checkSource');
const types = require('./type_resources');

const Resources = {
  types,
  typeList: [types.gold, types.wood, types.ore, types.sulfur, types.crystal, types.mercury, types.gem],
  baseResource: [types.wood, types.ore],
  unicResource: [types.sulfur, types.crystal, types.mercury, types.gem],
  cost: {
    base: {
      gold: 1000,
      unic: 0.5
    },
    unic: {
      gold: 2000,
      base: 2
    }
  },
  maxValue: {
    gold: 100000,
    baseResource: 18,
    unicResource: 10
  },
  formPrice: function(values) {
    const result = [];
    Object.keys(values).forEach(key => {
      if (Resources.typeList.includes(key)) {
        const obj = {
          resource: key,
          value: values[key]
        };
        result.push(obj);
      }
    });
    return result;
  },
  getInGold(arr) {
    const baseResource = this.baseResource;
    const base_cost = this.cost.base.gold;
    const unic_cost = this.cost.unic.gold;
    let in_gold = 0;
    arr.forEach(item => {
      let value = item.value;
      const resource = item.resource;
      // проверка на золото
      if (resource !== this.typeList[0]) {
        if (baseResource.includes(resource)) {
          value = value * base_cost;
        } else {
          value = value * unic_cost;
        }
      }
      in_gold += value;
    });
    return in_gold;
  },
  checkSource
};

module.exports = Resources;
