const Resources = {
  typeList: ['gold', 'wood', 'ore', 'sulfur', 'crystal', 'mercury', 'gem'],
  baseResource: ['wood', 'ore'],
  unicResource: ['sulfur', 'crystal', 'mercury', 'gem'],
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
  }
};

module.exports = Resources;
