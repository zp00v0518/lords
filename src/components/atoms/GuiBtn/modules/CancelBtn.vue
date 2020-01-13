<template>
  <img :src="img" alt="" />
</template>

<script>
import cancelImg from "../../../../../frontEnd/img/buttons/cancel/up.gif";

export default {
  name: "CancelBtn",
  props: {
    disabled: { type: Boolean, default: false }
  },
  data() {
    return {
      img: cancelImg
    };
  }
};
</script>
