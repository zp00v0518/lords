import Race from '../../race/Race.js';
const race_list = Race.typeList;
import rampart from './rampat.js';
import elf from './elf.js';

const town = {
  race: {
    [race_list[0]]: { ...rampart },
    [race_list[1]]: { ...elf }
  }
};

export default town;
