require('dotenv').config(); // парсит ENV файл
const { getRandomNumber } = require('template_func');
const gameVariables = require('../../variables/game_variables.js');
const insert = require('../../workWithMongoDB/insertDB.js');
const update = require('../../workWithMongoDB/updateDB');
const find = require('../../workWithMongoDB/findInDB');
const findinDB = new find();
const insertDB = new insert();
const updateDB = new update();
const config = require('../../config');
const userCreate = require('../../user/userCreate');
const WorldMap = require('../../globalMap/WorldMap');
const setDemoTownState = require('./setDemoTownState');
const demoUser = require('./user_1');
const demoUser_2 = require('./user_2');
const Race = require('../../race/Race');
const typeListHero = require('../../heroes/types').list;
const { addHeroToDB, addCrossTownAndHero } = require('../../heroes/db');
const xCoords = [];
const yCoords = [];

async function insertDemoUserToDB(user, demoUser) {
  const options = {
    collectionName: config.db.collections.users,
    doc: user
  };
  const insertUser = await insertDB.one(options);
  console.log('...insert Demo User');
  await addDemoUserToDB(user, insertUser.ops[0]._id, demoUser);
}

async function addDemoUserToDB(user, _id, demoUser) {
  const x = getRandomCoords('x');
  const y = getRandomCoords('y');
  const serverName = user.collections.server_1.name;
  const sectorId = await getSectorId(x, y, serverName);
  const newTown = setDemoTownState(demoUser);
  newTown.sectorId = sectorId;
  const { regionMap } = newTown;
  delete newTown.regionMap;
  await addDemoHero(user, sectorId);
  const optionsForAdd = {
    collectionName: serverName,
    filtr: {
      x,
      y,
      class: config.schema.document.class.map
    },
    updateDoc: {
      $set: {
        region: regionMap,
        userId: _id,
        type: WorldMap.types.town.id,
        nickName: user.nickName,
        town: newTown
      }
    }
  };
  await updateDB.one(optionsForAdd);
  console.log(`...insert Demo User's town`);
}

async function addDemoHero(user, sectorId) {
  const server = user.collections.server_1;
  const serverName = server.name;
  const userId = user._id;
  const race = Race.typeList[server.race];
  const heroType = typeListHero[0];
  const hero = await addHeroToDB({ server: serverName, race, type: heroType, userId });
  await addCrossTownAndHero(serverName, sectorId, hero._id);
  return hero;
}

function startCreate() {
  if (!config.db.check) {
    setTimeout(() => {
      startCreate();
    }, 100);
  } else {
    setTimeout(async () => {
      const user_1 = userCreate(demoUser.user_1);
      user_1.collections = demoUser.collections;
      const user_2 = userCreate(demoUser_2.user_2);
      user_2.collections = demoUser_2.collections;
      await insertDemoUserToDB(user_1, demoUser);
      await insertDemoUserToDB(user_2, demoUser_2);
      insertDB.close();
      findinDB.close();
      updateDB.close();
    }, 500);
  }
}

async function getSectorId(x, y, collectionName) {
  const ops = {
    collectionName,
    query: {
      x,
      y
    }
  };
  const sector = await findinDB.one(ops);
  return sector._id;
}

function getRandomCoords(axis) {
  const coord = getRandomNumber(gameVariables.numSectionGlobalMap - 1);
  const arr = axis === 'x' ? xCoords : yCoords;
  const includes = arr.includes(coord);
  if (includes) {
    getRandomCoords(axis);
  } else {
    arr.push(coord);
    return coord;
  }
}

startCreate();
