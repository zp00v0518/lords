<template>
  <header class="header">
    <div class="header__update_region" v-if="NODE_ENV === 'development'">
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
      armySize: 2500,
      NODE_ENV: ''
    };
  },
  created() {
    this.NODE_ENV = process.env.NODE_ENV;
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
          armySize: num
        }
      };
      this.$ws.sendMessage(message);
    }
  }
};
</script>

<style lang='scss'>
.header {
  width: 100%;
  height: 10%;
  min-height: 50px;
  border-bottom: 1px solid black;
  display: flex;
  // justify-content: flex-end;
  &__update_region {
    max-width: 200px;
    display: flex;
    height: 30px;
    & > input {
      width: 45%;
    }
    & > button {
      cursor: pointer;
      font-size: 12px;
    }
  }
}
</style>
