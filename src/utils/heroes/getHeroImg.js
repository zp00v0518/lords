export default function (race_name, type) {
  const { globalConfig, gameSources } = this;
  const { races } = globalConfig;
  const hero = races.heroes.getOneHero(race_name, type);
  const defaultImg = gameSources.heroes[race_name][hero.appName];
  // hero.img.url - це на випадок, коли буде функціонал зміни аватара
  return hero?.img?.url ? hero.img.url : defaultImg.src;
}
