<script>
import { deepClone } from "../../utils";
export default {
  computed: {
    globalConfig() {
      return this.$store.state.globalConfig;
    },
    gameSources() {
      return this.$store.state.gameSources;
    }
    // currentSector() {
    //   const {userSectors} = this.$store.state;
    //   const index = userSectors.currentSector;
    //   const sectors = userSectors.sectors;
    //   return sectors[index];
    // }
  },
  methods: {
    deepClone
  }
};
</script>
