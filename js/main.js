'use strict';

const mapBlock = document.querySelector(`.map`);
const mapPinMain = document.querySelector(`.map__pin--main`);
const pinBlock = mapBlock.querySelector(`.map__pins`);
const formFilters = document.querySelector(`.map__filters`);
const allFiltersSelect = formFilters.querySelectorAll(`select`);
const allFiltersInput = formFilters.querySelectorAll(`input`);

const adForm = document.querySelector(`.ad-form`);
const adFormAllFieldset = adForm.querySelectorAll(`fieldset`);

// Здесь я пишу код активации cтраницы Кексобукинга (форма и карта)
const activateBookingPage = () => {
  mapBlock.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  renderPins(offers);

  allFiltersSelect.forEach((element) => {
    element.disabled = false;
  });

  allFiltersInput.forEach((element) => {
    element.disabled = false;
  });

  adFormAllFieldset.forEach((element) => {
    element.disabled = false;
  });

  mapPinMain.removeEventListener(`mousedown`, onMainPinMousedown);
  mapPinMain.removeEventListener(`keydown`, onMainPinKeydown);
};

// Здесь я пишу код деактивации cтраницы Кексобукинга (форма и карта)
const deactivateBookingPage = () => {
  mapBlock.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);

  allFiltersSelect.forEach((element) => {
    element.disabled = true;
  });

  allFiltersInput.forEach((element) => {
    element.disabled = true;
  });

  adFormAllFieldset.forEach((element) => {
    element.disabled = true;
  });

  mapPinMain.addEventListener(`mousedown`, onMainPinMousedown);
  mapPinMain.addEventListener(`keydown`, onMainPinKeydown);
};

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

    createOfferCard(offer);

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

// эта часть была закомментирована в модуле 4 задача 1 //

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
  offerHouseType.textContent = offer.offer.type;
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

// конец закомментированой части в модуле 4 задача 1//

const onMainPinMousedown = (evt) => {
  if (evt.button === 0) {
    if (mapBlock.classList.contains(`map--faded`)) {
      activateBookingPage();
    }
  }
};

const onMainPinKeydown = (evt) => {
  if (evt.key === `Enter`) {
    if (mapBlock.classList.contains(`map--faded`)) {
      activateBookingPage();
    }
  }
};

deactivateBookingPage();
const offers = window.data.generateOffers();
window.form.setAddressField();
window.form.validateAdForm();
