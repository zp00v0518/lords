list_img_for_canvas.forEach(item => {
  sourceLoader.load("img", item);
})
// sourceLoader.load("img", "img/towns/rampart/rampart.jpg");
// sourceLoader.load("img", "img/towns/rampart/raid.gif");
// sourceLoader.load("img", "img/towns/rampart/rcen1a.gif");
// sourceLoader.load("img", "img/towns/rampart/rcen2a.gif");
// sourceLoader.load("img", "img/towns/rampart/rdr1aa.gif");
// sourceLoader.load("img", "img/towns/rampart/rdr2aa.gif");
// sourceLoader.load("img", "img/towns/rampart/rdwf1.gif");
// sourceLoader.load("img", "img/towns/rampart/rdwf1h.gif");
// sourceLoader.load("img", "img/towns/rampart/rdwf2.gif");
// sourceLoader.load("img", "img/towns/rampart/rdwf2h.gif");
// sourceLoader.load("img", "img/towns/rampart/rdwft.gif");
// sourceLoader.load("img", "img/towns/rampart/relf1.gif");
// sourceLoader.load("img", "img/towns/rampart/relf2.gif");
// sourceLoader.load("img", "img/towns/rampart/rfort1.gif");
// sourceLoader.load("img", "img/towns/rampart/rfort2.gif");
// sourceLoader.load("img", "img/towns/rampart/rfort3.gif");
// sourceLoader.load("img", "img/towns/rampart/rgar1a.gif");
// sourceLoader.load("img", "img/towns/rampart/rgar2a.gif");
// sourceLoader.load("img", "img/towns/rampart/rhal1.gif");
// sourceLoader.load("img", "img/towns/rampart/rhal2.gif");
// sourceLoader.load("img", "img/towns/rampart/rhal3.gif");
// sourceLoader.load("img", "img/towns/rampart/rhal4.gif");
// sourceLoader.load("img", "img/towns/rampart/rholy.gif");
// sourceLoader.load("img", "img/towns/rampart/rhou1.gif");
// sourceLoader.load("img", "img/towns/rampart/rhou2.gif");
// sourceLoader.load("img", "img/towns/rampart/rhou3.gif");
// sourceLoader.load("img", "img/towns/rampart/rhou4.gif");
// sourceLoader.load("img", "img/towns/rampart/rmag1.gif");
// sourceLoader.load("img", "img/towns/rampart/rmag2.gif");
// sourceLoader.load("img", "img/towns/rampart/rmag3.gif");
// sourceLoader.load("img", "img/towns/rampart/rmag4.gif");
// sourceLoader.load("img", "img/towns/rampart/rmag5.gif");
// sourceLoader.load("img", "img/towns/rampart/rmarket.gif");
// sourceLoader.load("img", "img/towns/rampart/rpeg1a.gif");
// sourceLoader.load("img", "img/towns/rampart/rpeg2a.gif");
// sourceLoader.load("img", "img/towns/rampart/rstorage.gif");
// sourceLoader.load("img", "img/towns/rampart/rtav.gif");
// sourceLoader.load("img", "img/towns/rampart/rtre1.gif");
// sourceLoader.load("img", "img/towns/rampart/rtre1h.gif");
// sourceLoader.load("img", "img/towns/rampart/rtre2.gif");
// sourceLoader.load("img", "img/towns/rampart/rtre2h.gif");
// sourceLoader.load("img", "img/towns/rampart/runi1.gif");
// sourceLoader.load("img", "img/towns/rampart/runi2.gif");
sourceLoader.load("js", "dist/app.js");

sourceLoader.allOnLoad(function(){
  var gameLoadingWrap = document.getElementById("gameLoadingWrap");
  var gameWindow = document.getElementById("app");
  setTimeout(function(){
    gameLoadingWrap.style.display = "none";
    gameWindow.style.display = "flex";
    // console.log(sourceLoader)
  },100)
});

