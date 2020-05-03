<template>
  <div class="market">
    <div class="market__tabs">
      <div class="market__tabs__item">Caravan</div>
    </div>
    <div class="market__content">
      <Caravan></Caravan>
    </div>
  </div>
</template>

<script>
import { currentSector } from '../../../../../mixins';
import modules from './modules';

export default {
  name: 'Market',
  mixins: [currentSector],
  components: { ...modules }
};
</script>

<style lang="scss">
.market {
  width: 90%;
  height: 90%;
  align-self: center;
  margin-top: 10px;
  background-image: url('../../../../../../../frontEnd/img/main/background/panelbg.jpg');
  &__tabs {
    width: 100%;
    height: 20px;
    display: flex;
    border-bottom: 1px solid;
    align-items: center;
    margin-bottom: 15px;
    &__item {
      text-align: center;
      flex-grow: 2;
    }
  }
  &__content {
    padding: 10px;
  }
}
</style>
