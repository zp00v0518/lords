import {
  findUserInDB,
  findUserInGlobalMap,
  addNewUserToGlobalMap,
  getInfoForStartGame,
  setUserOnline,
  updateUser,
  getUserRandomColor
} from '../user/index.js';
import { redirectMessage } from '../wsServer/defaultMessages.js';
import { getCollectionName, checkSchema } from '../template_modules/index.js';
import { Heroes } from '../heroes/index.js';
import Race from './Race.js';
import { addHeroToDB, addHeroToTown, addTownToHero } from '../heroes/db/index.js';

async function choicesRace(message, { userCookies, ws }) {
  if (!checkSchema(message, schema)) {
    redirectMessage(ws);
    return;
  }
  const { url, race, heroes } = message;
  const serverName = getCollectionName(url.split('/')[1]);

  if (!serverName || !Heroes.checkHeroesInRace(race, heroes)) {
    redirectMessage(ws);
    return;
  }
  try {
    const user = await findUserInDB(userCookies);
    if (!user) {
      redirectMessage(ws);
      return;
    }
    const result = await findUserInGlobalMap(user.cookie, serverName);
    const sector = result.result;
    if (sector.length > 0) {
      redirectMessage(ws);
      return;
    }
    const raceIndex = Race.typeList.indexOf(race);
    user.collections[serverName].race = raceIndex;
    const insertHeroID = await addHeroToDB({ server: serverName, race, type: heroes, userId: user._id });
    const color = getUserRandomColor();
    user.collections[serverName].color = color;
    const updUser = {
      [`collections.${serverName}.race`]: raceIndex,
      [`collections.${serverName}.color`]: color
    };
    await updateUser(user._id, updUser);
    const insertTown = await addNewUserToGlobalMap(user, serverName);
    await addHeroToTown(serverName, insertTown._id, insertHeroID);
    await addTownToHero(serverName, insertTown._id, insertHeroID);
    const info_for_start_game = await getInfoForStartGame(user, serverName);
    setUserOnline(user, serverName, info_for_start_game, ws);
    ws.send(JSON.stringify({ user, message }));
  } catch (err) {
    console.log(err);
    redirectMessage(ws);
  }
}


const schema = {
  race: { type: 'string' },
  url: { type: 'string', regExp: /^\/{1}[^\/]/gi },
  heroes: { type: 'string' }
};

export default choicesRace;
