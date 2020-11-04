'use strict';

(() => {
  const mapBlock = document.querySelector(`.map`);
  const pinBlock = mapBlock.querySelector(`.map__pins`);

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

  const renderOfferFeatures = (offerCard, features) => {
    const offerFeatures = offerCard.querySelector(`.popup__features`);
    offerFeatures.innerHTML = ``;

    if (!features || features.length === 0) {
      offerFeatures.classList.add(`hidden`);
    }

    const fragment = document.createDocumentFragment();

    features.forEach((feature) => {
      const featureItem = document.createElement(`li`);
      featureItem.classList.add(`popup__feature`, `popup__feature--${feature}`);
      fragment.appendChild(featureItem);
    });

    offerFeatures.appendChild(fragment);
  };

  const renderOfferPhotos = (offerCard, photos) => {
    const offerPhotos = offerCard.querySelector(`.popup__photos`);
    const offerPhoto = offerPhotos.querySelector(`img`);
    offerPhotos.innerHTML = ``;

    if (!photos || photos.length === 0) {
      offerPhotos.classList.add(`hidden`);
    }

    const fragment = document.createDocumentFragment();

    photos.forEach((photo) => {
      const offerCardPhoto = offerPhoto.cloneNode();
      offerCardPhoto.src = photo;
      fragment.appendChild(offerCardPhoto);
    });

    return offerPhotos.appendChild(fragment);
  };

  const createOfferCard = (offer) => {
    const cardTemplate = document.querySelector(`#card`).content;
    const mapCard = cardTemplate.querySelector(`.map__card`);
    const offerCard = mapCard.cloneNode(true);
    const offerTitle = offerCard.querySelector(`.popup__title`);
    const offerAddress = offerCard.querySelector(`.popup__text--address`);
    const offerPrice = offerCard.querySelector(`.popup__text--price`);
    const offerHouseType = offerCard.querySelector(`.popup__type`);
    const offerRoomsAndGuests = offerCard.querySelector(`.popup__text--capacity`);
    const offerTimes = offerCard.querySelector(`.popup__text--time`);
    const offerDescription = offerCard.querySelector(`.popup__description`);
    const offerAvatar = offerCard.querySelector(`.popup__avatar`);

    offerTitle.textContent = offer.offer.title;
    offerAddress.textContent = offer.offer.address;
    offerPrice.textContent = `${offer.offer.price} ₽/ночь`;
    offerHouseType.textContent = window.constants.OFFER_TYPE_VALUE[offer.offer.type];
    offerRoomsAndGuests.textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей.`;
    offerTimes.textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}.`;
    renderOfferFeatures(offerCard, offer.offer.features);
    offerDescription.textContent = offer.offer.description;
    renderOfferPhotos(offerCard, offer.offer.photos);
    offerAvatar.src = `${offer.author.avatar}`;

    pinBlock.append(offerCard);

    // popupButton для закрытия всплывающей карточки объявления
    const popupButton = offerCard.querySelector(`.popup__close`);
    popupButton.addEventListener(`click`, window.popup.onPopupClose);
    document.addEventListener(`keydown`, window.popup.onPopupEscClose);
  };

  // Удаляет карту, если она открыта
  // эта функция нужно для удаления карту при:
  // 1- перемещении главного штифта
  // 2- при деактивации страницы
  // 3- при сбросе формы
  const removeCard = () => {
    if (mapBlock.querySelector(`.map__card`)) {
      onPopupClose();
    }
  };

  window.popup = {
    onPopupEscClose,
    onPopupClose,
    createOfferCard,
    removeCard
  };
})();
