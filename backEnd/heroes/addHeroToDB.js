const { Heroes } = require('../heroes');
const { document } = require('../workWithMongoDB/schema');
const { insertDB } = require('../workWithMongoDB');
const insert = new insertDB();

function addHeroToDB({ server, race, type, userId, callback = function() {} }) {
  return new Promise((resolve, reject) => {
    const template = createTemplateHero(race, type);
    (template.userId = userId),
      insert.one({ collectionName: server, doc: template }).then(result => {
        if (result.insertedCount === 0) {
          reject(insertedHero);
          return callback(true);
        }
        const insertedHero = result.ops[0];
        resolve(insertedHero);
        return callback(null, insertedHero);
      });
  });
}

module.exports = addHeroToDB;

function createTemplateHero(race, type,) {
  const hero = Heroes.getOneHero(race, type);
  const template = {
    name: hero.name,
    lvl: 0,
    type,
    race,
    class: document.class.hero,
    created: new Date().getTime(),
    exp: 0,
    skills: [],
    stat: hero.stat,
  };
  return template;
}

createTemplateHero('rampart', 'warrior');
