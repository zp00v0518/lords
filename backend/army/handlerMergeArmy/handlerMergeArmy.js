const ObjectId = require('mongodb').ObjectID;
const { checkSchema } = require('../../template_modules');
const { redirectMessage } = require('../../wsServer');
const { Army } = require('../Army');
const { updateDB } = require('../../workWithMongoDB');
const update = new updateDB();
const { getOneTownFromDB } = require('../../town');

// const { getHeroesFromDB } = require("../../heroes/db");

function handlerMergeArmy(message, info) {
  const data = message.data;
  const { ws } = info.player;
  const response = {
    status: false,
    type: message.type
  };
  if (!checkSchema(data, schema)) {
    redirectMessage(ws);
    return;
  }
  const curSector = info.player.sectors[data.sectorIndex];
  if (!curSector) {
    redirectMessage(ws);
    return;
  }
  getOneTownFromDB(curSector.serverName, curSector._id)
    .then(res => {
      const sector = res;
      const heroId = data.id;
      const heroes_in_town = sector.heroes;
      if (!heroes_in_town || !heroes_in_town.some(i => i.toString() === heroId)) {
        redirectMessage(ws);
        return;
      }
      const { heroesList } = info.player;
      const hero = heroesList.find(i => i._id.toString() === heroId);
      if (!hero) {
        redirectMessage(ws);
        return;
      }
      const army_hero = hero.army;
      const army_in_town = sector.town.army.units;
      const mergeWay = data.way;
      if (mergeWay === 'in') {
        Army.mergeTwoArmy(army_hero, army_in_town);
      } else if (mergeWay === 'out') {
        Army.mergeTwoArmy(army_in_town, army_hero);
      } else {
        redirectMessage(ws);
        return;
      }
      const { server } = info;
      const updateOps = {
        collectionName: server,
        filtr: {
          _id: ObjectId(hero._id)
        },
        updateDoc: {
          $set: { army: army_hero }
        },
        ops: { upsert: false }
      };
      update.one(updateOps).then(() => {
        const sectrId = sector._id;
        updateOps.filtr._id = sectrId;
        updateOps.updateDoc = {
          $set: { 'town.army.units': army_in_town }
        };
        update.one(updateOps).then(() => {
          response.data = {
            town: {
              army: army_in_town
            },
            hero: {
              army: army_hero
            }
          };
          ws.send(JSON.stringify(response));
        });
      });
    })
    .catch(err => {
      console.log(err);
      redirectMessage(ws);
    });
}

const schema = {
  id: { type: 'string', regExp: /^.{13,}\b/g },
  way: { type: 'string', regExp: /^in$|^out$/g },
  sectorIndex: { type: 'number', min: 0 }
};

module.exports = handlerMergeArmy;
