<template>
  <section class="building__wrap" :style="styles">
    <div class="building__header">
      <div class="building__header-title">{{ name }}</div>
      <Icon class="building__header-close" name="circle-close" @click.native="closeBuilding"></Icon>
    </div>
    <component
      :is="name"
      :townRaceName="townRaceName"
      :currentSector="curTown"
      :buildingData="buildingData"
      @close="closeBuilding"
    ></component>
  </section>
</template>

<script>
import Buildings from './Buildings';

export default {
  name: 'Building',
  props: {
    name: String,
    townRaceName: { type: String, default: '' },
    currentSector: null,
    buildingData: { type: Object, default: () => ({}) }
  },
  components: {
    ...Buildings
  },
  data() {
    return {
      curTown: this.currentSector
    };
  },
  created() {
    document.addEventListener('keyup', this.handlerKeyup);
  },
  computed: {
    gloss() {
      return this.$store.state.local.dictionary.town.race[this.townRaceName];
    },
    styles() {
      const scenes = document.querySelector('#scenes');
      const st = scenes.getBoundingClientRect();
      return {
        top: st.top + 'px',
        left: st.left + 'px',
        width: st.width + 'px',
        height: st.height + 'px'
      };
    }
  },
  watch: {
    currentSector: {
      deep: true,
      handler(e) {
        this.curTown = e;
      }
    }
  },
  methods: {
    closeBuilding() {
      this.$emit('close');
    },
    handlerKeyup(event) {
      if (event.key !== 'Escape') return;
      this.closeBuilding();
    }
  },
  beforeDestroy() {
    document.removeEventListener('ketup', this.handlerKeyup);
  }
};
</script>

<style lang="scss">
.building {
  &__wrap {
    display: flex;
    flex-direction: column;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 100;
  }
  &__header {
    display: flex;
    justify-content: flex-end;
    &-title {
      color: white;
      flex-grow: 10;
      @include center;
      text-transform: capitalize;
    }
    &-close {
      width: 20px;
      color: $main-red;
      font-size: 18px;
      cursor: pointer;
    }
  }
}
</style>
