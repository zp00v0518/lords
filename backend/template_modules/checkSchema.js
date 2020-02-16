const { checkType } = require("template_func");

function checkSchema(obj, schema) {
  const typeData = checkType(obj);
  if (typeData !== "object") return false;
  const flag = Object.keys(schema).every(key => {
    const item = obj[key];
    return checkItem(item, schema[key]);
  });

  if (!flag) {
    console.log("bad shema");
  }
  return flag;
}

function checkString(value, shema) {
  if (shema.length) {
    const f = shema.length;
    return value.length >= f[0] && value.length <= f[1];
  }
  if (shema.regExp) {
    const z = shema.regExp.test(value);
    shema.regExp.lastIndex = 0;
    return z;
  }
}
function checkNumber(value, shema) {
  const min = shema.min !== undefined ? value >= shema.min : true;
  const max = shema.max !== undefined ? value <= shema.max : true;
  return min && max;
}

function checkArray(arr, shema) {
  return arr.every(item => {
    return checkItem(item, shema);
  });
}

function checkItem(item, shema) {
  if (item === undefined) return false;
  const type = checkType(item);
  if (type !== shema.type) return false;
  if (type === "string") return checkString(item, shema);
  if (type === "number") return checkNumber(item, shema);
  if (type === "object" && shema.fields) return checkSchema(item, shema.fields);
  if (type === "array" && shema.all) return checkArray(item, shema.all);
  return true;
}

// проверяет данные на соответствие схемы
// function checkSchema(obj, schema) {
//   let flag = true;
//   forEach(obj);

//   function forEach(obj) {
//     for (let key in obj) {
//       const type = checkType(obj[key]);
//       if (!schema[key]) {
//         continue;
//       }
//       if (type !== schema[key].type) {
//         flag = false;
//         break;
//       }
//       if (type === 'object') {
//         forEach(obj[key]);
//       }
//       const value = obj[key];
//       if (type === 'number') {
//         if (
//           schema[key].min === 0 ||
//           schema[key].min ||
//           schema[key].max ||
//           schema[key].max === 0
//         ) {
//           if (value < schema[key].min || value > schema[key].max) {
//             flag = false;
//             break;
//           }
//         }
//       }
//       if (type === 'string' && schema[key].regExp) {
//         flag = schema[key].regExp.test(value);
//         schema[key].regExp.lastIndex = 0;
//         if (!flag) {
//           break;
//         }
//       }
//     }
//   }
//   if (!flag) {
//     console.log('bad shema');
//   }
//   return flag;
// }

module.exports = checkSchema;
