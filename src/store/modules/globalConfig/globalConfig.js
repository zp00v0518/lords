// к данным с бэка подмешиваются фронтовые данные в папке "./races"
import fromBackend from '../../../fromBackend';
import races from './races';
import { mergeRcursive } from '../../../utils';
// к данным с бэка подмешиваю данные с фронта
fromBackend.Race.typeList.forEach(key => {
  if (races[key]) {
    mergeRcursive(fromBackend.Race[key], races[key]);
  }
});

const globalConfig = {
  state: {
    races: fromBackend.Race
  }
};
export default globalConfig;
