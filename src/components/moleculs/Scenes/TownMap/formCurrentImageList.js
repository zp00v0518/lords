import Rampart from './Rampart';

function formCurrentImageList(sector, raceName, allBuildings) {
  const listImg = sourceLoader.sources.towns[raceName];
  const arr = [];
  const buildings = allBuildings.races[raceName].buildings;
  const listBuildings = buildings.listBuildings;
  listBuildings.forEach(name => {
    const d = sector.town[name];
    if (d) {
      const lvl = d.lvl;
      const obj = Rampart.buildings[name].lvl[lvl];
      // const obj = buildings[name].lvl[lvl]; временно, для определения координат картинки
      const imgInfo = obj.imgInfo;
      const img = listImg[imgInfo.name];
      imgInfo.img = img;
      arr.push(obj);
    }
  });
  return arr;
}

export default formCurrentImageList;
