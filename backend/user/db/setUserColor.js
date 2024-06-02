const updateUser = require('./updateUser');

async function setUserColor(serverName, userId, color) {
  const doc = {
    [`collections.${serverName}.color`]: color
  };
  const result = await updateUser(userId, doc);
  return result;
}

module.exports = setUserColor;
