<template>
  <div class="caravan">
    <div class="caravan__init">
      <div class="caravan__init__ico">
        <img :src="images.caravan.ico.src" />
      </div>
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
    <div class="caravan__target">
      <div class="caravan__target__info">
        <img :src="gameSources.other.wait.src" class="caravan__target__info--ico" />
        <div>{{timeMove}}</div>
      </div>
      <div class="caravan__target__choices">
        <div class="caravan__target__choices__coords">
          <span>Укажите координаты</span>
          <div class="caravan__target__choices__coords__item">
            X:
            <input type="text" :value="coords.x" @input="changeCoords($event, 'x')" />
          </div>
          <div class="caravan__target__choices__coords__item">
            Y:
            <input type="text" :value="coords.y" @input="changeCoords($event, 'y')" />
          </div>
        </div>
        <div class="caravan__target__choices__town">
          <span>или выберите свой город</span>
          <select v-model="selectedTown">
            <option selected disabled value="-1">Выберите город</option>
            <option v-for="item in choices" :value="item.value" :key="item.value">{{item.label}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="caravan__footer">
      <GuiBtn type="ok" class="caravan__footer--btn" :disabled="disabledOk" @click="sendCaravan" />
      <GuiBtn type="cancel" class="caravan__footer--btn" @click="$emit('close')" />
    </div>
  </div>
</template>

<script>
import { currentSector } from '../../../../../../mixins';
import { getAsTimeString } from '../../../../../../../utils';

export default {
  name: 'Caravan',
  mixins: [currentSector],
  props: {
    targetSector: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      sendSources: {},
      choices: [],
      selectedTown: '-1',
      coords: {
        x: '',
        y: ''
      }
    };
  },
  created() {
    this.createChoices();
    this.checkFirstValue();
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
    },
    timeMove() {
      const { Caravan, currentSector, coords } = this;
      if (coords.x === '' || coords.y === '') return '';
      const time = Caravan.getTimeMoveCaravanOnMap(currentSector, coords);
      return this.getAsTimeString(time);
    },
    disabledOk() {
      const { coords, sendSources } = this;
      const checkCoords = coords.x === '' || coords.y === '';
      const res = Object.keys(sendSources).some(key => {
        const item = sendSources[key];
        return item > 0;
      });
      return checkCoords || !res;
    }
  },
  watch: {
    coords: {
      deep: true,
      handler(ev) {
        const { choices } = this;
        const val = choices.find(i => i.x === ev.x && i.y === ev.y);
        if (val) {
          this.selectedTown = val.value;
        } else {
          this.selectedTown = '-1';
        }
      }
    },
    selectedTown: function(ev) {
      const val = this.choices.find(i => i.value === ev);
      if (val) {
        this.coords.x = val.x;
        this.coords.y = val.y;
      }
    }
  },
  methods: {
    getAsTimeString,
    changeCoords(ev, axis) {
      const { coords, globalConfig } = this;
      const { target } = ev;
      if (target.value === '') {
        coords[axis] = target.value;
        return;
      }
      let value = ~~parseInt(target.value);
      const { WorldMap } = globalConfig.all;
      const maxSize = WorldMap.numSectionGlobalMap;
      value = value >= maxSize ? maxSize : value;
      coords[axis] = value;
      target.value = value;
    },
    checkFirstValue() {
      const { targetSector, choices } = this;
      if (!targetSector._id) return;
      this.coords.x = targetSector.x;
      this.coords.y = targetSector.y;
      const id = choices.find(i => i.value === targetSector._id);
      this.selectedTown = id ? id.value : '-1';
    },
    createChoices() {
      const { sectors } = this.$store.state.userSectors;
      const { currentSector, choices } = this;
      sectors.forEach((sector, index) => {
        if (sector._id === currentSector._id) return;
        const template = {
          value: sector._id,
          label: sector.town.name,
          x: sector.x,
          y: sector.y
        };
        choices.push(template);
      });
    },
    handlerInput(ev, type) {
      const { currentSector } = this;
      const { target } = ev;
      const value = ~~parseInt(target.value);
      const checkValue = this.Caravan.checkAvailable(value, type, currentSector.town);
      this.sendSources[type] = checkValue;
      target.value = checkValue;
    },
    async sendCaravan() {
      const { coords, sendSources, disabledOk, currentSector } = this;
      if (disabledOk) return;
      const message = {
        type: 'sendCaravan',
        data: {
          initSector: currentSector._id,
          targetSector: coords,
          payload: sendSources
        }
      };
      const response = await this.$ws.get(message);
      console.log(response);
      this.$emit('close');
    }
  }
};
</script>

<style lang="scss">
.caravan {
  color: white;
  letter-spacing: 0.1em;
  &__init {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
    &__ico {
      margin-right: 15px;
      width: 15%;
      @include center;
      img {
        max-width: 40px;
        max-height: 40px;
      }
    }
  }
  &__available {
    display: flex;
    justify-content: space-between;
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
  &__target {
    display: flex;
    justify-content: space-between;
    margin-bottom: 100px;
    &__info {
      width: 15%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 15px;
      font-size: 11px;
      &--ico {
        max-height: 50px;
      }
    }
    &__choices {
      display: flex;
      flex-direction: column;
      flex-grow: 2;
      &__coords {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        &__item {
          max-width: 80px;
          font-weight: bold;
          display: flex;
          align-items: center;
          margin: 0 10px;
          input {
            width: 40px;
            padding: 2px 5px;
          }
        }
      }
    }
  }
  &__footer {
    display: flex;
    justify-content: center;
    padding: 20px;
    &--btn {
      margin: 0 20px;
      // width: 50px;
    }
  }
}
</style>
