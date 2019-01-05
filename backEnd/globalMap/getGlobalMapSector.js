const tube = require("../tube.js");

//возвращает участок глобальной карты, который будет отображен на экране Пользователя
function getGlobalMapSector(user, server, callback){
	// console.log("********** getGlobalMapSector ************");
	// console.log(user)
	let rangeArr = [];
	let length = GlobalMap[server].length;
	let zoom = user.globalMap.zoom;
	let rangeSize = gameVariables.viewSectionGlobalMapNow*zoom;//10*zoom;
	let halfSize = Math.floor(rangeSize/2);
	let minX = user.globalMap.centerMap.x-halfSize;
	let minY = user.globalMap.centerMap.y-halfSize;
	let startX = minX;
	let startY = minY;
	let endX = minX + rangeSize;
	let endY = minY + rangeSize;

   //передвижение внутри карты
	if (minX>=0 && minY>=0 && minX+rangeSize<=length && minY+rangeSize<=length){
		// console.log("передвижение внутри карты")
		let endX = minX+rangeSize;
		let endY = minY+rangeSize;
		rangeArr = getSectorMapList(server, minX, endX, minY, endY, rangeArr);
		rangeArr = formResultMap(rangeArr,rangeSize);
		// console.log(rangeArr)
	}
	//верхний левый угол карты
	else if(minX<0 && minY<0){
		// console.log("верхний левый угол карты")
		let startX = length - Math.abs(minX);
		let endX = length;
		let startY = length - Math.abs(minY);
		let endY = length;
		rangeArr = getSectorMapList(server, startX, endX, startY, endY, rangeArr);
		startY = 0;
		endY =  0+(rangeSize-(length-(length - Math.abs(minY))));
		rangeArr = getSectorMapList(server, startX, endX, startY, endY, rangeArr);
		startX = 0;
		endX = 0+(rangeSize-(length-(length - Math.abs(minX))));
		rangeArr = getSectorMapList(server, startX, endX, startY, endY, rangeArr);
		startY = length - Math.abs(minY);
		endY = length;
		// d = getSectorMapList(startX, endX, startY, endY, d);
		rangeArr = getSectorMapList(server, startX, endX, startY, endY, rangeArr);
		// console.log(d)
		sortArr_standart(rangeArr)
		changeArr(rangeArr, length - Math.abs(minX), "x");
		rangeArr = formResultMap(rangeArr, rangeSize);
		rangeArr = sortArr_Y(rangeArr, length - Math.abs(minY))
		// console.log(rangeArr);
	}
	//нижний правый угол карты
	else if (minX+rangeSize>=length && minY+rangeSize>=length){
		// console.log("нижний правый угол карты")
		let startX = minX ;
		let endX = length;
		let startY = minY;
		let endY = length;
		rangeArr = getSectorMapList(server, startX, endX, startY, endY, rangeArr);
		startX = 0 ;
		endX = (minX+rangeSize) - length;
		rangeArr = getSectorMapList(server, startX, endX, startY, endY, rangeArr);
		startY = 0;
		endY = (minY+rangeSize) - length;
		rangeArr = getSectorMapList(server, startX, endX, startY, endY, rangeArr);
		startX = minX ;
		endX = length;
		rangeArr = getSectorMapList(server, startX, endX, startY, endY, rangeArr);
		sortArr_standart(rangeArr);
		changeArr(rangeArr, minX, "x");
		rangeArr = formResultMap(rangeArr, rangeSize);
		rangeArr = sortArr_Y(rangeArr, minY);
		// console.log(rangeArr);
	}
	//верхний правый угол карты
	else if (minX<0 && minY+rangeSize>length){
		// console.log("верхний правый угол карты")
		let startX = length - Math.abs(minX);
		let endX = length;
		let startY = minY;
		let endY = length
		rangeArr = getSectorMapList(server, startX, endX, startY, endY, rangeArr);
		startX = 0;
		endX = 0+(rangeSize-(length-(length - Math.abs(minX))));
		rangeArr = getSectorMapList(server, startX, endX, startY, endY, rangeArr);
		startY = 0;
		endY = (minY+rangeSize) - length;
		rangeArr = getSectorMapList(server, startX, endX, startY, endY, rangeArr);
		startX = length - Math.abs(minX);
		endX = length;
		rangeArr = getSectorMapList(server, startX, endX, startY, endY, rangeArr);
		sortArr_standart(rangeArr);
		changeArr(rangeArr,length - Math.abs(minX), "x");
		rangeArr = formResultMap(rangeArr, rangeSize);
		rangeArr = sortArr_Y(rangeArr, minY)
		// console.log(rangeArr);
	}
	//нижний левый угол карты
	else if(minY<0 && minX+rangeSize>length){
		// console.log("нижний левый угол карты")
		let startX = minX;
		let endX = length;
		let startY = length - Math.abs(minY);
		let endY = length;
		rangeArr = getSectorMapList(server, startX, endX, startY, endY, rangeArr);
		startY = 0;
		endY = 0+(rangeSize-(length-(length - Math.abs(minY))));
		rangeArr = getSectorMapList(server, startX, endX, startY, endY, rangeArr);
		startX = 0;
		endX = (minX+rangeSize) - length;
		rangeArr = getSectorMapList(server, startX, endX, startY, endY, rangeArr);
		startY = length - Math.abs(minY);
		endY = length;
		rangeArr = getSectorMapList(server, startX, endX, startY, endY, rangeArr);
		sortArr_standart(rangeArr);
		changeArr(rangeArr,length - Math.abs(minX), "x");
		rangeArr = formResultMap(rangeArr, rangeSize);
		rangeArr = sortArr_Y(rangeArr, minX);
		// console.log(rangeArr)
	}
	//по центру верхней линии карты
	else if(minX<0 && minY>=0 && minY+rangeSize<=length){
		// console.log("по центру верхней линии карты")
		let startX = length - Math.abs(minX);
		let endX = length;
		let startY = minY;
		let endY = minY+rangeSize;
		rangeArr = getSectorMapList(server, startX, endX, startY, endY, rangeArr);
		startX = 0;
		endX = 0+(rangeSize-(length-(length - Math.abs(minX))));
		rangeArr = getSectorMapList(server, startX, endX, startY, endY, rangeArr);
		sortArr_standart(rangeArr);
		changeArr(rangeArr,length - Math.abs(minX), "x");
		rangeArr = formResultMap(rangeArr, rangeSize);
		rangeArr = sortArr_Y(rangeArr, minX);
		// console.log(rangeArr)
	}
	//по центру нижней линии карты
	else if(minY>=0 && minY+rangeSize<length  && minX>=0 && minX+rangeSize>length){
		// console.log("по центру нижней линии карты")
		let startX = minX;
		let endX = length;
		let startY = minY;
		let endY = minY+rangeSize;
		rangeArr = getSectorMapList(server, startX, endX, startY, endY, rangeArr);
		startX = 0;
		endX = (minX+rangeSize) -length;
		rangeArr = getSectorMapList(server, startX, endX, startY, endY, rangeArr);
		sortArr_standart(rangeArr);
		changeArr(rangeArr,minX, "x");
		rangeArr = formResultMap(rangeArr, rangeSize);
		// console.log(rangeArr)
	}
	//по центру правой линии
	else if(minX>=0 && minX+rangeSize<length && minY>=0 && minY+rangeSize>length){
		// console.log("по центру правой линии")
		let startX = minX;
		let endX = minX+rangeSize;
		let startY = minY;
		let endY = length;
		rangeArr = getSectorMapList(server, startX, endX, startY, endY, rangeArr);
		startY = 0;
		endY = (minY+rangeSize) -length;
		rangeArr = getSectorMapList(server, startX, endX, startY, endY, rangeArr);
		sortArr_standart(rangeArr);
		// changeArr(rangeArr,minX, "x");
		rangeArr = formResultMap(rangeArr, rangeSize);
		rangeArr = sortArr_Y(rangeArr, minY);
		// console.log(rangeArr)
	}
	//по центру левой линии
	else if(minY<0 && minX>=0 && minX+rangeSize<=length){
		// console.log("по центру левой линии")
		startX = minX;
		endX = minX+rangeSize;;
		startY =length - Math.abs(minY);
		endY = length;
		rangeArr = getSectorMapList(server, startX, endX, startY, endY, rangeArr);
		startY = 0;
		endY =0+(rangeSize-(length-(length - Math.abs(minY))));
		rangeArr = getSectorMapList(server, startX, endX, startY, endY, rangeArr);
		sortArr_standart(rangeArr);
		rangeArr = formResultMap(rangeArr, rangeSize);
		rangeArr = sortArr_Y(rangeArr, length - Math.abs(minY));
		// console.log(rangeArr)
	}
	let center = (rangeArr.length-1) - halfSize;
	let	centerSection = rangeArr[center][center];
	user.globalMap.centerMap.x = centerSection.x;
	user.globalMap.centerMap.y = centerSection.y;
	return callback(rangeArr)
}
//сортирую элементы по Х и по У 
function sortArr_standart(arr){
		 arr.sort((a,b)=>{
		 	let z =  a.x - b.x;
		 	if (z == 0){
		 		return a.y - b.y;
		 	} else {
		 		return z;
		 	}
	});
}
//сортирую массив по У
function sortArr_Y(arr, num){
	for (let i=0; i<arr.length; i++){
		let g = arr[i];
		changeArr(g, num, "y")
	}
	return arr;
}


//перекидываю с конца массива в начало необходимые елементы
//num - число, начиная с которого нужно переместить елементы
function changeArr(arr, num, os){
	let g = [];
	for (let i=0; i<arr.length; i++){
		let sector = arr[i];
		if(sector[os] >= num){
			g = arr.splice(i,arr.length);
			break;
		}
	}
	for (let h=g.length-1; h>=0; h--){
		arr.unshift(g[h])
	}
}
//делаю выборку из исходного двумерного массива
function getSectorMapList(server, startX, endX, startY, endY, arr){
	for(let x=startX; x<endX; x++){
		for (let y=startY; y<endY; y++){
			arr.push(GlobalMap[server][x][y])
		}
	}
	return arr;
}

//формирую двумерный массив из исходного списка
function formResultMap(arr, size){
	let count = 0;
	let itogArr = [];
	for (let i=0; i<size; i++){
		let f = [];
		itogArr.push(f);
		for(let h=0; h<size; h++){
			itogArr[i][h] = arr[count];
			count++;
		}
	}
	return itogArr;
}

module.exports = getGlobalMapSector;

