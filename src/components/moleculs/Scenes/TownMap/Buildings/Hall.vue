<template>
  <section class="hall__wrap">
    <div class="hall__row" v-for="(row, rowIndex) in rowsIndex" :key="rowIndex">
      <div v-for="item in row" :key="item" class="hall__row__item">
        <canvas :ref="'canvas'+item" class="hall__row__item-icon"></canvas>
        <div class="hall__row__item-footer"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Hall",
  data() {
    return {
      rowsIndex: [],
      TI: {}
    };
  },
  created() {
    const z = this.$store.state.globalConfig.listBuildings;
    console.log(z)
    this.rowsIndex = [[z.hall.name, z.fort.name, z.tavern.name]];
  },
  methods: {},
  mounted() {
    console.log(this.$refs);
  }
};
</script>

<style lang='scss' scoped>
.hall {
  &__wrap {
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 10;
  }
  &__row {
    display: flex;
    justify-content: center;
    height: 25%;
    padding: 1% 0;
    &__item {
      margin: 0 3%;
      width: 20%;
      min-width: 17%;
      border: 1px solid white;
      display: flex;
      flex-direction: column;
      &-icon {
        height: 80%;
        border: 1px solid green;
        background-image: url("../../../../../../frontEnd/img/towns/rampart/ramparttiles.jpg");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position-x: 0px;
        background-position-y: 0px;
      }
      &-footer {
        height: 20%;
        min-height: 30px;
      }
    }
  }
}
</style>
