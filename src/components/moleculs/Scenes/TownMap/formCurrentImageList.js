
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
      arr.push(obj);
    }
  });
  buildings.default_img.forEach(item => {
    if(item.is){
      const name = item.imgInfo.name;
      item.imgInfo.img = listImg[name];
      prepareToDraw.call(self, item.imgInfo.img)
      arr.push(item)
    }
  })
  arr = arr.sort((a, b) => {
    return a.imgInfo.zoom - b.imgInfo.zoom;
  })
  return arr;
}

function prepareToDraw(img) {
  console.log(this)
  const pic = document.createElement('canvas');
  pic.width = img.width;
  pic.height = img.height;
}

export default formCurrentImageList;
