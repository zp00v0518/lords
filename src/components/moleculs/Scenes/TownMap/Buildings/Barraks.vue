<template>
  <section class="barraks">
    <div class="barraks__title">Нанять {{ unit.name }}</div>
    <div class="barraks__icons">
      <div
        :class="['barraks__icons__item', { hoverItem: hoverItem === i }]"
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
            <span class="barraks__cost--value">{{ value }}</span>
          </div>
        </div>
      </div>

      <div class="barraks__cost--calculate">
        <div class="barraks__cost--sum">
          <span class="barraks__cost--title">Доступно</span>
          <span class="barraks__cost--value">{{ available }}</span>
        </div>
        <div class="barraks__cost--hiring">
          <span class="barraks__cost--title">Нанять</span>
          <span class="barraks__cost--value" :class="{ isNotCost: isNotCost }">{{ hiring }}</span>
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
            <span
              class="barraks__cost--value"
              :class="{ isNotCost: getIsNotCost(value, resource) }"
            >{{ value }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="barraks__confirm">
      <GuiBtn type="buy" class="barraks__confirm--btn" :disabled="isCanBuy" @click="buyUnits" />
      <GuiBtn type="cancel" class="barraks__confirm--btn" @click="$emit('close')" />
    </div>
  </section>
</template>

<script>
import { currentSector } from '../../../../mixins';

export default {
  name: 'Barraks',
  mixins: [currentSector],
  props: {
    townRaceName: String,
    buildingData: null
    // currentSector: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      baseUrl: 'img/units/',
      hiring: '0',
      hoverItem: 1,
      maxRange: 3000
    };
  },
  created() {
    this.maxRange = this.available;
    console.log(this.currentSector);
  },
  computed: {
    available() {
      const nowValue = Math.floor(this.buildingData.work.nowValue);
      return nowValue - this.hiring;
    },
    cost() {
      return this.unit.cost;
    },
    isCanBuy() {
      return this.hiring === '0' || this.isNotCost;
    },
    isNotCost() {
      const { totalCost, storage } = this;
      const flag = Object.keys(totalCost).some(sourceName => {
        const num = totalCost[sourceName];
        const realNum = storage.sources[sourceName].nowValue;
        return num > Math.floor(realNum);
      });
      return flag;
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
    army() {
      return this.currentSector.town.army.units;
    },
    storage() {
      return this.currentSector.town.storage;
    },
    raceData() {
      const { globalConfig } = this;
      return globalConfig.races[this.townRaceName];
    },
    buildInfo() {
      const raceBuildings = this.raceData.buildings;
      const { type, lvl } = this.buildingData;
      return raceBuildings[type].lvl[lvl];
    },
    unitName() {
      return this.buildInfo.unit.name;
    },
    unit() {
      const { unitName } = this;
      if (this.hoverItem === 1) {
        return this.raceData.units[unitName];
      }
      if (this.hoverItem === 2) {
        return this.raceData.units[unitName + '_2'];
      }
    },
    sumUnits() {
      return this.buildingData.work.nowValue;
    }
  },
  methods: {
    buyUnits() {
      const { hiring, unit, army, globalConfig } = this;
      const base_army_length = globalConfig.all.Army.army_length;
      const army_length = Object.values(army).length;
      const unit_in_town = Object.values(army).some(i => i.name === unit.name);
      if (army_length >= base_army_length && !unit_in_town) {
        alert('В городе нет места для юнита');
        return;
      }
      const { $store, currentSector } = this;
      const sectorIndex = $store.state.userSectors.sectors.findIndex(i => i._id === currentSector._id);
      const message = {
        type: 'buyUnits',
        data: {
          hiring: +hiring,
          unitName: unit.name,
          sectorIndex
        }
      };
      this.$ws.sendMessage(message);
      this.$emit('close');
    },
    getImageUrl(index) {
      const { unitName } = this;
      if (index === 1) {
        return `${this.baseUrl}${this.townRaceName}/ava/${unitName}.jpg`;
      }
      if (index === 2) {
        return `${this.baseUrl}${this.townRaceName}/ava/${unitName}_2.jpg`;
      }
    },
    getIsNotCost(value, resourceName) {
      const { storage } = this;
      const realNum = storage.sources[resourceName].nowValue;
      return value > Math.floor(realNum);
    }
  }
};
</script>

<style lang="scss">
.barraks {
  width: 80%;
  height: 80%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  margin-top: 10px;
  background-image: url('../../../../../../frontEnd/img/main/background/panelbg.jpg');
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
        border: 3px solid $main-red;
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
    margin-bottom: 15px;
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
      &.isNotCost {
        color: $main-red;
      }
    }
  }
  &__confirm {
    display: flex;
    &--btn {
      margin: 0px 5px;
    }
  }
}
</style>
