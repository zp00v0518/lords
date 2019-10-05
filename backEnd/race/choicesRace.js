const {
  findUserInDB,
  findUserInGlobalMap,
  addNewUserToGlobalMap
} = require('../user');
const { redirectMessage } = require('../wsServer/defaultMessages');
const { getCollectionName, checkSchema } = require('../template_modules');
const { Heroes } = require('../heroes');
const addHeroToDB = require('../heroes/addHeroToDB');

function choicesRace(message, { userCookies, ws }) {
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

  findUserInDB(userCookies).then(user => {
    if (!user) {
      redirectMessage(ws);
      return;
    }
    findUserInGlobalMap(user.cookie, serverName).then(result => {
      const sector = result.result;
      if (sector.length > 0) {
        redirectMessage(ws);
        return;
      }
      addHeroToDB({server: serverName, race, type: heroes, userId: user._id}).then(insertHero => {
        console.log(insertHero)
      }).catch(err => {console.log(err)})

      ws.send(JSON.stringify({ user, message }));
    });
  });
}

module.exports = choicesRace;

const schema = {
  race: { type: 'string' },
  url: { type: 'string', regExp: /^\/{1}[^\/]/gi },
  heroes: { type: 'string' }
};
