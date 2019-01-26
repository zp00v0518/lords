const dictionary = require('./dictionary');

function getLangDictonary(lang) {
  const newObj = {};
  forEach(dictionary, newObj);

  function forEach(obj, next) {
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        next[key] = {}
        forEach(obj[key], next[key]);
      } else {
        next[lang] = obj[lang] || "";
      }
    }
  }
  return newObj
}


module.exports = getLangDictonary