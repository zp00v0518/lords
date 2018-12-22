const { updateDB, config } = require("../tube.js");
const { getRandomString } = require("template_func");
const update = new updateDB();

function setCookieUser(userId) {
  const cookie = getRandomString(config.cookieSize);
  const optionsForUpdate = {
    collectionName: config.db.collections.users,
    filtr: {
      _id: userId
    },
    updateDoc: {
      $set: { cookie: cookie, "date.addCookie": new Date() }
    }
  };
  update.one(optionsForUpdate).then(resultUpdate => {});
  return cookie;
}

module.exports = setCookieUser;
