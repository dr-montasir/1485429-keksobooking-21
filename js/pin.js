'use strict';

(() => {
  const mapBlock = document.querySelector(`.map`);
  const pinBlock = mapBlock.querySelector(`.map__pins`);
  const allPins = mapBlock.querySelectorAll(`.map__pin:not(.map__pin--main)`);

  const renderPin = (offer) => {
    const pinTemplate = document.querySelector(`#pin`).content;
    const pin = pinTemplate.cloneNode(true);
    const pinImage = pin.querySelector(`img`);
    const pinButton = pin.querySelector(`button`);

    pinButton.style.left = `${offer.location.x - window.constants.XY_OFFSET.x}px`;
    pinButton.style.top = `${offer.location.y - window.constants.XY_OFFSET.y}px`;
    pinImage.src = `${offer.author.avatar}`;
    pinImage.alt = `${offer.offer.title}`;

    pinButton.addEventListener(`click`, () => {
      const oldCard = mapBlock.querySelector(`.map__card`);
      const activePin = mapBlock.querySelector(`.map__pin--active`);

      if (activePin) {
        activePin.classList.remove(`map__pin--active`);
      }

      if (oldCard) {
        oldCard.remove();
      }

      window.popup.createOfferCard(offer);

      pinButton.classList.add(`map__pin--active`);
    });

    return pin;
  };

  const renderPins = (offers) => {
    const allPins = mapBlock.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    allPins.forEach((element) => {
      element.remove();
    });

    const fragment = document.createDocumentFragment();

    // количество пинов
    let numberOfPins = offers.length > window.constants.PINS_NUMBER ? window.constants.PINS_NUMBER : offers.length;

    for (let i = 0; i < numberOfPins; i++) {
      fragment.appendChild(renderPin(offers[i]));
    }

    // offers.forEach((offer) => {
    //   fragment.appendChild(renderPin(offer));
    // });

    pinBlock.appendChild(fragment);
  };

  window.pin = {
    renderPins
  };
})();
