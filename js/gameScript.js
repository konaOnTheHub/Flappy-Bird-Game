var menuObjects = document.getElementsByClassName("menuObjects")[0];
var gameObjects = document.getElementsByClassName("gameObjects")[0];

var tubeTop = document.getElementsByClassName("tubeTop")[0];
var tubeBottom = document.getElementsByClassName("tubeBottom")[0];
var hole = document.getElementsByClassName("hole")[0];
var bird = document.getElementsByClassName("bird")[0];

var scoreDisplay = document.getElementById("score");

let score = 0;
let stopGravity = 1;
let gameState = 0




function switchObjects(state) {
  if (state == 1) {
    menuObjects.style.display = "none";
    gameObjects.style.display = "unset";
    gameState = 1;
  } else if (state == 0) {
    gameObjects.style.display = "none";
    menuObjects.style.display = "unset";
    gameState = 0;

  }
}


//Everytime the animation iterates it generates a new pos for the hole.
tubeTop.addEventListener("animationiteration", () => {
  var ranNum = Math.random() * (550 - 100) + 100;
  //Does this by assigning a new height to the top tube thus pushing the hole element down.
  tubeTop.style.height = ranNum + "px";
  score = score + 1
  scoreDisplay.innerText = "Score: " + score;
});

//Function to return the position of "el"
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
      death()
    };
    bird.style.marginTop = marginVal + "px"
  };
}, 16)


//Collision detection
var collision = setInterval(function () {
  //if x axis intersects with bird
  if (getOffset(tubeTop).left <= getOffset(bird).right) {
    //Checks if the bird in the hole
    if (getOffset(bird).top >= getOffset(hole).top && getOffset(bird).bottom <= getOffset(hole).bottom) {
      return

    } else {
      death()

    }

  };
  return

}, 50)

//Jumping function
function jump() {
  if (gameState == 0) {
    return
  }

  stopGravity = 1;
  var count = 20
  //Get current margin value
  var x = getComputedStyle(bird);
  var marginVal = parseInt(x.marginTop);
  //This function removes 100px from the birds top margin gradually so it looks smooth
  var gradualJump = setInterval(function () {
    //Makes the bird look up slightly by changing the bg image
    bird.style.backgroundImage = "url('../images/birdfly.png')"
    marginVal = marginVal - 5;
    bird.style.marginTop = marginVal + "px";
    if (marginVal <= 0) {

      clearInterval(gradualJump);
      console.log("debug")
      death();

    }
    count = count - 1;
    //Once all 100px have been removed stops the setinterval until the next time the jump function is called
    if (count == 0) {
      //Changes the background image back to the non jumping bird image
      bird.style.backgroundImage = "url('../images/bird.png')"
      clearInterval(gradualJump);
      stopGravity = 0;


    }
  }, 15)
}



function death() {
  switchObjects(0);
  stopGravity = 1;
  alert("ur dead");

};

function play() {
  switchObjects(1);
  score = 0;
  stopGravity = 0;
  bird.style.marginTop = "250px";
};
