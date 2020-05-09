function setBorderIsoMap() {
  const currentLength = this.currentMap.length;
  const { borderIsoMap, isoCoords, tileWidth, viewportPath } = this;
  const height = tileWidth / 2;
  const startX = isoCoords.x;
  const startY = isoCoords.y;
  borderIsoMap.top.x = startX;
  borderIsoMap.top.y = startY;
  borderIsoMap.bottom.x = borderIsoMap.top.x;
  borderIsoMap.bottom.y = borderIsoMap.top.y + height * currentLength;
  borderIsoMap.right.x = borderIsoMap.top.x + (tileWidth * currentLength) / 2;
  borderIsoMap.right.y = borderIsoMap.top.y + (height * currentLength) / 2;
  borderIsoMap.left.y = borderIsoMap.right.y;
  borderIsoMap.left.x = borderIsoMap.top.x - (tileWidth * currentLength) / 2;
  viewportPath.moveTo(borderIsoMap.left.x, borderIsoMap.left.y);
  viewportPath.lineTo(borderIsoMap.top.x, borderIsoMap.top.y);
  viewportPath.lineTo(borderIsoMap.right.x, borderIsoMap.right.y);
  viewportPath.lineTo(borderIsoMap.bottom.x, borderIsoMap.bottom.y);
}

export default setBorderIsoMap;
