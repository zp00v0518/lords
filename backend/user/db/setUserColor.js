import updateUser from './updateUser.js';

async function setUserColor(serverName, userId, color) {
  const doc = {
    [`collections.${serverName}.color`]: color
  };
  const result = await updateUser(userId, doc);
  return result;
}

export default setUserColor;
