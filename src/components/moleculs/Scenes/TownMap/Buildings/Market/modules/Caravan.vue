<template>
  <div>
    <div class="caravan__init">
      <img :src="images.caravan.ico.src" class="caravan__init__ico" />
      <div class="caravan__available">
        <div
          class="caravan__available__item"
          v-for="(available, name) in Caravan.available"
          :key="name"
        >
          <img :src="gameSources.resources.small[name].src" class="caravan__available__item--ico" />
          <input
            type="text"
            class="caravan__available__item--input"
            :value="sendSources[name]"
            @input="handlerInput($event, name)"
          />
          <div class="caravan__available__item--txt">/{{available - busy[name]}}</div>
        </div>
      </div>
      <div class="caravan__available--notice">Max load</div>
    </div>
    <div class="caravan__target"></div>
  </div>
</template>

<script>
import { currentSector } from '../../../../../../mixins';

export default {
  name: 'Caravan',
  mixins: [currentSector],
  data() {
    return {
      sendSources: {}
    };
  },
  created() {
    Object.keys(this.Caravan.available).forEach(key => {
      this.$set(this.sendSources, key, 0);
    });
  },
  computed: {
    images() {
      return this.gameSources.market;
    },
    Caravan() {
      return this.globalConfig.all.Caravan;
    },
    busy() {
      return this.currentSector.town.caravan;
    }
  },
  methods: {
    handlerInput(ev, type) {
      const { currentSector } = this;
      const { target } = ev;
      const value = ~~parseInt(target.value);
      const checkValue = this.Caravan.checkAvailable(value, type, currentSector.town);
      this.sendSources[type] = checkValue;
      target.value = checkValue;
    }
  }
};
</script>

<style lang="scss">
.caravan {
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
      max-width: 45px;
      width: calc(100% / 8);
      margin: 0 5px;
      font-size: 13px;
      &--ico {
        height: 20px;
        margin-bottom: 5px;
        align-self: center;
      }
      &--input {
        margin-bottom: 5px;
        font-size: 12px;
        padding: 2px 3px;
      }
      &--txt {
        color: red;
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
</style>
