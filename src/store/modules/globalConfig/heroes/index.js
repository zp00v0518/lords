const d = {
  getHeroImg(race_name, type, type_img = 'ava') {
    console.log('1111', this)
    const hero = this.getOneHero(race_name, type)
    const imgInfo = hero.img
    const dir = imgInfo[type_img].dir
    const base = imgInfo[type_img].base
    return `./${dir}/${base}`
  }
}

export default d
