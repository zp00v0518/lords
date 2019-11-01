const dictionary = require('./index.js');

function getLangDictionary(lang) {
  const newObj = {};
  forEach(dictionary, newObj);

  function forEach(obj, next) {
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        next[key] = {}
        forEach(obj[key], next[key]);
      } else {
        next.txt = obj[lang] || "";
      }
    }
  }
  return newObj
}


module.exports = getLangDictionary