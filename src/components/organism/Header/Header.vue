<template>
  <header class="header">
    <div class="header__update_region">
      <input type="number" v-model="armySize" />
      <button @click="updateArmyOnRegion">Обновить регион</button>
    </div>
  </header>
</template>

<script>
import { currentSector } from '../../mixins';

export default {
  name: 'Header',
  mixins: [currentSector],
  data() {
    return {
      armySize: 2500
    };
  },
  methods: {
    updateArmyOnRegion() {
      const num = parseFloat(this.armySize);
      if (Number.isNaN(num)) return;
      const sectorIndex = this.$store.state.userSectors.sectors.findIndex(i => i._id === this.currentSector._id);
      const message = {
        type: 'updateArmyOnRegion',
        data: {
          sectorIndex,
          armySize: this.armySize
        }
      };
      this.$ws.sendMessage(message);
    }
  }
};
</script>

<style lang='scss' scoped>
@import 'header.scss';
</style>
