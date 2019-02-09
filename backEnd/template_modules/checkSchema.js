const { checkType } = require('template_func');

function checkSchema(obj, schema){
  let flag = true;
  forEach(obj);

  function forEach(obj){
    for (let key in obj) {
      if (checkType (obj[key]) !== schema[key]){
        flag = false;
        break;
      }
      if(checkType (obj[key]) === "object"){
        forEach(obj[key]);
      }
    }
  }
  return flag;
}

module.exports = checkSchema;
