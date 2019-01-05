const tube = require("../tube.js");

//возвращает участок глобальной карты, который будет отображен на экране Пользователя
function getGlobalMapSector(user, server, callback=function() {}){
	let resultArr = [];
	let rangeArr = [];
	let length = GlobalMap[server].length;
	let zoom = user.globalMap.zoom;
	let rangeSize = gameVariables.viewSectionGlobalMapNow*zoom;//10*zoom;
	let halfSize = Math.floor(rangeSize/2);
	let twoHalfSize = rangeSize - halfSize;
	// console.log (`centerX:${user.globalMap.centerMap.x} centerY:${user.globalMap.centerMap.y}`);
	let minX = user.globalMap.centerMap.x-halfSize;
	let minY = user.globalMap.centerMap.y-halfSize;
	let startX = minX;
	let startY = minY;
	let endX = minX + rangeSize;
	let endY = minY + rangeSize;
	// console.log(`minX:${minX}  minY:${minY}`);
	
	if(minX <0 && minY < 0){
		// console.log (`centerX:${user.globalMap.centerMap.x} centerY:${user.globalMap.centerMap.y}`);
		startX = length - Math.abs(minX)
		endX = length;
		startY = length - Math.abs(minY);
		endY = length;
		formIntermediateArr(server,startX, startY, endX, endY, rangeArr, (intermediteArr)=>{
			startY = 0;
			endY = rangeSize - Math.abs(minY);
			formIntermediateArr(server,startX, startY, endX, endY, rangeArr, (intermediteArr_2)=>{
				startX = 0;
				endX = rangeSize - Math.abs(minX);
				startY = length  - Math.abs(minY);
				endY = length;
				formIntermediateArr(server,startX, startY, endX, endY, rangeArr, (intermediteArr_3)=>{
					startY = 0;
					endY = rangeSize - Math.abs(minY);
					formIntermediateArr(server,startX, startY, endX, endY, rangeArr, (intermediteArr_4)=>{
						resultArr = preSort(rangeArr, rangeSize, length - Math.abs(minX));
					})
				})
			})
		});
	}
	else if (minX+rangeSize >length && minY < 0){
		let p = minX+rangeSize;//переменная для фиксации значения
		startX = minX
		endX = length;
		startY = length - Math.abs(minY);
		endY = length;
		formIntermediateArr(server,startX, startY, endX, endY, rangeArr, (intermediteArr)=>{
			startX = 0;
			endX = p - length;
			let d = [];
			formIntermediateArr(server,startX, startY, endX, endY, rangeArr, (intermediteArr_2)=>{
				startX = minX;
				endX = length;
				startY = 0;
				endY = rangeSize - Math.abs(minY)
				let g = [];
				formIntermediateArr(server,startX, startY, endX, endY, rangeArr, (intermediteArr_3)=>{
					startX = 0;
					endX = p - length;
					startY = 0;
					endY = rangeSize - Math.abs(minY)
					let k = [];
					formIntermediateArr(server,startX, startY, endX, endY, rangeArr, (intermediteArr_4)=>{
						resultArr = preSort(rangeArr, rangeSize, rangeSize - Math.abs(minY));
						console.log(`rangeSize - Math.abs(minY): ${rangeSize - Math.abs(minY)}`)
					})
				
				})
			})
		})
	}
	else if ((minX+rangeSize >(length))  && (minY+rangeSize >(length))){
		let pX = minX+rangeSize;
		let pY = minY+rangeSize;
		startX = minX
		endX = length;
		startY = minY;
		endY = length;
		formIntermediateArr(server,startX, startY, endX, endY, rangeArr, (intermediteArr)=>{
			startX = 0;
			endX = pX - length;
			let d = [];
			formIntermediateArr(server,startX, startY, endX, endY, rangeArr, (intermediteArr_2)=>{
				startX = minX;
				endX = length;
				startY = 0;
				endY = pY - length;
				let g = [];
				formIntermediateArr(server,startX, startY, endX, endY, rangeArr, (intermediteArr_3)=>{
					startX = 0;
					endX = pX - length;
					let k = [];
					formIntermediateArr(server,startX, startY, endX, endY, rangeArr, (intermediteArr_4)=>{
						resultArr = preSort(rangeArr, rangeSize, pY - length);
					})
				})
			})
		})
	}
	else if (minY+rangeSize >(length) && minX < 0 ) {
		// console.log("here");
		let pY = minY+rangeSize;
		startX = length - Math.abs(minX);;
		endX = length;
		startY = minY;
		endY = length;
		// console.log(`startX:${startX} endX:${endX} startY:${startY} endY:${endY} pY:${pY}`)
		formIntermediateArr(server,startX, startY, endX, endY, rangeArr, (intermediteArr)=>{
			startY = 0;
			endY = pY - length;
			let d = [];
			// console.log(`startX:${startX} endX:${endX} startY:${startY} endY:${endY} pY:${pY}`)
			formIntermediateArr(server,startX, startY, endX, endY, rangeArr, (intermediteArr_2)=>{
				startX = 0;
				endX = rangeSize - Math.abs(minX);
				let k = [];
				// console.log(`startX:${startX} endX:${endX} startY:${startY} endY:${endY} pY:${pY}`)
				formIntermediateArr(server,startX, startY, endX, endY, rangeArr, (intermediteArr_3)=>{
					startY = minY;
					endY = length;
					let t = [];
					// console.log(`startX:${startX} endX:${endX} startY:${startY} endY:${endY} pY:${pY}`)
					formIntermediateArr(server,startX, startY, endX, endY, rangeArr, (intermediteArr_4)=>{
						// resultArr = preSort(rangeArr, rangeSize, pY - (length-1)); // предыдущая реализация
						resultArr = preSort(rangeArr, rangeSize, rangeSize - Math.abs(minX));
						// console.log(resultArr);
					})

				})
			})

		})
		
	}
	else if (minX<0){
		endX = length;
		startX = length - Math.abs(minX);
		formIntermediateArr(server,startX, startY, endX, endY, rangeArr, (intermediteArr)=>{
			endX = rangeSize - Math.abs(minX);
			startX = 0;
			formIntermediateArr(server,startX, startY, endX, endY, intermediteArr, (intermediteArr_2)=>{
				 resultArr = formResultArr(intermediteArr_2, rangeSize);
			});
		});
	}
	else if (minX+rangeSize > length){
		let p = minX+rangeSize;
		endX = length;
		formIntermediateArr(server,startX, startY, endX, endY, rangeArr, (intermediteArr)=>{
			startX = 0;
			endX = p - length;
			formIntermediateArr(server, startX, startY, endX, endY, rangeArr, (intermediteArr_2)=>{
				 resultArr = formResultArr(intermediteArr_2, rangeSize)
			})
		});
	}
	else if (minY < 0){
		startY = length - Math.abs(minY);
		endY = length;
		formIntermediateArr(server, startX, startY, endX, endY, rangeArr, (intermediteArr)=>{
			let resultArr_1 = formResultArr_Y(intermediteArr, rangeSize, endY - startY )
			startY = 0;
			endY = rangeSize - Math.abs(minY);
			let d = []
			formIntermediateArr(server, startX, startY, endX, endY, d, (intermediteArr_2)=>{
				resultArr = mergerTwoArr(resultArr_1, intermediteArr_2);
			});
		});
	}
	else if (minY+rangeSize > length){
		let p = minY+rangeSize;
		endY = length;
		formIntermediateArr(server, startX, startY, endX, endY, rangeArr, (intermediteArr)=>{
			let resultArr_1 = formResultArr_Y(intermediteArr, rangeSize, endY - minY);
			startY = 0;
			endY = p - length;
			let d = [];
			formIntermediateArr(server, startX, startY, endX, endY, d, (intermediteArr_2)=>{
				resultArr = mergerTwoArr(resultArr_1, intermediteArr_2);
			});
		});
	} 
	else {
		formIntermediateArr(server, startX, startY, endX, endY, rangeArr, (intermediteArr)=>{
			 resultArr = formResultArr(intermediteArr, rangeSize)
		})
	}
	let center = (resultArr.length-1) - halfSize;
	let centerSection = resultArr[center][center];
	user.globalMap.centerMap.x = centerSection.x;
	user.globalMap.centerMap.y = centerSection.y;

	return callback(resultArr)
}

// setTimeout(getMapSector,5000, options);

//формирует массив со списком тайлов
function formIntermediateArr(server, startX, startY, endX, endY, intermediteArr, callback){
	for (let i=startX; i<endX; i++){
		for (let h=startY; h<endY; h++){
			intermediteArr.push(GlobalMap[server][i][h]);
		}
	}
	return callback(intermediteArr)
}

//формирует двумерный массив
function formResultArr(intermediteArr, size){
	let count = 0;
	let itogArr = [];
	for (let i=0; i<size; i++){
		let f = [];
		itogArr.push(f);
		for(let h=0; h<size; h++){
			itogArr[i][h] = intermediteArr[count];
			count++;
		}
	}
	return itogArr;
}


//формирует двумерный массив для оси Y
function formResultArr_Y(intermediteArr, size, endY){
	let count = 0;
	let itogArr = [];
	for (let i=0; i<size; i++){
		let f = [];
		itogArr.push(f);
		for(let h=0; h<endY; h++){
			itogArr[i][h] = intermediteArr[count];
			count++;
		}
	}
	return itogArr;
}

//соединяет два массива в итоговый двумерный
function mergerTwoArr(doubleArr, arr){
	for (let i=0; i<doubleArr.length; i++){
		 let x = doubleArr[i][0].x;
		 for (let h=0; h<arr.length; h++){
		 	if (arr[h].x == x){
		 		doubleArr[i].push(arr[h]);
		 	}
		 }
	}
	return doubleArr;
}


//сортирует массив по Х - от меньшего к большему
function preSort(arr, size, minX){
	// console.log(minX)
	let sorted = arr.sort((a,b)=>{
		if (a.x - b.x != 0){
			return a.x - b.x;
		}else {
			return a.y - a.y;
		}
	});


	let c = preUnsift(arr, minX, "x");
	let g = formResultArr(c, size)
	
	//
	for (let i=0; i<g.length; i++){
		g[i].sort((a,b)=>{
			if (a.y > b.y){
				return 1;
			}else {return -1}
		})
	}

	for (let i=0; i<g.length; i++){
		preUnsift(g[i], minX, "y")
	}
	return g;
}
//перемещает некоторые элементы массива, с конца, в начало
function preUnsift(arr, num, OS){
	let d = [];
	for (let i=arr.length-1; i>0; i--){
		if (arr[i][OS] >= num){
			d.push(arr[i]);
			arr.splice(i,1);
		}
	}
	for (let i=0; i<d.length; i++){
		arr.unshift(d[i]);
	}
	return arr
}
module.exports = getGlobalMapSector;

