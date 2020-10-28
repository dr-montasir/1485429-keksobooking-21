'use strict';

(() => {
  const mapBlock = document.querySelector(`.map`);
  const pinBlock = mapBlock.querySelector(`.map__pins`);

  const renderPin = (offer) => {
    const pinTemplate = document.querySelector(`#pin`).content;
    const pin = pinTemplate.cloneNode(true);
    const pinImage = pin.querySelector(`img`);
    const pinButton = pin.querySelector(`button`);
    pinButton.style = `left:${offer.location.x - window.consts.XY_OFFSET.x}px;
                       top:${offer.location.y - window.consts.XY_OFFSET.y}px;`;
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
    const fragment = document.createDocumentFragment();

    offers.forEach((offer) => {
      fragment.appendChild(renderPin(offer));
    });

    pinBlock.appendChild(fragment);
  };

  window.pin = {
    renderPins
  };
})();
