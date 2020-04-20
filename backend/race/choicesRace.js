const {
  findUserInDB,
  findUserInGlobalMap,
  addNewUserToGlobalMap,
  getInfoForStartGame,
  setUserOnline,
  updateUser
} = require("../user");
const { redirectMessage } = require("../wsServer/defaultMessages");
const { getCollectionName, checkSchema } = require("../template_modules");
const { Heroes } = require("../heroes");
const Race = require('./Race');
const { addHeroToDB, addHeroToTown, addTownToHero } = require("../heroes/db");

function choicesRace(message, { userCookies, ws }) {
  if (!checkSchema(message, schema)) {
    redirectMessage(ws);
    return;
  }
  const { url, race, heroes } = message;
  const serverName = getCollectionName(url.split("/")[1]);

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
      const raceIndex = Race.typeList.indexOf(race)
      user.collections[serverName].race = raceIndex;
      addHeroToDB({ server: serverName, race, type: heroes, userId: user._id })
        .then(insertHero => {
          addNewUserToGlobalMap(user, serverName)
            .then(async insertTown => {
              const updUser = {
                [`collections.${serverName}.race`]: raceIndex
              }
              await updateUser(user._id, updUser);
              addHeroToTown(serverName, insertTown._id, insertHero._id)
                .then(() => {
                  addTownToHero(serverName, insertTown._id, insertHero._id)
                    .then(() => {
                      getInfoForStartGame(user, serverName)
                        .then(info_for_start_game => {
                          setUserOnline(
                            user,
                            serverName,
                            info_for_start_game,
                            ws
                          );
                          return;
                          // ws.send(
                          //   JSON.stringify({ user, message, insertTown, insertHero })
                          // );
                        })
                        .catch(err => {
                          console.log(err);
                        });
                    })
                    .catch(err => {
                      console.log(err);
                    });
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });

      ws.send(JSON.stringify({ user, message }));
    });
  });
}

module.exports = choicesRace;

const schema = {
  race: { type: "string" },
  url: { type: "string", regExp: /^\/{1}[^\/]/gi },
  heroes: { type: "string" }
};
