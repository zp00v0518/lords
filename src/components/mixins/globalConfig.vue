<script>
export default {
  computed: {
    globalConfig() {
      return this.$store.state.globalConfig;
    },
    gameSources() {
      return this.$store.state.gameSources;
    }
  }
};
</script>
