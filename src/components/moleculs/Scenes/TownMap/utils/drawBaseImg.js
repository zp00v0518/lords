const base_img = {
  rampart: [{ coords: { x: 10, y: 20 }, name: 'raid', zIndex: 0 }]
};

function drawBaseImg(ctx, sources, raceName) {
  const arr = base_img[raceName];
  arr.forEach(item => {
    const img = sources[item.name];
    const coords = item.coords;
    ctx.drawImage(img, coords.x, coords.y);
  });
}

export default drawBaseImg;
