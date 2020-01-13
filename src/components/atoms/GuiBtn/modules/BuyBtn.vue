<template>
  <img :src="img" alt="" />
</template>

<script>
import disabledImg from "../../../../../frontEnd/img/buttons/buy/disabled.gif";
import buyImg from "../../../../../frontEnd/img/buttons/buy/up.gif";

export default {
  name: "ByuBtn",
  props: {
    disabled: { type: Boolean, default: false }
  },
  computed: {
    img() {
      return this.disabled ? disabledImg : buyImg;
    }
  }
};
</script>
