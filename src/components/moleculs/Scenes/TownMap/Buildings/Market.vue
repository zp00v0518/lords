<template>
  <div class="market">
    <div class="market__tabs">
      <div class="market__tabs__item">Caravan</div>
    </div>
    <div class="market__content">
      <template>
        <div class="market__caravan__init">
          <img :src="images.caravan.ico.src" class="market__caravan__init__ico" />
          <div class="market__caravan__available">
            <div
              v-for="(available, name) in baseCaravan.available"
              :key="name"
              class="market__caravan__available__item"
            >
              <img
                :src="gameSources.resources.small[name].src"
                class="market__caravan__available__item--ico"
              />
              <input
                type="text"
                class="market__caravan__available__item--input"
                :value="sendSources[name]"
                @input="setValueForSend($event,name)"
              />
              <div class="market__caravan__available__item--txt">/{{available - busy[name]}}</div>
            </div>
          </div>
          <div class="market__caravan__available--notice">Max load</div>
        </div>
        <div class="market__caravan__target"></div>
      </template>
    </div>
  </div>
</template>

<script>
import { currentSector } from '../../../../mixins';

export default {
  name: 'Market',
  mixins: [currentSector],

  data() {
    return {
      sendSources: {}
    };
  },
  // created() {
  //   const resourcesList = this.globalConfig.all.Resources.typeList;
  //   resourcesList.forEach(item => {
  //     this.sendSources[item] = 0;
  //   });
  // },
  computed: {
    images() {
      return this.gameSources.market;
    },
    baseCaravan() {
      return this.globalConfig.all.Caravan;
    },
    busy() {
      return this.currentSector.town.caravan;
    }
  },
  methods: {
    setValueForSend(ev, type) {
      const value = parseInt(ev.target.value);
      if (window.isNaN(value)) {
        this.sendSources[type] = this.sendSources[type];
        return;
      }
      this.sendSources[type] = value;
    }
  }
};
</script>

<style lang="scss">
.market {
  width: 90%;
  height: 90%;
  align-self: center;
  margin-top: 10px;
  background-image: url('../../../../../../frontEnd/img/main/background/panelbg.jpg');
  &__tabs {
    width: 100%;
    height: 20px;
    display: flex;
    border-bottom: 1px solid;
    align-items: center;
    margin-bottom: 15px;
    &__item {
      text-align: center;
      flex-grow: 2;
    }
  }
  &__caravan {
    &__init {
      display: flex;
      justify-content: center;
      &__ico {
        margin-right: 15px;
        width: 10%;
        max-width: 40px;
      }
    }
    &__available {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      width: 80%;
      &__item {
        display: flex;
        flex-direction: column;
        max-width: 40px;
        width: calc(100% / 8);
        margin: 0 5px;
        &--ico {
          height: 20px;
          margin-bottom: 5px;
          align-self: center;
        }
        &--input {
          margin-bottom: 5px;
        }
        &--txt {
          color: red;
          font-size: 12px;
          text-align: center;
        }
      }
      &--notice {
        width: 10%;
        font-size: 12px;
        height: 100%;
        align-self: flex-end;
      }
    }
  }
}
</style>
