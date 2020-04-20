const { Log } = require("template_func");
const log = new Log(__filename);

function userCreate(userData) {
  const user = {};
  user.id = userData.id;
  user.pass = userData.pass;
  user.email = userData.email;
  user.nickName = userData.nickName;
  user.lang = userData.lang || 'ru';
  user.date = {
    registr: new Date(),
    addCookie: new Date()
  };
  user.cookie = "";
  user.session = [];
  // user.collections = [];
  user.collections = {};
  return user;
}

module.exports = userCreate;
