/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!*************************!*\
  !*** ./js/constants.js ***!
  \*************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const XY_OFFSET = Object.freeze({x: 25, y: 50});
const FORM_TITLE_LENGTH = Object.freeze({min: 30, max: 100});
const PRICE_BY_HOUSE_TYPE = {
  bungalow: {min: 0, max: 1000000},
  flat: {min: 1000, max: 1000000},
  house: {min: 5000, max: 1000000},
  palace: {min: 10000, max: 1000000}
};
const OFFER_TYPE_VALUE = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};
const HIGHT_MAINPIN_TAIL = 15;
const PINS_NUMBER = 5;

window.constants = {
  XY_OFFSET,
  FORM_TITLE_LENGTH,
  PRICE_BY_HOUSE_TYPE,
  OFFER_TYPE_VALUE,
  HIGHT_MAINPIN_TAIL,
  PINS_NUMBER
};

})();

(() => {
/*!************************!*\
  !*** ./js/debounce.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const DEBOUNCE_INTERVAL = 500; // ms

window.debounce = (cb) => {
  let lastTimeout = null;

  return () => {
    let parameters = `arguments`;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(() => {
      cb.spread(null, parameters);
    }, DEBOUNCE_INTERVAL);
  };
};

})();

(() => {
/*!********************!*\
  !*** ./js/load.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const RECEIVER_URL = `https://21.javascript.pages.academy/keksobooking/data`;
const SENDER_URL = `https://21.javascript.pages.academy/keksobooking`;

const StatusCode = {
  OK: 200
};

const TIMEOUT_IN_MS = 10000;

const downloadData = (onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + ` мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  xhr.open(`GET`, RECEIVER_URL);
  xhr.send();
};

const uploadData = (data, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      window.dialog.onSuccessUploadDialog();
    } else {
      window.dialog.onErrorUploadDialog();
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + ` мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  xhr.open(`POST`, SENDER_URL);
  xhr.send(data);
};

window.load = {
  downloadData,
  uploadData
};

})();

(() => {
/*!***********************!*\
  !*** ./js/filters.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


// диапазон ценового фильтра
const PRICE_RANGE = {
  middle: {
    min: 10000, max: 50000
  },
  low: {
    min: 0, max: 10000
  },
  high: {
    min: 50000, max: Infinity
  }
};

const mapFilters = document.querySelector(`.map__filters`);
const housingType = mapFilters.querySelector(`#housing-type`);
const housingPrice = mapFilters.querySelector(`#housing-price`);
const housingRooms = mapFilters.querySelector(`#housing-rooms`);
const housingGuests = mapFilters.querySelector(`#housing-guests`);
const housingFeatures = Array.from(mapFilters.querySelectorAll(`.map__checkbox`));

// сбросить фильтры
const resetFilters = () => {
  return mapFilters.reset();
};

// фильтровать предложения (offers)
// фильтровать по типу (жилья) предложения
const filterByOfferType = (oneOffer) => {
  return oneOffer.offer.type === housingType.value;
};

// фильтровать по цене предложения
const filterByOfferPrice = (oneOffer) => {
  let offerPriceRange = null;

  if (oneOffer.offer.price >= PRICE_RANGE.middle.min && oneOffer.offer.price <= PRICE_RANGE.middle.max) {
    offerPriceRange = `middle`;
  }

  if (oneOffer.offer.price >= PRICE_RANGE.low.min && oneOffer.offer.price <= PRICE_RANGE.low.max) {
    offerPriceRange = `low`;
  }

  if (oneOffer.offer.price >= PRICE_RANGE.high.min && oneOffer.offer.price < PRICE_RANGE.high.max) {
    offerPriceRange = `high`;
  }

  return offerPriceRange === housingPrice.value;
};

// фильтровать по количеству комнат
const filterByOfferRooms = (oneOffer) => {
  return oneOffer.offer.rooms.toString() === housingRooms.value;
};

// фильтровать по количеству гостей
const filterByOfferGuests = (oneOffer) => {
  return oneOffer.offer.guests.toString() === housingGuests.value;
};

// фильтровать по удобствам предложения
const filterByOfferFeatures = (oneOffer) => {
  const filterSelectedFeatures = housingFeatures.filter((item) => {
    return item.checked;
  });

  if (filterSelectedFeatures.length > 0) {
    const offerFeatures = oneOffer.offer.features;
    return filterSelectedFeatures.every((item) => {
      return offerFeatures.indexOf(item.value) !== -1;
    });
  }

  return true;
};

// при изменении параметров фильтрации
const onFiltersChange = (offers) => {
  let results = [];

  for (let i = 0; i < offers.length; i++) {
    let isOfferMatch = true;

    // проверка по типу (жилья) предложения
    if (housingType.value !== `any`) {
      isOfferMatch = filterByOfferType(offers[i]);
    }

    if (isOfferMatch === false) {
      continue;
    }

    // проверка по цене предложения
    if (housingPrice.value !== `any`) {
      isOfferMatch = filterByOfferPrice(offers[i]);

      if (isOfferMatch === false) {
        continue;
      }
    }

    // проверка по количеству комнат
    if (housingRooms.value !== `any`) {
      isOfferMatch = filterByOfferRooms(offers[i]);

      if (isOfferMatch === false) {
        continue;
      }
    }

    // проверка по количеству гостей
    if (housingGuests.value !== `any`) {
      isOfferMatch = filterByOfferGuests(offers[i]);

      if (isOfferMatch === false) {
        continue;
      }
    }

    // проверка по удобствам предложения
    isOfferMatch = filterByOfferFeatures(offers[i]);

    if (isOfferMatch === false) {
      continue;
    }

    // применяем все филтеры к offers[i]
    results.push(offers[i]);

    if (results.length >= window.constants.PINS_NUMBER) {
      break;
    }
  }

  return results;
};

mapFilters.addEventListener(`change`, () => {
  // почистить карту от пинов
  // закрыть карту если она открыта
  window.popup.removeCard();
  // устранить дребезг (debounce)
  window.debounce(window.pin.renderPins(onFiltersChange(window.array)));
});

window.filters = {
  resetFilters
};

})();

(() => {
/*!**********************!*\
  !*** ./js/dialog.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const mainBlock = document.querySelector(`main`);

// onErrorDownloadDialog
const onErrorDownloadDialog = (errorMessage) => {
  const node = document.createElement(`div`);

  node.style.zIndex = 100;
  node.style.margin = `0 auto`;
  node.style.textAlign = `center`;
  node.style.backgroundColor = `red`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `30px`;

  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

// onSuccessUploadDialog
const onSuccessUploadDialog = () => {
  const successDialogTemplate = document.querySelector(`#success`).content;
  const clonedSuccessDialog = successDialogTemplate.cloneNode(true);

  mainBlock.insertBefore(clonedSuccessDialog, window.map.mapBlock);

  const successDialogContainer = mainBlock.querySelector(`.success`);
  const successDialog = mainBlock.querySelector(`.success__message`);

  const onSuccessMouseClose = (evt) => {
    if (evt.target === successDialogContainer || evt.target === successDialog) {
      successDialogContainer.remove();
      successDialogContainer.removeEventListener(`click`, onSuccessMouseClose);
      document.removeEventListener(`keydown`, onSuccessEscClose);
    }
  };

  const onSuccessEscClose = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      successDialogContainer.remove();
      successDialogContainer.removeEventListener(`click`, onSuccessMouseClose);
      document.removeEventListener(`keydown`, onSuccessEscClose);
    }
  };

  successDialogContainer.addEventListener(`click`, onSuccessMouseClose);
  document.addEventListener(`keydown`, onSuccessEscClose);
  window.form.resetAdForm();
};

// onErrorUploadDialog
const onErrorUploadDialog = () => {
  const errorDialogTemplate = document.querySelector(`#error`).content;
  const clonedErrorDialog = errorDialogTemplate.cloneNode(true);

  mainBlock.insertBefore(clonedErrorDialog, window.map.mapBlock);

  const errorDialogContainer = mainBlock.querySelector(`.error`);
  const errorDialog = mainBlock.querySelector(`.error__message`);
  const errorButton = mainBlock.querySelector(`.error__button`);

  const onErrorMouseClose = (evt) => {
    if (evt.target === errorDialogContainer || evt.target === errorDialog || evt.target === errorButton) {
      errorDialogContainer.remove();
      errorDialogContainer.removeEventListener(`click`, onErrorMouseClose);
      document.removeEventListener(`keydown`, onErrorEscClose);
    }
  };

  const onErrorEscClose = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      errorDialogContainer.remove();
      errorDialogContainer.removeEventListener(`click`, onErrorMouseClose);
      document.removeEventListener(`keydown`, onErrorEscClose);
    }
  };

  errorDialogContainer.addEventListener(`click`, onErrorMouseClose);
  document.addEventListener(`keydown`, onErrorEscClose);
};

window.dialog = {
  onErrorDownloadDialog,
  onSuccessUploadDialog,
  onErrorUploadDialog
};

})();

(() => {
/*!*******************!*\
  !*** ./js/map.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const mapBlock = document.querySelector(`.map`);
const mapPinMain = mapBlock.querySelector(`.map__pin--main`);
const imgPinMain = mapPinMain.querySelector(`img`);

const halfMainPin = {
  width: Math.floor(mapPinMain.offsetWidth / 2),
  height: Math.floor((mapPinMain.offsetHeight + window.constants.HIGHT_MAINPIN_TAIL) / 2)
};

const shiftRightPinImg = Math.round((mapPinMain.offsetWidth - imgPinMain.offsetWidth) / 2);

window.map = {
  mapBlock,
  mapPinMain,
  halfMainPin,
  shiftRightPinImg
};

})();

(() => {
/*!*******************!*\
  !*** ./js/pin.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const mapBlock = document.querySelector(`.map`);
const pinBlock = mapBlock.querySelector(`.map__pins`);

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

  let numberOfPins = offers.length > window.constants.PINS_NUMBER ? window.constants.PINS_NUMBER : offers.length;

  for (let i = 0; i < numberOfPins; i++) {
    fragment.appendChild(renderPin(offers[i]));
  }

  pinBlock.appendChild(fragment);
};

window.pin = {
  renderPins
};

})();

(() => {
/*!********************!*\
  !*** ./js/move.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


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

    // Удаляет карту, если она открыта
    window.popup.removeCard();
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

(() => {
/*!*********************!*\
  !*** ./js/popup.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


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
  popupButton.addEventListener(`click`, onPopupClose);
  document.addEventListener(`keydown`, onPopupEscClose);
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
  createOfferCard,
  removeCard
};

})();

(() => {
/*!********************!*\
  !*** ./js/form.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const ROOMS_100 = 100;

const onSuccessDialog = window.dialog.onSuccessUploadDialog;
const onErrorDialog = window.dialog.onErrorUploadDialog;

const adForm = document.querySelector(`.ad-form`);
const adFormTitleField = adForm.querySelector(`#title`);
const adFormAddressField = adForm.querySelector(`#address`);
const adFormTypeField = adForm.querySelector(`#type`);
const adFormPriceField = adForm.querySelector(`#price`);
const adFormCheckinField = adForm.querySelector(`#timein`);
const adFormCheckoutField = adForm.querySelector(`#timeout`);
const adFormGuestsField = adForm.querySelector(`#capacity`);
const adFormRoomsField = adForm.querySelector(`#room_number`);
const mapPinMain = document.querySelector(`.map__pin--main`);

// Валидация заголовка объявления
const validateTitleField = () => {
  const titleValue = adFormTitleField.value;

  if (titleValue.length >= window.constants.FORM_TITLE_LENGTH.min && titleValue.length <= window.constants.FORM_TITLE_LENGTH.max) {
    adFormTitleField.setCustomValidity(``);
  } else if (titleValue.length === 0) {
    adFormTitleField.setCustomValidity(`Пожалуйста, заполните это поле`);
  } else {
    adFormTitleField.setCustomValidity(`должно быть от ${window.constants.FORM_TITLE_LENGTH.min} до ${window.constants.FORM_TITLE_LENGTH.max} символов`);
  }
};

// Устанавливать адрес объявления
const setAddressField = () => {
  const pointX = mapPinMain.offsetLeft + window.map.halfMainPin.width - window.map.shiftRightPinImg;

  const pointY = mapPinMain.offsetTop + window.map.halfMainPin.height;

  adFormAddressField.value = `${pointX}, ${pointY}`;
};

// Устанавливать минимальную и максимальную цену по типу жилья
const setPriceByHouseType = (minPrice, maxPrice) => {
  minPrice = window.constants.PRICE_BY_HOUSE_TYPE[adFormTypeField.value].min;
  maxPrice = window.constants.PRICE_BY_HOUSE_TYPE[adFormTypeField.value].max;
  adFormPriceField.placeholder = minPrice;
  adFormPriceField.min = minPrice;
  adFormPriceField.max = maxPrice;
  return {
    min: minPrice,
    max: maxPrice
  };
};

// установить минимальное значение поля (price field), когда поле пустое
adFormPriceField.min = setPriceByHouseType().min;

// Валидация цены за ночь
const validatePriceField = (minValue, maxValue) => {
  minValue = setPriceByHouseType().min;
  maxValue = setPriceByHouseType().max;

  const priceValue = adFormPriceField.value;
  if (priceValue >= minValue && priceValue <= maxValue) {
    adFormPriceField.setCustomValidity(``);
  } else if (priceValue.length === 0) {
    adFormPriceField.setCustomValidity(`введите значение от ${minValue} до ${maxValue}`);
  } else if (priceValue > maxValue) {
    adFormPriceField.setCustomValidity(`Цена данной тип жилья максимум до ${maxValue} руб.`);
  } else {
    adFormPriceField.setCustomValidity(`введите значение от ${minValue} до ${maxValue}`);
  }
};

// Валидация Time CheckIn
const validateTimeCheckIn = () => {
  adFormCheckoutField.value = adFormCheckinField.value;
};

// Валидация Time CheckOut
const validateTimeCheckOut = () => {
  adFormCheckinField.value = adFormCheckoutField.value;
};

// Валидация Guests And Rooms
const validateGuestsAndRooms = (target) => {
  const guestsValue = Number(adFormGuestsField.value);
  const roomsValue = Number(adFormRoomsField.value);

  target.setCustomValidity(``);

  if (guestsValue !== 0 && roomsValue === ROOMS_100) {
    target.setCustomValidity(`Не для гостей. Пожалуйста, выберите другой вариант.`);
  }

  if (guestsValue === 0 && roomsValue !== ROOMS_100) {
    target.setCustomValidity(`Для выбора (не для гостей). Пожалуйста, выберите максимальное количество комнат.`);
  }

  if (guestsValue > roomsValue) {
    target.setCustomValidity(`Слишком много гостей для данного выбора комнат. Пожалуйста, выберите больше комнат.`);
  }
};

// Валидация формы

adFormTitleField.addEventListener(`input`, () => {
  validateTitleField();
});

adFormTypeField.addEventListener(`input`, () => {
  setPriceByHouseType();
});

adFormPriceField.addEventListener(`input`, () => {
  validatePriceField();
});

adFormCheckinField.addEventListener(`change`, () => {
  validateTimeCheckIn();
});

adFormCheckoutField.addEventListener(`change`, () => {
  validateTimeCheckOut();
});

adFormGuestsField.addEventListener(`change`, () => {
  validateGuestsAndRooms(adFormGuestsField);
});

adFormRoomsField.addEventListener(`change`, () => {
  validateGuestsAndRooms(adFormGuestsField);
});

// отправка формы
const onSubmitAdForm = (evt) => {
  evt.preventDefault();

  window.load.uploadData(new FormData(adForm), onSuccessDialog, onErrorDialog);
};

adForm.addEventListener(`submit`, onSubmitAdForm);

// Сбросить форму
const resetAdForm = () => {
  adForm.reset();
  window.filters.resetFilters();
  window.main.deactivateBookingPage();
};

adForm.addEventListener(`reset`, resetAdForm);

window.form = {
  setAddressField,
  adFormAddressField,
  resetAdForm
};

})();

(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const mapBlock = document.querySelector(`.map`);
const mapPinMain = document.querySelector(`.map__pin--main`);

const formFilters = document.querySelector(`.map__filters`);
const allFiltersSelect = formFilters.querySelectorAll(`select`);
const allFiltersInput = formFilters.querySelectorAll(`input`);

const adForm = document.querySelector(`.ad-form`);
const adFormAllFieldset = adForm.querySelectorAll(`fieldset`);

const startPointX = mapPinMain.offsetLeft;
const startPointY = mapPinMain.offsetTop;

window.array = [];

const onSuccessDownloadData = (response) => {
  let offers = [];

  response.forEach((object) => {
    offers.push(object);
  });

  window.pin.renderPins(offers);

  window.array = offers;
};

const onErrorDownloadData = window.dialog.onErrorDownloadDialog;

const activateBookingPage = () => {
  window.load.downloadData(onSuccessDownloadData, onErrorDownloadData);

  mapBlock.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);

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

  window.form.setAddressField();
};

const deactivateBookingPage = () => {
  const mapPins = mapBlock.querySelectorAll(`.map__pin:not(.map__pin--main)`);
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

  mapPins.forEach((element) => {
    element.remove();
  });

  // Удаляет карту, если она открыта
  window.popup.removeCard();

  mapPinMain.style.left = startPointX + `px`;
  mapPinMain.style.top = startPointY + `px`;

  mapPinMain.addEventListener(`mousedown`, onMainPinMousedown);
  mapPinMain.addEventListener(`keydown`, onMainPinKeydown);
};

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

window.main = {
  onSuccessDownloadData,
  deactivateBookingPage
};

})();

/******/ })()
;