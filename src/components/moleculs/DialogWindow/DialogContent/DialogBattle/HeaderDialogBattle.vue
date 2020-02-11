<template>
  <div class="dialog-battle__header">
    <div class="dialog-battle__header__item dialog-battle__header__item--attack">
      <div class="dialog-battle__header__item__info">
        <div class="dialog-battle__header__item__info--name">{{ attacker.name || "" }}</div>
      </div>
      <div class="dialog-battle__header__item__ava">
        <img :src="attacker.avatar" alt />
      </div>
    </div>

    <div class="dialog-battle__header__item dialog-battle__header__item--defense">
      <div>
        <div class="dialog-battle__header__item__info">
          <div class="dialog-battle__header__item__info--name">{{ defender.name || "" }}</div>
        </div>
      </div>
      <div class="dialog-battle__header__item__ava">
        <img :src="defender.avatar" alt />
      </div>
    </div>
  </div>
</template>

<script>
// не доделал этот компонент
import { deepClone } from "../../../../../utils";

export default {
  name: "HeaderDialogBattle",
  props: {
    defInfo: { type: Object, default: () => ({}) },
    atackInfo: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      defender: deepClone(this.defInfo),
      attacker: deepClone(this.atackInfo)
    };
  },
  watch: {
    defInfo: {
      deep: true,
      handler(e) {
        this.defender = deepClone(e);
      }
    },
    atackInfo: {
      deep: true,
      handler(e) {
        this.attacker = deepClone(e);
      }
    }
  }
};
</script>

<style lang="scss">
.dialog-battle__header {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 5px;
  &__item {
    display: flex;
    margin: 0 10px;
    flex-basis: 50%;
    &__ava {
      width: 50px;
      height: 50px;
      & > img {
        width: 100%;
        height: 100%;
      }
    }
    &__info {
      padding: 0 10px;
      &--name {
        text-transform: capitalize;
      }
    }
    &--attack {
      justify-content: flex-end;
    }
    &--defense {
      justify-content: flex-end;
      flex-direction: row-reverse;
    }
  }
}
</style>
