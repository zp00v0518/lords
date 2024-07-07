// к данным с бэка подмешиваются фронтовые данные в папке "./races"
import races from './races';
import { mergeRecursive } from '../../../utils';
import fromBackend from '../../../fromBackend';
const listBuildings = fromBackend.Town.listBuildings;

// к данным с бэка подмешиваю данные с фронта
fromBackend?.Race?.typeList.forEach((key) => {
  if (races[key]) {
    mergeRecursive(fromBackend.Race[key], races[key]);
  }
});

const globalConfig = {
  state: {
    races: fromBackend?.Race,
    listBuildings: listBuildings,
    all: fromBackend,
    choicesRace: false,
  },
  mutations: {
    CHOICE_RASE(state, payload) {
      state.choicesRace = payload.status;
    },
  },
};
export default globalConfig;
