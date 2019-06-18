const Town = require('../../town/Town');
const town_list = Town.listBuildings;
const { hall, market, guild, storage, tavern, fort } = require('./buildings');

const elf = {
  [town_list.hall.name]: hall,
  [town_list.market.name]: market,
  [town_list.guild.name]: guild,
  [town_list.storage.name]: storage,
  [town_list.tavern.name]: tavern,
  [town_list.fort.name]: fort
};

module.exports = elf;
