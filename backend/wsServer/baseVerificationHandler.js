const { getHeroesFromDB } = require('../heroes/db');

// проверка принадлежности героя к целевому городу
function hero(id, sector, info) {
  return new Promise((resolve, reject) => {
    const { heroesList } = info.player;
    const template = {
      is: false
    };
    const hero = heroesList.find(i => i._id.toString() === id);
    if (!hero) {
      resolve(template);
    }
    getHeroesFromDB(sector.serverName, { heroId: id })
      .then(result => {
        if (!result) {
          resolve(template);
        }
        // TODO: сделать более детальную верификацию. На данный момент, верификация будет пройдена, даже если герой будет не в целевом секторе
        template.hero = JSON.parse(JSON.stringify(result));
        template.is = true;
        resolve(template);
      })
      .catch(() => {
        reject(template);
      });
  });
}

module.exports = { hero };
