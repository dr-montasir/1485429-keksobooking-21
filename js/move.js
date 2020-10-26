'use strict';

(() => {
  const mapBlock = document.querySelector(`.map`);
  const mapPinMain = mapBlock.querySelector(`.map__pin--main`);

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

      const mapPinMainX = mapPinMain.offsetLeft + window.consts.HALF_WIDTH_MAPPINMAIN - shift.x;

      if (mapPinMainX < 0) {
        mapPinMain.style.left = (0 - window.consts.HALF_WIDTH_MAPPINMAIN) + `px`;
      } else if (mapPinMainX > mapBlock.clientWidth) {
        mapPinMain.style.left = (mapBlock.clientWidth - window.consts.HALF_WIDTH_MAPPINMAIN) + `px`;
      } else {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + `px`;
      }

      const mapPinMainY = mapPinMain.offsetTop + window.consts.HEIGHT_MAPPINMAIN_AFTER - shift.y;

      if (mapPinMainY < window.consts.STATIC_POINTS.y1) {
        mapPinMain.style.top = (window.consts.STATIC_POINTS.y1 - window.consts.HEIGHT_MAPPINMAIN_AFTER) + `px`;
      } else if (mapPinMainY > window.consts.STATIC_POINTS.y2) {
        mapPinMain.style.top = (window.consts.STATIC_POINTS.y2 - window.consts.HEIGHT_MAPPINMAIN_AFTER) + `px`;
      } else {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + `px`;
      }

      window.form.adFormAddressField.value = window.form.setAddressField();
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
