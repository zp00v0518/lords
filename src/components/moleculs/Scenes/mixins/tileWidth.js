export default {
  data() {
    return {
      sceneWidth: this.widthScene,
      sceneHeight: this.heightScene,
    };
  },
  computed: {
    tileWidth() {
      const { ctx, currentMap, settingsCanvas } = this;
      if (!ctx) return 0;
      const marginScale =
        1 - (settingsCanvas.map.marginTop + settingsCanvas.map.marginBottom) / 100;
      const height = parseInt(this.sceneHeight);
      const width = parseInt(this.widthScene);
      let basicValue = height * 2 <= width ? height * marginScale : width / 2;
      //   console.log(
      //     `height: ${height}   width:${width}  basicValue:${basicValue} aspectRatio:${aspectRatio}`,
      //   );
      const widthParse = parseInt(basicValue);
      const intermediate = currentMap.length === 0 ? 0 : widthParse / (currentMap.length / 2);
      return intermediate;
    },
    settingsCanvas() {
      return this.$store.state.settings.canvas;
    },
    isoCoords() {
      const x = parseInt(this.sceneWidth) / 2;
      const y = (parseInt(this.sceneHeight) / 100) * this.settingsCanvas.map.marginTop;
      return { x, y };
    },
  },
};
