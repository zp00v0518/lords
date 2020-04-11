<template>
  <div class="worldmap-region">
    <div class="worldmap-region__title">
      <div class="worldmap-region__title--txt">Построить город?</div>
      <Icon class="dialog__close" name="circle-close" @click.native="closeDialogWindow"></Icon>
    </div>
    <div class="worldmap-region__body" ref="body">
      <RegionMap :regionMap="data.targetTile.region" mode="dialog"></RegionMap>
    </div>
    <div class="worldmap-region__footer">
      <div class="worldmap-region__footer__price">
        <div class="worldmap-region__footer__price--item">
          <div
            class="worldmap-region__footer__price__resource"
            v-for="(value, name) in sources"
            :key="name"
          >
            <div class="worldmap-region__footer__price__resource--icon">
              <img :src="'img/resources/'+name+'.gif'" />
            </div>
            <div class="worldmap-region__footer__price__resource--sum">{{value}}</div>
          </div>
        </div>
        <div class="worldmap-region__footer__price--item">
          <div class="worldmap-region__footer__price__resource">
            <div class="text">Выберите героя</div>
          </div>
        </div>
      </div>

      <div class="worldmap-region__footer__gui">
        <GuiBtn type="ok" class="worldmap-region__footer__gui--btn" :disabled="!activeHero" />
        <GuiBtn type="cancel" class="worldmap-region__footer__gui--btn" @click="closeDialogWindow"/>
      </div>
    </div>
  </div>
</template>

<script>
import { closeMixin } from '../../dialogMixin';
import RegionMap from '../../../Scenes/RegionMap/RegionMap';

export default {
  name: 'WorldMapRegion',
  components: { RegionMap },
  mixins: [closeMixin],
  props: {
    data: { type: Object, required: true }
  },
  data() {
    return {
      sources: {}
    };
  },

  created() {
    this.sources = this.getSourceForBuilding();
  },
  computed: {
    activeHero() {
      const { activeHeroId, heroesList } = this.$store.state.heroes;
      return heroesList.find(i => i._id === activeHeroId);
    }
  },
  methods: {
    getSourceForBuilding() {
      const { Town } = this.globalConfig.all;
      return Town.getSourceForNewTown();
    }
  }
};
</script>

<style lang="scss">
.worldmap-region {
  height: 100%;
  display: flex;
  flex-direction: column;
  &__title {
    display: flex;
    justify-content: flex-end;
    &--txt {
      flex-grow: 2;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      padding: 10px;
    }
  }
  &__body {
    height: 60%;
    flex-grow: 2;
  }
  &__tooltip {
    position: absolute;
  }
  &__footer {
    display: flex;
    flex-direction: column;
    height: 30%;
    min-height: 100px;
    padding: 10px;
    &__price {
      margin-bottom: 10px;
      display: flex;
      &--item {
        width: 45%;
        margin: 10px;
        @include center;
      }
      &__resource {
        display: flex;
        flex-direction: column;
        margin: 10px;
      }
    }
    &__gui {
      display: flex;
      justify-content: center;
      &--btn {
        margin: 15px 20px;
      }
    }
  }
}
</style>
