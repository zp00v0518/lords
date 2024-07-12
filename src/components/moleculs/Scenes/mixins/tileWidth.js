export default {
  data() {
    return {
      sceneWidth: this.widthScene,
      sceneHeight: this.heightScene,
    };
  },
  computed: {
    isHeightTaller() {
      const height = parseInt(this.sceneHeight);
      const width = parseInt(this.sceneWidth);
      return height * this.marginScale * 2 <= width; // 2 - це різниця у висоті та ширині tile на  ізометричній мапі
    },
    marginScale() {
      return 1 - (this.settingsCanvas.map.marginTop + this.settingsCanvas.map.marginBottom) / 100;
    },
    tileHeight() {
      return this.tileWidth / 2;
    },
    tileWidth() {
      const { ctx, currentMap, marginScale } = this;
      if (!ctx) return 0;
      const height = parseInt(this.sceneHeight);
      const width = parseInt(this.sceneWidth);
      let basicValue = this.isHeightTaller ? height * marginScale : width / 2;
      const widthParse = parseInt(basicValue);
      const intermediate = currentMap.length === 0 ? 0 : widthParse / (currentMap.length / 2);
      return intermediate;
    },
    settingsCanvas() {
      return this.$store.state.settings.canvas;
    },
    isoCoords() {
      const x = parseInt(this.sceneWidth) / 2;
      const height = parseInt(this.sceneHeight);
      const tileHeight = this.tileWidth / 2;
      const mapHeight = this.currentMap.length * tileHeight;
      const marginTopInPx = (height / 100) * this.settingsCanvas.map.marginTop;
      const y = !this.isHeightTaller ? height / 2 - mapHeight / 2 - marginTopInPx : marginTopInPx;
      return { x, y };
    },
  },
};
