<script>
export default {
  props: {
    disabled: { type: Boolean, default: false }
  },
  data() {
    return {
      img: this.getImg()
    };
  },
  created() {
    this.img = this.getImg();
  },
  computed: {
    computedImg() {
      return this.img;
    }
  },
  watch: {
    disabled: function() {
      this.img = this.getImg();
    }
  },
  methods: {
    getImg(event) {
      if (this.disabled) return this.disabledImg;
      if (event === undefined) return this.upImg;
      if (event.type === "mouseover") return this.overImg;
      if (event.type === "mouseleave") return this.upImg;
    }
  }
};
</script>
