<template>
  <img
    :src="computedImg"
    alt=""
    @mouseover="img = getImg($event)"
    @mouseleave="img = getImg($event)"
  />
</template>

<script>
import disabledImg from "../../../../../frontEnd/img/buttons/buy/disabled.gif";
import upImg from "../../../../../frontEnd/img/buttons/buy/up.gif";
import overImg from "../../../../../frontEnd/img/buttons/buy/over.gif";
import mixin from "./mixin";

export default {
  name: "ByuBtn",
  mixins: [mixin],
  data() {
    return {
      upImg,
      disabledImg,
      overImg
    };
  }
};
</script>
