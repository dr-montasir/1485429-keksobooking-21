'use strict';

(() => {
  const mapBlock = document.querySelector(`.map`);
  const mapPinMain = mapBlock.querySelector(`.map__pin--main`);
  const imgPinMain = mapPinMain.querySelector(`img`);

  const halfMainPin = {
    width: Math.floor(mapPinMain.offsetWidth / 2),
    height: Math.floor((mapPinMain.offsetHeight + window.consts.HIGHT_MAINPIN_TAIL) / 2)
  };

  const shiftRightPinImg = Math.round((mapPinMain.offsetWidth - imgPinMain.offsetWidth) / 2);

  window.map = {
    mapBlock,
    mapPinMain,
    halfMainPin,
    shiftRightPinImg
  };
})();
