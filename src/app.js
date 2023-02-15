//reference:https://ja.javascript.info/mouse-drag-and-drop
/*----------------
* 変数
--------------------*/
const cards = document.querySelectorAll(".card");
let window_w = window.innerWidth * 0.8;
let window_h = window.innerHeight * 0.8;

/*----------------
* 処理
--------------------*/
function getRandom(min, max) {
  let random = Math.floor(Math.random() * (max + 1 - min)) + min;
  return random;
}

const _setElements = () => {
  cards.forEach((card, index) => {
    card.style.top = getRandom(0, window_h) + "px";
    card.style.left = getRandom(0, window_w) + "px";
    card.style.transform = "rotate(" + getRandom(-40, 40) + "deg)";
  });
};

const _mainPC = (target) => {
  target.onmousedown = function (event) {
    let shiftX = event.clientX - target.getBoundingClientRect().left;
    let shiftY = event.clientY - target.getBoundingClientRect().top;

    moveAt(event.pageX, event.pageY);

    // カード（pageX、pageY）座標の中心に置く
    function moveAt(pageX, pageY) {
      target.style.left = pageX - shiftX + "px";
      target.style.top = pageY - shiftY + "px";
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    // (3) mousemove でカード移動する
    document.addEventListener("mousemove", onMouseMove);

    // (4) カードドロップする。不要なハンドラを削除する
    target.onmouseup = function () {
      document.removeEventListener("mousemove", onMouseMove);
      target.onmouseup = null;
    };
  };
  target.ondragstart = function () {
    return false;
  };
};

const _mainSP = (target) => {
  target.ontouchstart = function (event) {
    let shiftX = event.touches[0].clientX - target.getBoundingClientRect().left;
    let shiftY = event.touches[0].clientY - target.getBoundingClientRect().top;

    moveAt(event.touches[0].pageX, event.touches[0].pageY);
    function moveAt(pageX, pageY) {
      target.style.left = pageX - shiftX + "px";
      target.style.top = pageY - shiftY + "px";
    }
    function onMouseMove(event) {
      moveAt(event.touches[0].pageX, event.touches[0].pageY);
    }
    document.addEventListener("touchmove", onMouseMove);
    target.ontouchend = function () {
      document.removeEventListener("touchmove", onMouseMove);
      target.ontouchend = null;
    };
  };
  target.ontouchend = function () {
    return false;
  };
};

const _loop = () => {
  cards.forEach((card, index) => {
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
      _mainSP(card);
    } else {
      _mainPC(card);
    }
  });
};

_setElements();
_loop();
