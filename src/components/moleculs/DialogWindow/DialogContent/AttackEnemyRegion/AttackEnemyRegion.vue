<template>
  <div class="attackEnemyRegion">
    <template v-if="showRegonMap">
      <RegionMap
        :regionMap="data.targetTile.region"
        mode="dialog"
        :sectorInfo="{raceIndex: -1}"
        :customHoverFunc="customHoverFunc"
        @click="handlerClick"
        :specialTiles="selected"
      />
      <OkCancelBlock @ok="handleOk" @cancel="closeDialogWindow" :disabled="disabled" />
    </template>
    <template v-else>
      <DialogBattle
        :data="dataForDialogBattle"
        self_mode
        @close="closeDialogWindow"
        :disabled="!activeHero"
        @go-battle="handlerGpBattle"
      >
        <div class="attackEnemyRegion__time">
          <div class="text">{{ upperFirstSymbol(gloss.date.time.txt) }}:</div>
          <div class="time">{{timeText}}</div>
        </div>
      </DialogBattle>
    </template>
  </div>
</template>

<script>
import RegionMap from '../../../Scenes/RegionMap/RegionMap';
import OkCancelBlock from '../../../OkCancelBlock';
import { closeMixin } from '../../dialogMixin';
import drawRectAroundCenter from '../../../Scenes/utils/drawRectAroundCenter';
import { deepClone, getAsTimeString } from '../../../../../utils';
import DialogBattle from '../DialogBattle';
import DialogWindow from '../../DialogWindow.vue';
import { currentSector } from '../../../../mixins';

export default {
  name: 'AttackEnemyRegion',
  mixins: [closeMixin, currentSector],
  components: { RegionMap, OkCancelBlock, DialogBattle, DialogWindow },
  props: {
    data: { type: Object, required: true }
  },
  data() {
    return {
      disabled: true,
      selected: [],
      isChoice: false,
      showRegonMap: true,
      dataForDialogBattle: {}
    };
  },
  computed: {
    activeHero() {
      const { activeHeroId, heroesList } = this.$store.state.heroes;
      return heroesList.find(i => i._id === activeHeroId);
    },
    timeText() {
      const { data, currentSector, activeHero } = this;
      if (!activeHero) return '';
      const { WorldMap } = this.globalConfig.all;
      const { targetTile } = data;
      const time = WorldMap.getTimeMoveOnMap(currentSector, targetTile, { hero: activeHero });
      return this.getAsTimeString(time);
    }
  },
  methods: {
    getAsTimeString,
    handlerGpBattle(event) {
      const { currentSector, activeHero, data, globalConfig } = this;
      const { Event } = globalConfig.all;
      const { id } = this.selected[0];
      const { army } = event;
      const message = {
        type: data.typeMessage || Event.types.attackEnemyRegion,
        data: {
          startSectorId: currentSector._id,
          attackHeroId: activeHero._id,
          tileId: this.data.targetTile._id,
          targetId: id,
          army
        }
      };
      this.$ws.sendMessage(message);
      this.closeDialogWindow();
      this.$store.commit('SET_ACTIVE_HERO_ID', -1);
    },
    customHoverFunc(ctx, map, tileWidth, tile) {
      const isCtx = ctx instanceof CanvasRenderingContext2D;
      ctx.canvas.style.cursor = 'pointer';
      if (!isCtx) {
        console.log('ctx arguments is not CanvasRenderingContext2D');
        return;
      }
      if (!tile && !this.isChoice) return;
      const styles = {
        strokeStyle: 'red',
        lineWidth: 3
      };
      this.selected = this.isChoice ? this.selected : this.getSectorsForDraw({ x: tile.x, y: tile.y }, map);
      this.selected.forEach(tileItem => {
        tileItem.drawOps.strokeStyle = styles.strokeStyle;
        tileItem.drawOps.lineWidth = styles.lineWidth;
        drawRectAroundCenter(ctx, tileItem, tileWidth / 2);
      });
    },
    handleOk(e) {
      this.showRegonMap = false;
      this.$store.commit('CHANGE_DIALOG_TITLE', 'asdasd');
    },
    handlerClick(event) {
      this.isChoice = !this.isChoice;
      if (!this.isChoice) {
        this.disabled = true;
        this.selected = [];
      }
      if (this.isChoice) {
        this.disabled = false;
      }
    },
    getSectorsForDraw(start, map) {
      const result = [];
      const startX = start.x;
      const startY = start.y;
      result.push(deepClone(map[startX][startY]));
      const top = map[startX][startY - 1];
      const tileTypes = this.globalConfig.all.WorldMap.types;
      if (top && top.type !== tileTypes.town.id) result.push(deepClone(top));
      const right = map[startX + 1] ? map[startX + 1][startY] : undefined;
      if (right && right.type !== tileTypes.town.id) result.push(deepClone(right));
      const bottom = map[startX][startY + 1];
      if (bottom && bottom.type !== tileTypes.town.id) result.push(deepClone(bottom));
      const left = map[startX - 1] ? map[startX - 1][startY] : undefined;
      if (left && left.type !== tileTypes.town.id) result.push(deepClone(left));
      return result;
    }
  }
};
</script>

<style lang="scss">
.attackEnemyRegion {
  height: 100%;
  display: flex;
  flex-direction: column;
  .regionmap {
    height: 70%;
    flex-grow: 2;
  }
  &__time {
    padding: 0px 0px 16px 0px;
    display: flex;
    justify-content: center;
    .text {
      margin-right: 12px;
      font-weight: bold;
    }
  }
}
</style>
