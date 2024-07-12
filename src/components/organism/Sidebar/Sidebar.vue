<template>
  <section class="sidebar">
    <div class="sidebar__towns">
      <Town
        v-for="(sector, index) in sectorsState"
        :indexTown="index"
        :key="index"
        :sector="sector"
      ></Town>
    </div>

    <Chat class="sidebar__chat" />
  </section>
</template>

<script>
import Town from '../../moleculs/Town';
import { currentSector } from '../../mixins';
import Chat from '../Chat';

export default {
  name: 'Sidebar',
  mixins: [currentSector],
  components: {
    Town,
    Chat,
  },
  data() {
    return {
      sectorsState: this.$store.state.userSectors.sectors,
    };
  },
  watch: {
    currentSector: function () {
      const { deepClone, $store } = this;
      this.sectorsState = deepClone($store.state.userSectors.sectors);
    },
  },
};
</script>

<style lang="scss">
@import 'sidebar.scss';
</style>
