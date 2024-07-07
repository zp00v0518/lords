import types from '../types/index.js';
const typeList = types.list;
import createHeroes from '../createHeroes.js';
import images from './images.js';
import types_race from '../../race/types_races.js';

const rampart = {
  0: createHeroes({
    appName: 'kir',
    type: typeList[0],
    img: images.kir,
    name: 'Kirr',
    race: types_race.rampart,
  }),
  1: createHeroes({
    appName: 'klency',
    type: typeList[1],
    img: images.klency,
    name: 'Klency',
    race: types_race.rampart,
  }),
  2: createHeroes({
    appName: 'elezar',
    type: typeList[2],
    img: images.elezar,
    name: 'Elezar',
    race: types_race.rampart,
  }),
};

export default rampart;
