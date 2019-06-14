<template>
  <section class="hall__wrap">
    <div class="hall__row" v-for="(row, rowIndex) in rowsIndex" :key="rowIndex">
      <div v-for="item in row" :key="item" class="hall__row__item">
        <canvas :ref="'canvas'+item" :data-building="item" class="hall__row__item-icon"></canvas>
        <div :class="['hall__row__item-footer', {'prepare': checkPrepare(item)}]">{{names[item]}}</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Hall",
  props: {
    townRaceName: String,
    currentTown: null,
    gloss: null
  },
  data() {
    return {
      rowsIndex: [],
      races: this.$store.state.globalConfig.races,
      listBuildings: null,
      checkSource: this.$store.state.globalConfig.all.checkSource,
      sources: this.currentTown.town.storage.sources,
      names: {}
    };
  },
  created() {
    const z = this.$store.state.globalConfig.listBuildings;
    this.listBuildings = z;
    this.rowsIndex = [
      [z.hall.name, z.fort.name, z.tavern.name],
      [z.market.name, z.guild.name, z.storage.name],
      [z.barraks_1.name, z.barraks_2.name, z.barraks_3.name, z.barraks_4.name],
      [z.barraks_5.name, z.barraks_6.name, z.barraks_7.name]
    ];
  },
  computed: {
    buildings() {
      return this.$store.state.globalConfig.races[this.townRaceName].buildings;
    }
  },
  methods: {
    checkPrepare(name) {
      let flag;
      const currBuilding = this.currentTown.town[name];
      const nextLvl = currBuilding ? currBuilding.lvl + 1 : 1;
      this.names[name] = this.gloss[name].lvl[nextLvl].txt;
      const nextBuilding = this.buildings[name].lvl[nextLvl];
      const if_buildings = nextBuilding.if;
      flag = if_buildings.length === 0;
      flag = if_buildings.every(item => {
        const next = this.buildings[item.building];
        return next.lvl[item.lvl].is;
      });
      if (flag) {
        flag = this.checkSource(nextBuilding.price, this.sources);
      }
      return flag;
    }
  },
  mounted() {
    const townRaceName = this.townRaceName;
    const fileName = townRaceName + "tiles";
    // eslint-disable-next-line
    const img = sourceLoader.sources.towns[townRaceName][fileName];
    Object.keys(this.$refs).forEach(key => {
      const el = this.$refs[key][0];
      const ctx = el.getContext("2d");
      const building = el.dataset.building;
      const coords = tumb[building];
      ctx.drawImage(
        img,
        coords.x,
        coords.y,
        150,
        70,
        0,
        0,
        el.width,
        el.height
      );
    });
  }
};

const tumb = {
  hall: { x: 150, y: 70 },
  fort: { x: 900, y: 0 },
  tavern: { x: 750, y: 0 },
  market: { x: 750, y: 70 },
  storage: { x: 900, y: 70 },
  guild: { x: 0, y: 0 },
  barraks_1: { x: 0, y: 210 },
  barraks_2: { x: 150, y: 210 },
  barraks_3: { x: 300, y: 210 },
  barraks_4: { x: 450, y: 210 },
  barraks_5: { x: 600, y: 210 },
  barraks_6: { x: 750, y: 210 },
  barraks_7: { x: 900, y: 210 }
};
</script>

<style lang='scss' scoped>
.hall {
  &__wrap {
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 10;
    padding: 3% 0;
  }
  &__row {
    display: flex;
    justify-content: center;
    height: 17%;
    // padding: 3% 0;
    &__item {
      margin: 0 3%;
      width: 20%;
      min-width: 17%;
      border: 1px solid white;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      &-icon {
        height: 75%;
        border: 1px solid green;
        // background-image: url("../../../../../../frontEnd/img/towns/rampart/ramparttiles.jpg");
        // background-size: 100% 100%;
        // background-repeat: no-repeat;
        // background-position-x: 0px;
        // background-position-y: 0px;
      }
      &-footer {
        height: 25%;
        min-height: 20px;
        @include center;
        text-transform: capitalize;
        background-color: red;
        &.prepare {
          background-color: green;
        }
      }
    }
  }
}
</style>
