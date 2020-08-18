require('dotenv').config(); // парсит ENV файл
const { getRandomNumber } = require('template_func');
const gameVariables = require('../variables/game_variables.js');
const insert = require('../workWithMongoDB/insertDB.js');
const update = require('../workWithMongoDB/updateDB');
const find = require('../workWithMongoDB/findInDB');
const findinDB = new find();
const insertDB = new insert();
const updateDB = new update();
const config = require('../config');
const userCreate = require('../user/userCreate');
const createTown = require('../town/createTown');
const WorldMap = require('../globalMap/WorldMap');
const demoUser = require('./user_1');

const user_1 = userCreate(demoUser.user_1);
user_1.collections = demoUser.collections;

async function insertDemoUserToDB(user) {
  const options = {
    collectionName: config.db.collections.users,
    doc: user
  };
  const insertUser = await insertDB.one(options);
  console.log('...insert Demo User');
  await addDemoUserToDB(user, insertUser.ops[0]._id);
}

async function addDemoUserToDB(user, _id) {
  const x = getRandomNumber(gameVariables.numSectionGlobalMap - 1);
  const y = getRandomNumber(gameVariables.numSectionGlobalMap - 1);
  const serverName = user.collections.server_1.name;
  const sectorId = await getSectorId(x, y, serverName);
  const newTown = createTown({ status: 'first' });
  newTown.sectorId = sectorId;
  const { regionMap } = newTown;
  delete newTown.regionMap;
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

function startCreate() {
  if (!config.db.check) {
    setTimeout(() => {
      startCreate();
    }, 100);
  } else {
    setTimeout(async() => {
      await insertDemoUserToDB(user_1);
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

startCreate();
