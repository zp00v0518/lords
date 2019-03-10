<template>
  <div class="event__tooltip">
    123
  </div>
</template>

<script>
export default {
  name: "EventTooltip",
  components: {},
  props: ['dataEvent'],
  data() {
    return {};
  },
  created() {
    console.log(this.dataEvent)
  },
  computed: {},
  methods: {},
  mounted() {}
};
</script>

<style lang='scss' scoped>
.event__tooltip{
  position: absolute;
  width: 50px;
  height: 50px;
  border: 1px solid red;
  left: 200%;
  top:0;
  z-index: 11;
}
</style>
