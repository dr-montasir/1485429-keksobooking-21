'use strict';

(() => {
  const STATIC_POINTS = Object.freeze({x1: 0, x2: 1200, y1: 130, y2: 630});

  const mapBlock = window.map.mapBlock;
  const mapPinMain = window.map.mapPinMain;

  const halfWidthMainPinButton = window.map.halfMainPin.width;
  const halfHeightMainPinButton = window.map.halfMainPin.height;

  mapPinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMainPinMousemove = (moveEvt) => {
      moveEvt.preventDefault();

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const mapPinMainX = mapPinMain.offsetLeft + halfWidthMainPinButton - shift.x;

      // if (mapPinMainX < 0) {
      //   mapPinMain.style.left = (0 - halfWidthMainPinButton) + `px`;
      // } else if (mapPinMainX > mapBlock.clientWidth) {
      //   mapPinMain.style.left = (mapBlock.clientWidth - halfWidthMainPinButton) + `px`;
      // } else {
      //   mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + `px`;
      // }

      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + `px`;
      if (mapPinMainX < 0) {
         mapPinMain.style.left = (0 - halfWidthMainPinButton) + `px`;
      }
      if (mapPinMainX > mapBlock.clientWidth) {
         mapPinMain.style.left = (mapBlock.clientWidth - halfWidthMainPinButton) + `px`;
      }

      const mapPinMainY = mapPinMain.offsetTop + halfHeightMainPinButton - shift.y;

      if (mapPinMainY < STATIC_POINTS.y1) {
        mapPinMain.style.top = (STATIC_POINTS.y1 - halfHeightMainPinButton) + `px`;
      } else if (mapPinMainY > STATIC_POINTS.y2) {
        mapPinMain.style.top = (STATIC_POINTS.y2 - halfHeightMainPinButton) + `px`;
      } else {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + `px`;
      }

      const pointX = mapPinMain.offsetLeft + window.map.halfMainPin.width;
      const pointY = mapPinMain.offsetTop + window.map.halfMainPin.height;

      window.form.adFormAddressField.value = `${pointX}, ${pointY}`;
    };

    const onMainPinMouseup = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMainPinMousemove);
      document.removeEventListener(`mouseup`, onMainPinMouseup);
    };

    document.addEventListener(`mousemove`, onMainPinMousemove);
    document.addEventListener(`mouseup`, onMainPinMouseup);
  });
})();
