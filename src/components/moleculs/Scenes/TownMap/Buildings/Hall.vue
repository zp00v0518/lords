<template>
  <section class="hall__wrap">
    <div class="hall__row" v-for="(row, rowIndex) in rowsIndex" :key="rowIndex">
      <div
        v-for="item in row"
        :key="item"
        class="hall__row__item"
        @click="handlerClick($event, item)"
      >
        <canvas :ref="'canvas' + item" :data-building="item" class="hall__row__item-icon"></canvas>
        <div
          :class="['hall__row__item-footer', { [checkPrepare(item)]: true }]"
        >{{ houses[item].name }}</div>
      </div>
    </div>
  </section>
</template>

<script>
import { currentSector } from '../../../../mixins';

export default {
  name: 'Hall',
  mixins: [currentSector],
  props: {
    townRaceName: String
  },
  data() {
    return {
      rowsIndex: [],
      races: this.$store.state.globalConfig.races,
      listBuildings: null,
      // checkSource: this.$store.state.globalConfig.all.Resources.checkSource,
      houses: {}
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
    sources() {
      return this.currentSector.town.storage.sources;
    },
    buildings() {
      return this.$store.state.globalConfig.races[this.townRaceName].buildings;
    },
    Resources() {
      return this.$store.state.globalConfig.all.Resources;
    }
  },
  methods: {
    handlerClick(event, nameBuilding) {
      const { townRaceName } = this;
      const build = this.houses[nameBuilding];
      const target = event.target.parentNode.querySelector('.hall__row__item-icon');
      const coords = tumb[target.dataset.building];
      const fileName = townRaceName + 'tiles';
      // eslint-disable-next-line
      const img = sourceLoader.sources.towns[townRaceName][fileName];
      const payload = {
        title: build.name,
        data: {
          building: build,
          raceName: townRaceName,
          storage: this.sources,
          tumb: {
            coords,
            elem: target,
            img
          }
        },
        type: 'upgradeBuilding'
      };
      this.$store.commit('DIALOG_SHOW', payload);
    },
    checkPrepare(name) {
      const { currentSector, buildings, townRaceName, gloss } = this;
      let flag;
      const currBuilding = currentSector.town[name];
      let nextLvl = currBuilding ? currBuilding.lvl + 1 : 1;
      let nextBuilding = buildings[name].lvl[nextLvl];
      const maxLvl = nextBuilding === undefined;
      if (maxLvl) {
        nextBuilding = buildings[name].lvl[nextLvl - 1];
        nextLvl--;
      }
      this.houses[name] = { ...buildings[name] };
      this.houses[name].name = gloss.town.race[townRaceName][name].lvl[nextLvl].txt;
      this.houses[name].nextLvl = nextLvl;
      if (maxLvl) {
        return 'max-lvl';
      }
      const if_buildings = nextBuilding.if;
      flag = if_buildings.length === 0;
      flag = if_buildings.every(item => {
        const next = buildings[item.building];
        return next.lvl[item.lvl].is;
      });
      if (flag) {
        flag = this.Resources.checkSource(nextBuilding.price, this.sources);
      }
      return flag ? 'prepare' : 'no-prepare';
    }
  },
  mounted() {
    const townRaceName = this.townRaceName;
    const fileName = townRaceName + 'tiles';
    // eslint-disable-next-line
    const img = sourceLoader.sources.towns[townRaceName][fileName];
    Object.keys(this.$refs).forEach(key => {
      const el = this.$refs[key][0];
      const ctx = el.getContext('2d');
      const building = el.dataset.building;
      const coords = tumb[building];
      ctx.drawImage(img, coords.x, coords.y, 150, 70, 0, 0, el.width, el.height);
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

<style lang="scss">
.hall {
  &__wrap {
    color: white;
    font-size: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 10;
    padding: 1% 0;
    overflow: hidden;
    @media (max-width: $tablet) {
      font-size: 10px;
    }
    @media (max-width: $laptop) {
      font-size: 12px;
    }
  }
  &__row {
    display: flex;
    justify-content: center;
    height: 20%;
    margin: 1% 0px;
    &__item {
      margin: 0 3%;
      width: 20%;
      border: 1px solid white;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      text-align: center;
      overflow: hidden;
      &-icon {
        height: 75%;
        border: 1px solid green;
        @media (max-width: $tablet) {
          height: 70%;
        }
      }
      &-footer {
        flex-grow: 2;
        @include center;
        text-transform: capitalize;
        &.prepare {
          background-color: green;
        }
        &.no-prepare {
          background-color: $main-red;
        }
        &.max-lvl {
          background-color: yellow;
          color: blue;
        }
      }
    }
  }
}
</style>
