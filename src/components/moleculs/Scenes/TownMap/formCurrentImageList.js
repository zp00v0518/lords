// подготавливает массив для отрисовке на канве
function formCurrentImageList(sector, raceName, allBuildings) {
  const listImg = sourceLoader.sources.towns[raceName];
  let arr = [];
  const buildings = allBuildings.races[raceName].buildings;
  const listBuildings = buildings.listBuildings;
  const self = this;
  listBuildings.forEach(name => {
    const d = sector.town[name];
    if (d) {
      const lvl = d.lvl;
       const obj = allBuildings.races.rampart.buildings[name].lvl[lvl];
      // const obj = buildings[name].lvl[lvl]; временно, для определения координат картинки
      const imgInfo = obj.imgInfo;
      const img = listImg[imgInfo.name];
      imgInfo.img = img;
      // передача this
      prepareToDraw.call(self, imgInfo)
      arr.push(obj);
    }
  });
  buildings.default_img.forEach(item => {
    if(item.is){
      const name = item.imgInfo.name;
      item.imgInfo.img = listImg[name];
      prepareToDraw.call(self, item.imgInfo)
      arr.push(item)
    }
  })
  arr = arr.sort((a, b) => {
    return a.imgInfo.zoom - b.imgInfo.zoom;
  })
  return arr;
}

// создает офф-канву с нарисованной на ней картинкой
function prepareToDraw(elem) {
  const img = elem.img;
  const scale_X = this.scale_X;
  const scale_Y = this.scale_Y;
  const pic = document.createElement('canvas');
  pic.width = img.width * scale_X;
  pic.height = img.height * scale_Y;
  const picCtx = pic.getContext('2d');
  picCtx.drawImage = (img, pic.width, pic.height);
  elem.picCtx = picCtx;
  // elem.pixArr = picCtx.getImageData(0,0,pic.width, pic.height);
}

export default formCurrentImageList;
