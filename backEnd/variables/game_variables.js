const config = require('../config/config.js');
const Mine = require('../region/mine/Mine.js');
const Region = require('../region/Region.js');
const Race = require('../race/Race.js');
const Town = require("../town/Town.js");
const resources = require("../resources/Resources.js");
const schema = require('../workWithMongoDB/schema.js')
const time = config.time;

const gameVariables = {
	numSectionGlobalMap : 30, 					//количество ячеек на ГЛОБАЛЬНОЙ карте, по одной оси
																			//при изменении кол-ва ячеек, нужно поменять кол-во отображаемых ячеек на 1-й оси
																			//как здесь, так и на клиенте
	getMaxIndexMap: function(){
		return gameVariables.numSectionGlobalMap - 1
	},																	// максимальный индекс для массива карты
	numSectionRegionMap: 5,							//количество ячеек на карте РЕГИОНА, по одной оси
	viewSectionGlobalMapNow:11, 				//количество ячеек на Глобальной карте, по одной оси
	stepMoveGlobalMap:2, 								//кол-во ячеек, на которорое происходит сдвиг карты при передвижении
																			// в данный момент 1 сутки
	serverList:config.db.collections.servers,
	timer:{
		controlState: time.minute/10,
		saveDataDB:time.minute/10, 							//1 минута - интервал считывания данных и записи их в БД
		perTime: time.hour/5, // расчетное время прироста игровых ресурсов
	},
	mine: Mine,
	region: Region,
	race: Race,
	time,
	town: Town,
	resources,
	classInstance: schema.document.class,
};

module.exports = gameVariables;
