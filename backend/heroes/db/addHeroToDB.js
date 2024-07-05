import { Heroes } from '../../heroes/index.js';
import schema from '../../workWithMongoDB/schema.js';
const { document } = schema;
import insertDB from '../../workWithMongoDB/insertDB.js';
import { Army, createArmy } from '../../army/baseArmy/index.js';

const insert = new insertDB();

function addHeroToDB({ server, race, type, userId, callback = function () { } }) {
  return new Promise((resolve, reject) => {
    const template = createTemplateHero(race, type);
    template.userId = userId;
    insert.one({ collectionName: server, doc: template }).then(result => {
      if (result.insertedCount === 0) {
        callback(true);
        return reject();
      }
      const insertedHero = result.insertedId;
      callback(null, insertedHero);
      return resolve(insertedHero);
    });
  });
}


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
    army,
    active: true
  };
  return template;
}

export default addHeroToDB;

// createTemplateHero('rampart', 'warrior');
