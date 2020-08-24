<template>
  <div class="popup-town" :style="getStyle" @click.stop>
    <template v-if="isSelf">
      <button
        class="popup-town__item"
        @click.stop="handlerClick('heroTransferDialog')"
      >{{upperFirstSymbol(gloss.popup.sendHero.btn.txt)}}</button>
      <button
        class="popup-town__item"
        @click.stop="handlerClick('sendCaravan')"
        :disabled="disabledMarket"
      >{{upperFirstSymbol(gloss.popup.sendСaravan.btn.txt)}}</button>
      <TownBuilding
        v-if="showMarket"
        :targetSector="targetSector"
        :name="'market'"
        @close="showMarket= false"
      />
    </template>
    <template v-else>
      <div>
        <button
          class="popup-town__item"
          @click.stop="handlerClick('attackEnemyRegion')"
        >{{upperFirstSymbol(gloss.popup.attackEnemyRegion.btn.txt)}}</button>
      </div>
    </template>
  </div>
</template>

<script>
import TownBuilding from '../../TownMap/Building';
import { currentSector } from '../../../../mixins';

export default {
  name: 'PopupTown',
  mixins: [currentSector],
  components: { TownBuilding },
  props: {
    tileWidth: 0,
    targetSector: null,
    isSelf: { type: Boolean, default: true }
  },
  data() {
    return {
      showMarket: false
    };
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closePopup);
    document.removeEventListener('keyup', this.handlerKeyup);
  },
  computed: {
    getStyle() {
      const { tileWidth, targetSector } = this;
      const left = targetSector.centerX - tileWidth + 'px';
      const top = targetSector.centerY - tileWidth - 10 + 'px';
      return { left, top };
    },
    disabledMarket() {
      const { town } = this.currentSector;
      return !town.market || !town.market.work.is;
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
      const { deepClone, targetSector, $store, currentSector } = this;
      if (type === 'sendCaravan') {
        this.showMarket = true;
        return;
      }
      // if (type === 'attackEnemyRegion') {

      // }
      const payload = {
        data: {
          targetTile: deepClone(targetSector),
          initSector: deepClone(currentSector)
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
