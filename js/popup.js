'use strict';

(() => {
  const mapBlock = document.querySelector(`.map`);

  const onPopupEscClose = (evt) => {
    if (evt.key === `Escape`) {
      onPopupClose();
    }
  };

  const onPopupClose = () => {
    const mapCard = mapBlock.querySelector(`.map__card`);

    mapCard.remove();

    const activePin = mapBlock.querySelector(`.map__pin--active`);

    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
    }

    const popupButton = mapCard.querySelector(`.popup__close`);
    popupButton.removeEventListener(`click`, onPopupClose);
    document.removeEventListener(`keydown`, onPopupEscClose);
  };

  window.popup = {
    onPopupEscClose,
    onPopupClose
  };
})();
