<template>
  <div class="goto">
    <div class="goto__title">Перейти к</div>
    <div class="goto__content">
      <div class="goto__content__item">
        <label>
          X:
          <input type="text" :value="x" @input="changeCoords($event, 'x')" />
        </label>
      </div>
      <div class="goto__content__item">
        <label>
          Y:
          <input type="text" :value="y" @input="changeCoords($event, 'y')" />
        </label>
      </div>
    </div>
    <button class="goto__btn" @click="goToCoords">Go</button>
  </div>
</template>

<script>
export default {
  name: 'GoTo',
  data() {
    return {
      x: 0,
      y: 0
    };
  },
  methods: {
    changeCoords(ev, axis) {
      const { globalConfig } = this;
      const { target } = ev;
      if (target.value === '') {
        this[axis] = target.value;
        return;
      }
      let value = ~~parseInt(target.value);
      const { WorldMap } = globalConfig.all;
      const maxSize = WorldMap.numSectionGlobalMap;
      value = value >= maxSize ? maxSize : value;
      this[axis] = value;
      target.value = value;
    },
    async goToCoords() {
      const { x, y, globalConfig } = this;
      const Ev = globalConfig.all.Event;
      const message = {
        type: Ev.types.goToCoords,
        data: { x, y }
      };
      const response = await this.$ws.get(message);
      this.$store.commit('SET_CURRENTMAP', response);
    }
  }
};
</script>

<style lang="scss">
.goto {
  position: absolute;
  right: 10px;
  bottom: 0;
  transform: translateY(91%);
  display: flex;
  flex-direction: column;
  &__title {
    text-align: center;
  }
  &__content {
    display: flex;
    justify-content: space-around;
    &__item {
      display: flex;
      margin: 0 4px;
      input {
        max-width: 35px;
        height: 12px;
        font-size: 11px;
      }
    }
  }
  &__btn {
    cursor: pointer;
    max-width: 50%;
    align-self: center;
    padding: 2px 10px;
    font-weight: bold;
  }
}
</style>
