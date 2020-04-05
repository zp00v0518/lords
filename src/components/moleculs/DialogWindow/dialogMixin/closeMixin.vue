<script>
export default {
  created() {
    document.addEventListener('keyup', this.handlerKeyup);
  },
  methods: {
    handlerKeyup(event) {
      if (event.key !== 'Escape') return;
      this.closeDialogWindow();
    },
    closeDialogWindow() {
      this.$store.commit('DIALOG_CLOSE');
    }
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.handlerKeyup);
  }
};
</script>
