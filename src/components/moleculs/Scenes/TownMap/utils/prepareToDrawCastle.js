function prepareToDrawCastle(){
			for(let building in baseBuildings){
				let imgCoords = Castles.race[raceUser].imgCoords;
				Castles.race[raceUser].buildings[building] = baseBuildings[building];
				Castles.race[raceUser].buildings[building].imgInfo.coords = imgCoords[building];
			}


		for (let buildingName in Castles.race[raceUser].buildings){
			const building = Castles.race[raceUser].buildings[buildingName]
			let d = building.imgInfo.name;
			let imgName = d.split(".")[0]; 
			let img = sourceLoader.sources[imgName];
			building.imgInfo.img = img;
			building.name = buildingName;
			getPixArrBuilding(building);
			if (building.is){
				Castles.listDrawBuilding.push(building);
			}
		}
		configListDrawBuilding(castleScene.width, castleScene.height);
		drawBuildingInCastle(castleScene,Castles.listDrawBuilding);

		function getPixArrBuilding(building){
			const ctx = helpCanvas.ctx;
			const img = building.imgInfo.img;
			const imgWidth = img.width;
			const imgHeight = img.height;
			const imgX = building.imgInfo.coords.x;
			const imgY = building.imgInfo.coords.y;
			const buildingName = building.name;
			const regExp = /other/ig;
			if(!regExp.test(buildingName)){
					ctx.clearRect(0,0,helpCanvas.width, helpCanvas.height )
				ctx.drawImage(img, 0, 0, imgWidth/2,imgHeight, 0,0, imgWidth/2, imgHeight);
				const pixArr = ctx.getImageData(0,0, imgWidth/2,imgHeight);
				building.imgInfo.pixArr = pixArr;
			} else{
				building.imgInfo.pixArr = false;
			}
		}

		//расставляет по определенному порядку объекты, которые должны быть отрисованы
		function configListDrawBuilding(maxX, maxY){
			const arr = Castles.listDrawBuilding;
			//сортировка по нижнему правому краю картинки
			arr.sort((one,two)=>{
				const x1 = one.imgInfo.coords.x;
				const y1 = one.imgInfo.coords.y;		
				// const leftX1 = x1;
				// const leftY1 = y1+one.imgInfo.pixArr.height;
				let bottomX1 = x1+one.imgInfo.pixArr.width;
				let bottomY1 = y1+one.imgInfo.pixArr.height

				const x2 = two.imgInfo.coords.x;
				const y2 = two.imgInfo.coords.y;
				// const leftX2 = x2;
				// const leftY2 = y2+two.imgInfo.pixArr.height;
				let bottomX2 = x2+two.imgInfo.pixArr.width;
				let bottomY2 = y2+two.imgInfo.pixArr.height;

				if (bottomX1 > maxX){
					 bottomX1 = maxX;
				}
				if (bottomY1 > maxY){
				   bottomY1 = maxY;
				}
				if (bottomX2 > maxX){
					 bottomX2 = maxX;
				}
				if (bottomY2 > maxY){
				   bottomY2 = maxY;
				}
				const index1 = getIndex(bottomX1,bottomY1);
				const index2 = getIndex(bottomX2,bottomY2);
				return index1-index2;
				
				function getIndex(x,y){
					let index;
					if (x == 0 && y > 0){
						index = maxX*y;
					}
					else if (y == 0 && x >0){
						index = x;
					}
					else {
						index = (y*maxX)+x;
					}
					return index;
				}
			});
		//сортировка по zIndex картинки;
			arr.sort((one,two)=>{
				const zIndex1 = one.imgInfo.coords.zIndex || 0;
				const zIndex2 = two.imgInfo.coords.zIndex || 0;
				return zIndex1 - zIndex2;
			})
		}
} //конец prepareToDrawCastle
