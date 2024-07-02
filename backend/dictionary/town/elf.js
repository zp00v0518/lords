import Town from '../../town/Town.js';
const town_list = Town.listBuildings;
import { hall, market, guild, storage, tavern, fort } from './buildings/index.js';

const elf = {
  [town_list.hall.name]: hall,
  [town_list.market.name]: market,
  [town_list.guild.name]: guild,
  [town_list.storage.name]: storage,
  [town_list.tavern.name]: tavern,
  [town_list.fort.name]: fort
};

export default elf;
