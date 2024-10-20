var tubeTop = document.getElementsByClassName("tubeTop")[0];
var bird = document.getElementsByClassName("bird")[0];

tubeTop.addEventListener("animationiteration", () => {
    var ranNum = Math.random() * (550 - 150) + 150;
    tubeTop.style.height = ranNum + "px";
});

//gravity
var gravity = setInterval(function () {
    var x = getComputedStyle(bird);
    var marginVal = parseInt(x.marginTop);
    marginVal = marginVal + 3;
    if (marginVal >= 750) {
        alert("ur dead");
        clearInterval(gravity);
    };
    bird.style.marginTop = marginVal + "px"

}, 10)

