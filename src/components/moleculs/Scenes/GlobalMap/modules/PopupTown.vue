<template>
  <div class="popup-town" :style="getStyle" @click.stop>
    <button
      class="popup-town__item"
      @click.stop="handlerClick('heroTransferDialog')"
    >{{upperFirstSymbol(gloss.popup.sendHero.btn.txt)}}</button>
    <button
      class="popup-town__item"
      @click.stop="handlerClick('sendCaravan')"
    >{{upperFirstSymbol(gloss.popup.sendСaravan.btn.txt)}}</button>
  </div>
</template>

<script>
export default {
  name: 'PopupTown',
  props: {
    tileWidth: 0,
    tile: null,
    initSector: null
  },
  created() {
    console.log(this.gloss.popup);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closePopup);
    document.removeEventListener('keyup', this.handlerKeyup);
  },
  computed: {
    getStyle() {
      const { tileWidth, tile } = this;
      const left = tile.centerX - tileWidth + 'px';
      const top = tile.centerY - tileWidth - 10 + 'px';
      return { left, top };
    }
  },
  methods: {
    closePopup() {
      this.$emit('close-popup');
    },
    handlerKeyup(event) {
      if (event.key !== 'Escape') return;
      this.closePopup();
    },
    handlerClick(type) {
      const { deepClone, tile, $store, initSector } = this;
      const payload = {
        data: {
          targetTile: deepClone(tile),
          initSector: deepClone(initSector)
        },
        type
      };
      $store.commit('DIALOG_SHOW', payload);
      this.closePopup();
    }
  },
  mounted() {
    setTimeout(() => {
      document.addEventListener('click', this.closePopup);
      document.addEventListener('keyup', this.handlerKeyup);
    }, 0);
  }
};
</script>

<style lang="scss">
.popup-town {
  position: absolute;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  &__item {
    padding: 5px;
    cursor: pointer;
    font-weight: bold;
  }
}
</style>
