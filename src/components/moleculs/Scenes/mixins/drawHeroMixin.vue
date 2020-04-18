<script>

export default {
  computed: {
    settings() {
      return this.$store.state.settings;
    }
  },
  methods: {
    getTileByCoords(curMap, x, y) {
      let result = null;
      curMap.find(row => {
        const elem = row.find(item => {
          return item.x === x && item.y === y;
        });
        result = elem;
        return !!elem;
      });
      return result;
    },
    getLengthHeroOnStraight(length, startTime, endTime) {
      const fullTime = endTime - startTime;
      const passTime = Date.now() - startTime;
      const dif = passTime / fullTime;
      return length * dif;
    },
    drawHeroOnMap(ctx, coords) {
      const heightFlag = 20;
      ctx.beginPath();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.moveTo(coords.x, coords.y);
      ctx.lineTo(coords.x, coords.y - heightFlag);
      ctx.lineTo(coords.x + heightFlag / 2, coords.y - heightFlag + heightFlag / 4);
      ctx.lineTo(coords.x, coords.y - heightFlag / 2);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    }
  }
};
</script>
