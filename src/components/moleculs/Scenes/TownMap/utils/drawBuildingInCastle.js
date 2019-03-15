
function drawBuildingInCastle(scene, drawList, buildingHover){
	const ctx = scene.ctx;
	for(let i=0; i<drawList.length; i++){
		const building = drawList[i];
		const x = building.imgInfo.coords.x;
		const y = building.imgInfo.coords.y;
		const img = building.imgInfo.img;
		const imgWidth = img.width;
		const imgHeight = img.height;
		const buildingName = building.name;
		const regExp = /other/ig;
		if(!regExp.test(buildingName)){
			ctx.drawImage(img, 0, 0, imgWidth/2,imgHeight, x,y, imgWidth/2, imgHeight);
		} else {
			ctx.drawImage(img, 0, 0, imgWidth,imgHeight, x,y, imgWidth, imgHeight);
		}
		if (buildingHover){
			const x = buildingHover.imgInfo.coords.x;
			const y = buildingHover.imgInfo.coords.y;
			const img = buildingHover.imgInfo.img;
			const imgWidth = img.width;
			const imgHeight = img.height;
			ctx.drawImage(img, imgWidth/2, 0, imgWidth/2,imgHeight, x,y, imgWidth/2, imgHeight);
		}

	}
};

function handlerHoverOnCastleScene(mouseX,mouseY, scene){
	const listDraw = Castles.listDrawBuilding;
		for (let i=listDraw.length-1; i>=0; i--){
			const building = listDraw[i]
			let o = checkMouseCoordsOnCastle(mouseX, mouseY , building, scene);
			if(o){
				const d = checkTransparentPixel(mouseX, mouseY , building);
				if (d){
						drawBuildingInCastle(scene, listDraw, building);
						Castles.hoverNow = building;
					break;
				}
			} else if (!o && Castles.hoverNow != null){
				drawBuildingInCastle(scene, listDraw);
				Castles.hoverNow = null;
			}
		}
}

//рисует путь и определяет находится ли курсор внутри этого пути;
function checkMouseCoordsOnCastle(mouseX,mouseY, building, scene){
	if (!building.imgInfo.pixArr){
		return false;
	}
	const ctx = scene.ctx;
	// const ctx = helpCanvas.ctx;
	const topX = building.imgInfo.coords.x;
	const topY = building.imgInfo.coords.y;
	const leftX = topX;
	const leftY = topY+building.imgInfo.pixArr.height;
	const rigthX = topX+building.imgInfo.pixArr.width;
	const rigthY = topY;
	const bottomX = rigthX;
	const bottomY = leftY;
	ctx.beginPath();
		ctx.strokeStyle = "transparent";
		// ctx.strokeStyle = "red";
		ctx.moveTo(leftX, leftY);
		ctx.lineTo(topX, topY);
		ctx.lineTo(rigthX, rigthY);
		ctx.lineTo(bottomX, bottomY);
		ctx.lineTo(leftX, leftY);
		ctx.stroke();
	ctx.closePath();
	return ctx.isPointInPath(mouseX,mouseY);
};

//определяет прозрачный ли пиксель
function checkTransparentPixel(clientX, clientY, building){
	const imgX = building.imgInfo.coords.x;
	const imgY = building.imgInfo.coords.y;
	const mouseX = clientX - imgX;//т.к. массив пикселей построен из начальных координат 0:0, делаю необходимые вычисления
	const mouseY = clientY - imgY;	
	// const mouseX = clientX
	// const mouseY = clientY
	const pixArr = building.imgInfo.pixArr;
	const index = getIndex(mouseX, mouseY, pixArr);
	let alpha = pixArr.data[index+3];//прозрачность
		if (index>pixArr.data.length){
			return ;
		}
		if (alpha >0){
			return true;

		}
		return;


//определяет индекс пикселя в массиве пикселей
	function getIndex(mouseX, mouseY, pixArr){
		let pixel;
			if (mouseX == 0 && mouseY > 0){
				pixel = pixArr.width*mouseY+1;
			}
			else if (mouseY == 0 && mouseX >0){
				pixel = mouseX;
			}
			else {
				pixel = (mouseY*pixArr.width+mouseX) -1;
			}
			let index = pixel*4;
			return index;
		}
}

