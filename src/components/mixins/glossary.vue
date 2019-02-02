<script>
export default {
  created() {
    this.gloss = this.$store.state.local.dictionary;
  },
  watch: {
    "$store.state.local.dictionary": function() {
      this.gloss = this.$store.state.local.dictionary;
    }
  },
  data() {
    return {
      gloss: {}
    };
  }
};
</script>
