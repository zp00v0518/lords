import config from '../config/config.js';
import Mine from '../region/mine/Mine.js';
import Town from '../town/Town.js';
import resources from '../resources/Resources.js';
import schema from '../workWithMongoDB/schema.js';
// import process from 'node:process';
const time = config.time;
// используется ТАКЖЕ!!!! на фронте при улучшении строений в регионе!!!!!!!!

const gameVariables = {
  numSectionGlobalMap: 100, // количество ячеек на ГЛОБАЛЬНОЙ карте, по одной оси
  // numSectionGlobalMap: process.env.SIZE_MAP || 100, // количество ячеек на ГЛОБАЛЬНОЙ карте, по одной оси
  // при изменении кол-ва ячеек, нужно поменять кол-во отображаемых ячеек на 1-й оси
  // как здесь, так и на клиенте
  getMaxIndexMap: function () {
    return gameVariables.numSectionGlobalMap - 1;
  }, // максимальный индекс для массива карты
  numSectionRegionMap: 5, // количество ячеек на карте РЕГИОНА, по одной оси
  viewSectionGlobalMapNow: 15, // количество ячеек на Глобальной карте, по одной оси
  stepMoveGlobalMap: 2, // кол-во ячеек, на которорое происходит сдвиг карты при передвижении
  serverList: config.db.collections.servers,
  timer: {
    zoneControle: time.minute / 5,
    controlState: time.minute / 10,
    saveDataDB: time.minute / 3, // 1 минута - интервал считывания данных и записи их в БД
    addSource: time.day / time.speedGame, // расчетное время прироста игровых ресурсов
    addUnits: time.day / time.speedGame, // расчетное время прироста игровых ресурсов
    heroMoveOnRegion: (time.minute * 5) / time.speedGame,
    heroMoveOnGlobalMap: (time.minute * 10) / time.speedGame
  },
  indexes: {
    upgrade_town: 1.5,
    upgrade_mine: 1.5
  },
  mine: Mine, // используется на фронте при улучшении строений в регионе
  time, // используется на фронте при улучшении строений в регионе
  town: Town, // используется на фронте при улучшении зданий
  resources, // используется на фронте при улучшении зданий
  classInstance: schema.document.class
};

export default gameVariables;
