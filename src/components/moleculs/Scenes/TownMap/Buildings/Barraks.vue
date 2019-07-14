<template>
  <section class="barraks">
    <div class="barraks__title">Нанять {{unit.name}}</div>
    <div class="barraks__icons">
      <div class="barraks__icons__item" v-for="i in buildingData.lvl" :key="i">
        <img :src="urlToImg" class="barraks__icons__unit" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Barraks",
  props: {
    townRaceName: String,
    currentTown: null,
    gloss: null,
    buildingData: null
  },
  created() {
    console.log(this.buildInfo);
    console.log(this.unit);
  },
  data() {
    return {
      baseUrl: "img/units/"
    };
  },
  computed: {
    urlToImg() {
      return `${this.baseUrl}${this.townRaceName}/${this.unit.name}.jpg`;
      // return 'img/units/rampart/15.jpg'
    },
    storage() {
      return this.currentTown.town.storage;
    },
    raceData() {
      const { globalConfig } = this.$store.state;
      return globalConfig.races[this.townRaceName];
    },
    buildInfo() {
      const raceBuildings = this.raceData.buildings;
      const { type, lvl } = this.buildingData;
      return raceBuildings[type].lvl[lvl];
    },
    unit() {
      const unitName = this.buildInfo.unit.name;
      return this.raceData.units[unitName];
    },
    unit_2() {
      const unitName = this.buildInfo.unit.name;
      return this.raceData.units[unitName];
    },
    sumUnits() {
      return this.buildingData.work.nowValue;
    }
  },

  methods: {}
};
</script>

<style lang='scss' scoped>
.barraks {
  width: 80%;
  height: 80%;
  background-color: white;
  align-self: center;
  margin-top: 10px;
  background-image: url("../../../../../../frontEnd/img/main/background/panelbg.jpg");
  &__title {
    @include center;
  }
  &__icons {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 50%;
    &__item {
      width: 30%;
      height: 100%;
      border: 1px solid;
      // background-image: url("../../../../../../frontEnd/img/towns/rampart/rampart_u.png");
      // background-repeat: no-repeat;
      // background-size: 100%;
      cursor: pointer;
    }
    &__unit {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
