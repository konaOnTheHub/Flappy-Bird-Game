//Import main menu and game elements as a whole
const menuObjects = document.getElementsByClassName("menuObjects")[0];
const gameObjects = document.getElementsByClassName("gameObjects")[0];


//Import game elements individually
const tubeTop = document.getElementsByClassName("tubeTop")[0];
const tubeBottom = document.getElementsByClassName("tubeBottom")[0];
const hole = document.getElementsByClassName("hole")[0];
const bird = document.getElementsByClassName("bird")[0];


//import score and highscore elements
const scoreDisplay = document.getElementById("score");
const hiScore = document.getElementById("hiScore");
hiScore.innerText = "Highscore: " + getUserScore();


//sound import
const flapSound = new Audio('../audio/flap.mp3');
const hitSound = new Audio('../audio/hit.mp3');
const fallSound = new Audio('../audio/fall.mp3');

let score = 0;
let stopGravity = 1;
let gameState = 0



document.addEventListener("keypress", function (event) {
  if (event.keyCode == 32) {
    jump();
  }
});

//Switches the main menu screen to the game screen and vice versa
function switchObjects(state) {
  //Does this by hiding the predefined HTML elements inside welcome.html of whichever screen we don't want to see
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
  randomHoleGenerator();
  score = score + 1;
  scoreDisplay.innerText = "Score: " + score;
});
//Generates a new pos for the hole
function randomHoleGenerator() {
  let ranNum = Math.random() * (550 - 50) + 50;
  //Does this by assigning a new height to the top tube thus pushing the hole element down.
  tubeTop.style.height = ranNum + "px";
}

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
let gravity = setInterval(function () {
  if (stopGravity == 0 && gameState == 1) {
    let x = getComputedStyle(bird);
    let marginVal = parseInt(x.marginTop);
    //we move the bird down by adding +3 to the current margin value
    marginVal = marginVal + 3;
    //If bird reaches the bottom (750px) call death function
    if (marginVal >= 750) {
      console.log(stopGravity);
      death();
    };
    bird.style.marginTop = marginVal + "px"
  };
}, 10) //happens every 10ms


//Collision detection
let collision = setInterval(function () {
  if (gameState == 0) {
    return
  }
  //if x axis intersects with bird
  if (getOffset(tubeTop).left <= getOffset(bird).right && getOffset(tubeTop).right > getOffset(bird).left) {
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
  playSound(1);
  stopGravity = 1;
  let count = 20
  //Get current margin value
  let x = getComputedStyle(bird);
  let marginVal = parseInt(x.marginTop);
  //This function removes 100px from the birds top margin gradually so it looks smooth
  let gradualJump = setInterval(function () {
    //Makes the bird look up slightly by changing the bg image
    bird.style.backgroundImage = "url('../images/birdfly.png')"
    marginVal = marginVal - 5;
    bird.style.marginTop = marginVal + "px";
    //if bird collides with the ceiling (margin of 0) then invoke death
    if (marginVal <= 0) {
      death();
      clearInterval(gradualJump);

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
//Function responsible for playing audio
function playSound(x) {
  //plays flap sound if x = 1
  if (x == 1) {
    //pause is necesarry in case the function is called before the previous flap hasn't completed playing
    flapSound.pause();
    flapSound.currentTime = 0;
    flapSound.play();
  } else if (x == 2) {
    hitSound.play();

  } else if (x == 3) {
    fallSound.play();
  }
}
//Function called upon collision detection of any kind
function death() {
  //Plays the hit sound
  playSound(2);
  updateUsrScore(score);
  stopGravity = 1;
  gameState = 0;
  deathAnimation();


};
//Function responsible for the fall animation of the bird upon death
function deathAnimation() {
  //plays hit sound
  playSound(3);
  //works very similarly to the gravity function
  //We use a interval function to gradually add 3px to the birds top margin value thus moving the object down
  let deathInterval = setInterval(function () {
    bird.style.backgroundImage = "url('../images/birdfall.png')";
    let x = getComputedStyle(bird);
    let marginVal = parseInt(x.marginTop);
    marginVal = marginVal + 3;
    if (marginVal >= 750) {
      //if we reach the bottom stop the function
      clearInterval(deathInterval);
      //change back to main menu
      switchObjects(0);


    }
    //otherwise add the new margin value to the bird element
    bird.style.marginTop = marginVal + "px"

  }, 3)

}

function play() {
  scoreDisplay.innerText = "Score: 0";
  randomHoleGenerator();
  //switch to the game screen
  switchObjects(1);
  score = 0;
  stopGravity = 0;
  //resets birds position to default
  bird.style.marginTop = "250px";
};
