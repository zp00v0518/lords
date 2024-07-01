import getUsersById from './getUsersById.js';

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

export default getUsersBySectorsArr;
