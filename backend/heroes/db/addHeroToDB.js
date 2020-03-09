const { Heroes } = require('../../heroes');
const { document } = require('../../workWithMongoDB/schema');
const { insertDB } = require('../../workWithMongoDB');
const { Army, createArmy } = require('../../army/Army');

const insert = new insertDB();

function addHeroToDB({ server, race, type, userId, callback = function() {} }) {
  return new Promise((resolve, reject) => {
    const template = createTemplateHero(race, type);
    (template.userId = userId),
      insert.one({ collectionName: server, doc: template }).then(result => {
        if (result.insertedCount === 0) {
          callback(true);
          return reject(insertedHero);
        }
        const insertedHero = result.ops[0];
        callback(null, insertedHero);
        return resolve(insertedHero);
      });
  });
}

module.exports = addHeroToDB;

function createTemplateHero(race, type) {
  const hero = Heroes.getOneHero(race, type);
  const units = Army.getUnitsFromRace(race, [1, 2, 3], false);
  const range_power_army = Army.army_range.hero;
  const army = createArmy({ range_power_army, units, random: false });
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
    army
  };
  return template;
}

// createTemplateHero('rampart', 'warrior');
