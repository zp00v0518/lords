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
      if (event.type === 'mouseover') return this.overImg || this.upImg;
      if (event.type === 'mouseleave') return this.upImg || this.upImg;
      if (event.type === 'mousedown') return this.downImg || this.upImg;
      return this.upImg;
    }
  }
};
</script>
