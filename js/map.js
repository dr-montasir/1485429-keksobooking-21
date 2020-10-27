'use strict';

(() => {
  const mapBlock = document.querySelector(`.map`);
  const mapPinMain = mapBlock.querySelector(`.map__pin--main`);

  const halfMainPin = {
    width: Math.floor(mapPinMain.offsetWidth / 2),
    height: Math.floor((mapPinMain.offsetHeight + window.consts.HIGHT_MAINPIN_TAIL) / 2)
  };

  const getlocationXY = () => {
    const locations = [];

    for (let i = 0; i < window.consts.NUMBER_OF_OFFERS; i++) {
      const locationX = window.utils.getRandomInt(window.consts.STATIC_POINTS.x1, window.consts.STATIC_POINTS.x2);
      const locationY = window.utils.getRandomInt(window.consts.STATIC_POINTS.y1, window.consts.STATIC_POINTS.y2);
      locations.push({x: locationX, y: locationY});
    }

    return locations;
  };

  window.map = {
    mapBlock,
    mapPinMain,
    halfMainPin,
    getlocationXY
  };
})();
