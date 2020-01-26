<script>
export default {
  computed: {
    currentSector() {
      const { userSectors } = this.$store.state;
      const index = userSectors.currentSector;
      const sectors = userSectors.sectors;
      return sectors[index];
    }
  }
};
</script>
