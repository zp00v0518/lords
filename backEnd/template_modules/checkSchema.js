const { checkType } = require('template_func');

//проверяет данные на соответствие схемы
function checkSchema(obj, schema) {
  let flag = true;
  forEach(obj);

  function forEach(obj) {
    for (let key in obj) {
      const type = checkType(obj[key]);
      if (!schema[key]) {
        continue;
      }
      if (type !== schema[key].type) {
        flag = false;
        break;
      }
      if (type === 'object') {
        forEach(obj[key]);
      }
      const value = obj[key];
      if (type === 'number') {
        if (
          schema[key].min === 0 ||
          schema[key].min ||
          schema[key].max ||
          schema[key].max === 0
        ) {
          if (value < schema[key].min || value > schema[key].max) {
            flag = false;
            break;
          }
        }
      }
      if (type === 'string' && schema[key].regExp) {
        flag = schema[key].regExp.test(value);
        schema[key].regExp.lastIndex = 0;
        if (!flag) {
          break;
        }
      }
    }
  }
  if (!flag) {
    console.log('bad shema');
  }
  return flag;
}

module.exports = checkSchema;
