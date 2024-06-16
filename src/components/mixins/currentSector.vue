<script>
import { deepClone } from "../../utils";
export default {
  computed: {
    currentSector() {
      const { userSectors } = this.$store.state;
      const index = userSectors.currentSector;
      const sectors = userSectors.sectors;
      return deepClone(sectors[index]);
    }
  }
};
</script>
