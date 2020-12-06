const getUsersById = require('./getUsersById');

async function getUsersBySectorsArr(sectors) {
  let userList = {};
  sectors.forEach(sector => {
    userList[sector.userId] = 1;
  });
  const usersArr = await getUsersById(Object.keys(userList));
  userList = {};
  usersArr.forEach(item => {
    userList[item._id.toString()] = item;
  });
  return userList;
}

module.exports = getUsersBySectorsArr;
