<script>
export default {
  computed: {
    globalConfig() {
      return this.$store.state.globalConfig;
    },
    gameSources() {
      return this.$store.state.gameSources;
    },
    // currentSector() {
    //   return this.$store.state.userSectors.currentSector;
    // }
     userSectors() {
      return this.$store.state.userSectors;
    },
    currentSector() {
      const index = this.$store.state.userSectors.currentSector;
      // const id = this.$store.state.userSectors.currentSector;
      // const index = this.userSectors.sectors.findIndex(i => i._id === id)
      // console.log(index)
      return this.userSectors.sectors[index];
    }
  },
};
</script>
