<template>
  <section class="barraks">
    <div class="barraks__title">Нанять {{unit.name}}</div>
    <div class="barraks__icons">
      <div
        :class="['barraks__icons__item',{hoverItem: hoverItem === i} ]"
        v-for="i in buildingData.lvl"
        :key="i"
      >
        <img :src="getImageUrl(i)" class="barraks__icons__unit" @click="hoverItem = i" />
      </div>
    </div>
    <div class="barraks__cost">
      <div class="barraks__cost--base">
        <span class="barraks__cost--title">Стоимость</span>
        <div class="barraks__cost--wrap">
          <div class="barraks__cost--item" v-for="(value, resource) in cost" :key="resource">
            <img :src="`img/resources/${resource}.gif`" class="barraks__cost--resource" />
            <span class="barraks__cost--value">{{value}}</span>
          </div>
        </div>
      </div>

      <div class="barraks__cost--calculate">
        <div class="barraks__cost--sum">
          <span class="barraks__cost--title">Доступно</span>
          <span class="barraks__cost--value">{{available}}</span>
        </div>
        <div class="barraks__cost--hiring">
          <span class="barraks__cost--title">Нанять</span>
          <span class="barraks__cost--value">{{hiring}}</span>
        </div>
        <input
          class="barraks__cost--range"
          type="range"
          min="0"
          :max="maxRange"
          v-model="hiring"
          step="1"
        />
      </div>

      <div class="barraks__cost--total">
        <span class="barraks__cost--title">Тотал</span>
        <div class="barraks__cost--wrap">
          <div class="barraks__cost--item" v-for="(value, resource) in totalCost" :key="resource">
            <img :src="`img/resources/${resource}.gif`" class="barraks__cost--resource" />
            <span class="barraks__cost--value">{{value}}</span>
          </div>
        </div>
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
  data() {
    return {
      baseUrl: "img/units/",
      hiring: 0,
      hoverItem: 1,
      maxRange: 3000
    };
  },
  created() {
    this.maxRange = this.available;
  },
  computed: {
    available() {
      const nowValue = Math.floor(this.buildingData.work.nowValue);
      return nowValue - this.hiring;
    },
    cost() {
      return this.unit.cost;
    },
    totalCost() {
      const newCost = Object.assign({}, this.cost);
      const { hiring } = this;
      Object.keys(newCost).forEach(key => {
        const value = newCost[key];
        newCost[key] = value * hiring;
      });
      return newCost;
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
      if (this.hoverItem === 1) {
        return this.raceData.units[unitName];
      }
      if (this.hoverItem === 2) {
        return this.raceData.units[unitName + "_2"];
      }
    },
    sumUnits() {
      return this.buildingData.work.nowValue;
    }
  },
  methods: {
    getImageUrl(index) {
      if (index === 1) {
        return `${this.baseUrl}${this.townRaceName}/ava/${this.unit.name}.jpg`;
      }
      if (index === 2) {
        return `${this.baseUrl}${this.townRaceName}/ava/${this.unit.name}_2.jpg`;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.barraks {
  width: 80%;
  height: 80%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  margin-top: 10px;
  background-image: url("../../../../../../frontEnd/img/main/background/panelbg.jpg");
  &__title {
    @include center;
    color: white;
  }
  &__icons {
    display: flex;
    justify-content: space-around;
    width: 70%;
    height: 30%;
    margin: 15px 0 25px;
    &__item {
      width: 30%;
      height: 100%;
      border: 1px solid;
      cursor: pointer;
      &.hoverItem {
        border: 3px solid red;
      }
    }
    &__unit {
      width: 100%;
      height: 100%;
    }
  }
  &__cost {
    width: 80%;
    height: 25%;
    display: flex;
    justify-content: space-between;
    &--wrap {
      display: flex;
      width: 100%;
      height: 80%;
      justify-content: center;
      margin-top: 20px;
    }
    &--item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 5px;
    }
    &--resource {
      margin-bottom: 10px;
    }
    &--base,
    &--total {
      height: 100%;
      width: 20%;
      border: 1px solid;
    }
    &--calculate {
      width: 35%;
      flex-grow: 3;
      margin: 0 15px;
      border: 1px solid;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
    &--sum,
    &--hiring {
      width: 40%;
      height: 40%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &--range {
      width: 90%;
    }
    &--title,
    &--value {
      font-size: 13px;
      @include center;
      color: white;
    }
  }
}
</style>
