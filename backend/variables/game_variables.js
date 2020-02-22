const config = require("../config/config.js");
const Mine = require("../region/mine/Mine.js");
// const Region = require("../region/Region.js");
// const Race = require("../race/Race.js");
const Town = require("../town/Town.js");
const resources = require("../resources/Resources.js");
const schema = require("../workWithMongoDB/schema.js");
const time = config.time;

const gameVariables = {
  numSectionGlobalMap: 30, // количество ячеек на ГЛОБАЛЬНОЙ карте, по одной оси
  // при изменении кол-ва ячеек, нужно поменять кол-во отображаемых ячеек на 1-й оси
  // как здесь, так и на клиенте
  getMaxIndexMap: function() {
    return gameVariables.numSectionGlobalMap - 1;
  }, // максимальный индекс для массива карты
  numSectionRegionMap: 5, // количество ячеек на карте РЕГИОНА, по одной оси
  viewSectionGlobalMapNow: 11, // количество ячеек на Глобальной карте, по одной оси
  stepMoveGlobalMap: 2, // кол-во ячеек, на которорое происходит сдвиг карты при передвижении
  // в данный момент 1 сутки
  serverList: config.db.collections.servers,
  timer: {
    controlState: time.minute / 12,
    saveDataDB: time.minute / 3, // 1 минута - интервал считывания данных и записи их в БД
    perTime: time.hour, // расчетное время прироста игровых ресурсов
    heroMove: time.minute * 20
  },
  indexes: {
    upgrade_town: 1.5,
    upgrade_mine: 1.5
  },
  mine: Mine, // используется на фронте при улучшении строений в регионе
  // region: Region,
  // race: Race,
  time,
  town: Town, // используется на фронте при улучшении зданий
  resources, // используется на фронте при улучшении зданий
  classInstance: schema.document.class
};

module.exports = gameVariables;
