<template>
  <img
    :src="img"
    alt=""
    @mouseover="img = getImg($event)"
    @mouseleave="img = getImg($event)"
  />
</template>

<script>
import disabledImg from "../../../../../frontEnd/img/buttons/up/16/disabled.gif";
import upImg from "../../../../../frontEnd/img/buttons/up/16/up.gif";
import overImg from "../../../../../frontEnd/img/buttons/up/16/over.gif";

export default {
  name: "UpBtn",
  props: {
    disabled: { type: Boolean, default: false }
  },
  data() {
    return {
      img: this.getImg()
    };
  },
  watch: {
    disabled: function() {
      this.img = this.getImg();
    }
  },
  methods: {
    getImg(event) {
      if (this.disabled) return disabledImg;
      if (event === undefined) return upImg;
      if (event.type === "mouseover") return overImg;
      if (event.type === "mouseleave") return upImg;
    }
  }
};
</script>
