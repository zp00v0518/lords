export default function (race_name, type, type_img = 'ava') {
  const { globalConfig, gameSources } = this;
  const { races } = globalConfig;
  const hero = races.heroes.getOneHero(race_name, type);
  const imgInfo = hero.img;
  const dir = imgInfo[type_img].dir;
  const base = imgInfo[type_img].base;
  return `./${dir}/${base}`;
}
