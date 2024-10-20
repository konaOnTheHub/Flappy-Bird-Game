var tubeTop = document.getElementsByClassName("tubeTop")[0];

tubeTop.addEventListener("animationiteration", () => {
    var ranNum = Math.random() * (550 - 150) + 150;
    tubeTop.style.height = ranNum + "px";
});