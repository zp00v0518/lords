//создает коллекцию region в БД

// const insert = require("../workWithMongoDB/insertDB.js");
// const find = require("../workWithMongoDB/findInDB.js");
const update = require("../workWithMongoDB/updateDB.js");
const {getRandomNumber} = require("template_func");
const gameVariable = require("../variables/game_variables.js");
const createMine = require("../region/mine/createMine.js");

// const insertDB = new insert();
// const findInDB = new find();
const updateDB = new update();

var numSectionRegionMap = gameVariable.numSectionRegionMap;
var coordsMine = [];//возможные координаты шахт на regionMap
getPositionMine();

//создает перечень возможных координат шахт для regionMap
function getPositionMine(){
	for (let i=1; i<4; i++){
		for (let h=1; h<4; h++){
			var f = {
				x:i,
				y:h,
			}
			if (i == 2 && h == 2){
				break;
			}
			coordsMine.push(f);
		}
	}
}

//возвращает массив координат, где будут находится шахты
function getArrPosition(){
	let positionArr = [];
	while (positionArr.length < 4) {
		let position = Math.floor(Math.random()*coordsMine.length);
		let h = positionArr.includes(position);
		if(!h){
			positionArr.push(position);
		}
	}
	return positionArr;
}

//
function createRegionMap(){
	var regionMap = [];
	var countSection = 0;
	//создаю сетку региона
	for (let i=0; i<numSectionRegionMap; i++){
		let row = [];
		regionMap.push(row)
		for (let h=0; h<numSectionRegionMap; h++){
			let section = {};
			section.id = countSection++;
			section.x = i;
			section.y = h;
			section.type = 1; //индекс леса
			//центр всегда является замком
		if (i == 2 && h == 2){
				section.type = 2; //индекс замка
			} 
			regionMap[i][h] = section;
		}
	}
	//определаю положение шахт на карте
	var d = getArrPosition();
	for (let k=0; k<d.length; k++){
		let index = d[k];
		let x = coordsMine[index].x;
		let y = coordsMine[index].y;
		regionMap[x][y].type = 3; //индекс шахты
		regionMap[x][y].mine = createMine();
	}
	return regionMap;
}

//конструктор региона
function createRegion(id,sectionMap){
	var Region = {};
	Region.regionMap = createRegionMap();
	Region.mapId = sectionMap.id;
	Region.map_Id = sectionMap._id;
	Region.mapX = sectionMap.x;
	Region.mapY = sectionMap.y;
	Region.type = sectionMap.type;
	Region.id = id;

	return Region;
}



function findSectionInMap(id,length, callback){
	console.log(id);
	let Region = createRegion(id,resultFind);
	var optionsUpdate = {
		collectionName:"globalMap",
		filtr:{id:id},
		updateDoc:{$set:{region:Region}}
	}
	updateDB.one(optionsUpdate, (resultUpdate)=>{
		console.log("**********updateDB***********")
		id++;
		return callback(id,length)
	})
}


function startCicle(idMap,length,callback){
	if (idMap == length){
		return callback();
	}else {
		findSectionInMap(idMap,length, (id,length)=>{
			startCicle(id,length, callback);
		})
	}
}


setTimeout(function(){
	startCicle(0,gameVariable.numSectionGlobalMap*gameVariable.numSectionGlobalMap,()=>{
		console.log("end");
		updateDB.close();
		// insertDB.close();
		// findInDB.close();
	})
},5000);