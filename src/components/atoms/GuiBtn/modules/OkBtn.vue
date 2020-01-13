<template>
  <img :src="img" alt="" />
</template>

<script>
import okImg from "../../../../../frontEnd/img/buttons/ok/up.gif";

export default {
  name: "OkBtn",
  props: {
    disabled: { type: Boolean, default: false }
  },
  data() {
    return {
      img: okImg
    };
  }
};
</script>
