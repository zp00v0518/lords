function setBorderIsoMap() {
  const currentLength = this.currentMap.length;
  const height = this.tileWidth / 2;
  this.borderIsoMap.left.x = this.isoCoords.x;
  this.borderIsoMap.left.y = this.isoCoords.y;
  this.borderIsoMap.top.x =
    this.borderIsoMap.left.x + (this.tileWidth * currentLength) / 2;
  this.borderIsoMap.top.y =
    this.borderIsoMap.left.y - (height * currentLength) / 2;
  this.borderIsoMap.right.x =
    this.borderIsoMap.left.x + this.tileWidth * currentLength;
  this.borderIsoMap.right.y = this.borderIsoMap.left.y;
  this.borderIsoMap.bottom.x = this.borderIsoMap.top.x;
  this.borderIsoMap.bottom.y =
    this.borderIsoMap.left.y + (height * currentLength) / 2;
}

export default setBorderIsoMap;
