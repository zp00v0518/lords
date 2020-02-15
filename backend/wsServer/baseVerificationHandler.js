function hero(id, sector, info) {
  const { heroesList } = info.player;
  const template = {
    is: false
  };
  const hero = heroesList.find(i => i._id.toString() === id);
  if (!hero) return template;
  const heroes_in_town = sector.heroes;
  if (!heroes_in_town || !heroes_in_town.some(i => i.toString() === id))
    return template;
  template.hero = JSON.parse(JSON.stringify(hero));
  template.is = true;
  return template;
}

module.exports = { hero };
