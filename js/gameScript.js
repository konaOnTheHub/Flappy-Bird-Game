var tubeTop = document.getElementsByClassName("tubeTop")[0];
var tubeBottom = document.getElementsByClassName("tubeBottom")[0];
var hole = document.getElementsByClassName("hole")[0];
var bird = document.getElementsByClassName("bird")[0];
let stopGravity = 0

tubeTop.addEventListener("animationiteration", () => {
    var ranNum = Math.random() * (550 - 100) + 100;
    tubeTop.style.height = ranNum + "px";
    console.log("Pos of hole:" + getOffset(hole).top)
});


function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left,
    right: rect.right,
    top: rect.top,
    bottom: rect.bottom,

  };
}


//gravity
var gravity = setInterval(function () {
    if (stopGravity == 0) {
        var x = getComputedStyle(bird);
    var marginVal = parseInt(x.marginTop);
    marginVal = marginVal + 3;
    if (marginVal >= 750) {
        alert("ur dead");
        clearInterval(gravity);
    };
    bird.style.marginTop = marginVal + "px"
    };
}, 16)


//Collision detection
var collision = setInterval(function () {
  //x axis intersects with bird
  if (getOffset(tubeTop).left <= getOffset(bird).right) {
    if (getOffset(bird).top >= getOffset(hole).top && getOffset(bird).bottom <= getOffset(hole).bottom) {
      console.log("Pass")

    } else {
      alert("Ur dead")

    }
    
  };
  return

}, 50)


function jump() {
    stopGravity = 1;
    var count = 20
    var x = getComputedStyle(bird);
    var marginVal = parseInt(x.marginTop);
    var gradualJump = setInterval(function() {
      marginVal = marginVal - 5;
      bird.style.marginTop = marginVal + "px";
      if (marginVal <= 0) {
        alert("ur dead");
        clearInterval(gradualJump);
      }
      count = count - 1;
      if (count == 0) {
        clearInterval(gradualJump);
        stopGravity = 0;
        console.log("Pos of bird:" + getOffset(bird).top)
        
        
      }   
    },15)
    }
