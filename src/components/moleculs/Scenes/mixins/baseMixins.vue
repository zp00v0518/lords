<script>
import {
  setBorderIsoMap,
  drawHoverLine,
  hideTooltip,
  drawMap,
  getCursorPositionOnScene,
  checkMouseCoordsOnMap,
  getTileCoordsOnMap,
  handlerMousemoveOnMap
} from '../utils';

export default {
  data() {
    return {
      showTooltip: false,
      cursorOnScene: false,
      currentTile: {},
      currentMap: [],
      ctx: null,
      borderIsoMap: {
        left: { x: 0, y: 0 },
        top: { x: 0, y: 0 },
        right: { x: 0, y: 0 },
        bottom: { x: 0, y: 0 }
      },
      mouseCoords: { x: 0, y: 0 }
    };
  },
  methods: {
    setBorderIsoMap,
    drawHoverLine,
    hideTooltip,
    drawMap,
    getCursorPositionOnScene,
    checkMouseCoordsOnMap,
    getTileCoordsOnMap,
    handlerMousemoveOnMap
  }
};
</script>
