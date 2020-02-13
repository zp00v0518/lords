<script>
export default {
  data() {
    return {
      timerId: null,
      dataTransfer: {}
    };
  },
  methods: {
    handlerDragStart(event, dataTransfer) {
      this.dataTransfer = dataTransfer;
      const drag_item = event.target.closest("[drag-item]");
      this.dataTransfer.drag_item = drag_item;
      this.setOffsetCoords(event, drag_item);
      const drag_container = drag_item.closest("[drag-container]");
      this.dataTransfer.drag_container = drag_container;
      this.dataTransfer.containerStyle = drag_container.getBoundingClientRect();
      const drag_item_clone = drag_item.cloneNode("deep");
      this.dataTransfer.drag_item_clone = drag_item_clone;
      this.setStartStyles(drag_item_clone, drag_item);
      this.setPositionElem(drag_item_clone, event);
      document.body.appendChild(drag_item_clone);
      document.addEventListener("mousemove", this.handlerMouseMove);
      document.addEventListener("mouseup", this.stopDrag);
      drag_item_clone.addEventListener("dragstart", e => {
        e.preventDefault();
      });
    },
    setOffsetCoords(event, dragitem) {
      const { clientX, clientY } = event;
      const style = dragitem.getBoundingClientRect();
      this.dataTransfer.offsetX = clientX - style.left;
      this.dataTransfer.offsetY = clientY - style.top;
    },
    handlerMouseMove(event) {
      const { dataTransfer } = this;
      this.setPositionElem(dataTransfer.drag_item_clone, event);
      if (!this.checkDragInContainer(event)) {
        this.stopDrag();
        return;
      }
      this.moveDragElement();
    },
    setStartStyles(cloneElem, baseElem) {
      const baseStyles = getComputedStyle(baseElem);
      cloneElem.style.width = baseStyles.width;
      cloneElem.style.cursor = "grabbing";
      cloneElem.style.opacity = "0.7";
      cloneElem.style.backgroundColor = "white";
      cloneElem.style.position = "fixed";
      cloneElem.style.transitionDuration = "unset";
      cloneElem.style.zIndex = 9999;
    },
    moveDragElement() {
      const { dataTransfer } = this;
      const { way, drag_item, drag_item_clone, drag_container } = dataTransfer;
      const styles = drag_item_clone.getBoundingClientRect();
      if (way === "down") {
        const nextElem = drag_item.nextElementSibling;
        if (nextElem) {
          const topNext = nextElem.getBoundingClientRect().top;
          if (topNext + styles.height / 2 < styles.bottom) {
            drag_container.insertBefore(drag_item, nextElem.nextElementSibling);
          }
        }
      }
      if (way === "up") {
        const nextElem = drag_item.previousElementSibling;
        if (nextElem) {
          const bottomNext = nextElem.getBoundingClientRect().bottom;
          if (bottomNext - styles.height / 2 > styles.top) {
            drag_container.insertBefore(drag_item, nextElem);
          }
        }
      }
    },
    checkDragInContainer(mouseEvent) {
      const { clientX, clientY } = mouseEvent;
      const css = this.dataTransfer.containerStyle;
      if (clientX < css.left || clientX > css.left + css.width) return false;
      if (clientY < css.top || clientY > css.top + css.height) return false;
      return true;
    },
    setPositionElem(elem, mouseEvent) {
      const { clientX, clientY } = mouseEvent;
      const { dataTransfer } = this;
      elem.style.top = clientY - dataTransfer.offsetY + "px";
      elem.style.left = clientX - dataTransfer.offsetX + "px";
      this.setWay(mouseEvent);
    },
    setWay(mouseEvent) {
      const { clientY } = mouseEvent;
      const { dataTransfer } = this;
      const { prevY, way } = dataTransfer;
      if (way === undefined) {
        dataTransfer.prevY = clientY;
        dataTransfer.way = "";
        return;
      }
      if (prevY < clientY) {
        dataTransfer.way = "down";
        dataTransfer.prevY = clientY;
      }
      if (prevY > clientY) {
        dataTransfer.way = "up";
        dataTransfer.prevY = clientY;
      }
    },
    stopDrag() {
      document.removeEventListener("mousemove", this.handlerMouseMove);
      document.removeEventListener("mouseup", this.stopDrag);
      const {
        drag_item_clone,
        drag_item,
        drag_container,
        itemIndex,
        allValue
      } = this.dataTransfer;
      document.body.removeChild(drag_item_clone);
      const newIndex = Array.from(drag_container.children).indexOf(drag_item);
      const arr = JSON.parse(JSON.stringify(allValue));
      arr.length = drag_container.children.length;
      Array.from(drag_container.children).forEach((i, index) => {
        const item = arr[index];
        if (!item) {
          arr[index] = "";
        }
      });
      const removeItem = arr.splice(itemIndex, 1);
      arr.splice(newIndex, 0, removeItem[0]);
      this.$emit("drag-finish", { result: arr.filter(i => i) });
    },
    handlerMouseDown(event, { itemIndex, allValue }, callback) {
      if (this.timerId) {
        this.timerId = clearTimeout(this.timerId);
      }
      this.timerId = setTimeout(() => {
        // eslint-disable-next-line
        callback(...arguments);
      }, 100);
    },
    handlerMouseUp() {
      clearTimeout(this.timerId);
    }
  }
};
</script>
