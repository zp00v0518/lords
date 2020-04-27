const ObjectId = require('mongodb').ObjectID;
const { checkSchema } = require('../../template_modules');
const { redirectMessage } = require('../../wsServer');
const { Army } = require('../Army');
const { updateDB } = require('../../workWithMongoDB');
const update = new updateDB();
const { getTownByHero } = require('../../town');
const { getHeroesFromDB } = require('../../heroes/db');

// const { getHeroesFromDB } = require("../../heroes/db");

async function handlerMergeArmy(message, info) {
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
  const serverName = info.server;
  const heroId = data.id;
  try {
    const sector = await getTownByHero(serverName, heroId);
    if (!sector) {
      redirectMessage(ws);
      return;
    }
    const heroes_in_town = sector.heroes;
    if (!heroes_in_town || !heroes_in_town.some(i => i.toString() === heroId)) {
      redirectMessage(ws);
      return;
    }
    const hero = await getHeroesFromDB(serverName, { heroId });
    if (!hero || !hero.active) {
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
    const updateOps = {
      collectionName: serverName,
      filtr: {
        _id: ObjectId(hero._id)
      },
      updateDoc: {
        $set: { army: army_hero }
      },
      ops: { upsert: false }
    };
    await update.one(updateOps);
    const sectrId = sector._id;
    updateOps.filtr._id = sectrId;
    updateOps.updateDoc = {
      $set: { 'town.army.units': army_in_town }
    };
    await update.one(updateOps);
    response.status = true;
    response.data = {
      town: {
        army: army_in_town,
        id: sector._id
      },
      hero: {
        army: army_hero
      }
    };
    ws.send(JSON.stringify(response));
  } catch (err) {
    console.log(err);
    redirectMessage(ws);
  }
}

const schema = {
  id: { type: 'string', regExp: /^.{13,}\b/g },
  way: { type: 'string', regExp: /^in$|^out$/g }
};

module.exports = handlerMergeArmy;
