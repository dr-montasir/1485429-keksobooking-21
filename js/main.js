'use strict';

const NUMBER_OF_OFFERS = 8;
const MIM_NUMBER_OF_USERS = 1;
const POST_TITLES = [`Дворец`, `Квартира`, `Дом`, `Бунгало`];
const PRICE_FROM = 0;
const PRICE_TO = 20000;
const TYPE_OF_HOUSES = [`palace`, `flat`, `house`, `bungalo`];
const NUMBER_OF_ROOMS = [1, 2, 3, 100];
const NUMBER_OF_GUESTS = [3, 2, 1, 0];
const CHECKINS = [`12:00`, `13:00`, `14:00`];
const CHECKOUTS = [`12:00`, `13:00`, `14:00`];
const FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];
const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const STATIC_POINTS = Object.freeze({x1: 0, x2: 1200, y1: 130, y2: 630});
const XY_OFFSET = Object.freeze({x: 25, y: 50});
const FORM_TITLE_LENGTH = Object.freeze({min: 30, max: 100});
const PRICE_BY_HOUSE_TYPE = {
  bungalo: {min: 0, max: 500},
  flat: {min: 1000, max: 2000},
  house: {min: 5000, max: 10000},
  palace: {min: 10000, max: 20000}
};
const HEIGHT_MAPPINMAIN_AFTER = 22;

const mapBlock = document.querySelector(`.map`);
const mapPinMain = document.querySelector(`.map__pin--main`);
const pinBlock = mapBlock.querySelector(`.map__pins`);
const formFilters = document.querySelector(`.map__filters`);
const allFiltersSelect = formFilters.querySelectorAll(`select`);
const allFiltersInput = formFilters.querySelectorAll(`input`);
const adForm = document.querySelector(`.ad-form`);
const adFormAllFieldset = adForm.querySelectorAll(`fieldset`);
const adFormTitleField = adForm.querySelector(`#title`);
const adFormAddressField = adForm.querySelector(`#address`);
const adFormTypeField = adForm.querySelector(`#type`);
const adFormPriceField = adForm.querySelector(`#price`);
const adFormCheckinField = adForm.querySelector(`#timein`);
const adFormCheckoutField = adForm.querySelector(`#timeout`);
const adFormGuestsField = adForm.querySelector(`#capacity`);
const adFormRoomsField = adForm.querySelector(`#room_number`);

// Активация cтраницы Кексобукинга (форма и карта)
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

// Деактивация cтраницы Кексобукинга (форма и карта)
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

// The value is no lower min and is less than (but not equal to) max.
const getRandomInt = (min = 0, max = 100) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getMaxIndex = (array) => {
  return array.length - 1;
};

const minIndex = 0;

const shuffle = (elements) => {
  const shuffledElements = elements.slice();

  for (let i = shuffledElements.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffledElements[i], shuffledElements[j]] = [shuffledElements[j], shuffledElements[i]];
  }

  return shuffledElements;
};

const getRandomArray = (randomElements) => {
  const newArray = shuffle(randomElements.slice());

  return newArray.slice(0, getRandomInt(0, newArray.length));
};

const getTitleAndType = (titles, types) => {
  const elements = [];
  titles = POST_TITLES;
  types = TYPE_OF_HOUSES;

  for (let i = 0; i < titles.length; i++) {
    elements.push({title: titles[i], type: types[i]});
  }

  return elements;
};

const getlocationXY = () => {
  const locations = [];

  for (let i = 0; i < NUMBER_OF_OFFERS; i++) {
    const locationX = getRandomInt(STATIC_POINTS.x1, STATIC_POINTS.x2);
    const locationY = getRandomInt(STATIC_POINTS.y1, STATIC_POINTS.y2);
    locations.push({x: locationX, y: locationY});
  }

  return locations;
};

const generateOffers = (quantity = NUMBER_OF_OFFERS) => {
  const offers = [];

  for (let i = 0; i < quantity; i++) {
    const titleAndType = getTitleAndType()[getRandomInt(minIndex, getMaxIndex(getTitleAndType()))];
    const locationXY = getlocationXY()[getRandomInt(minIndex, getMaxIndex(getlocationXY()))];

    const generateOffer = () => {
      return {
        author: {
          avatar: `img/avatars/user0${getRandomInt(MIM_NUMBER_OF_USERS, NUMBER_OF_OFFERS)}.png`
        },
        offer: {
          title: titleAndType.title,
          address: `${locationXY.x}, ${locationXY.y}`,
          price: getRandomInt(PRICE_FROM, PRICE_TO),
          type: titleAndType.type,
          rooms: NUMBER_OF_ROOMS[getRandomInt(minIndex, getMaxIndex(NUMBER_OF_ROOMS))],
          guests: NUMBER_OF_GUESTS[getRandomInt(minIndex, getMaxIndex(NUMBER_OF_GUESTS))],
          checkin: CHECKINS[getRandomInt(minIndex, getMaxIndex(CHECKINS))],
          checkout: CHECKOUTS[getRandomInt(minIndex, getMaxIndex(CHECKOUTS))],
          features: getRandomArray(FEATURES),
          description: `Описание`,
          photos: getRandomArray(PHOTOS)
        },
        location: locationXY,
        value: i
      };
    };

    offers.push(generateOffer());
  }

  return offers;
};

const renderPin = (offer) => {
  const pinTemplate = document.querySelector(`#pin`).content;
  const pin = pinTemplate.cloneNode(true);
  const pinImage = pin.querySelector(`img`);
  const pinButton = pin.querySelector(`button`);
  pinButton.value = offer.value;
  pinButton.style = `left:${offer.location.x - XY_OFFSET.x}px;
                     top:${offer.location.y - XY_OFFSET.y}px;`;
  pinImage.src = `${offer.author.avatar}`;
  pinImage.alt = `${offer.offer.title}`;

  return pin;
};

const renderPins = (offers) => {
  const fragment = document.createDocumentFragment();

  offers.forEach((offer) => {
    fragment.appendChild(renderPin(offer));
  });

  pinBlock.appendChild(fragment);
};

// const renderOfferFeatures = (offerCard, features) => {
//   const offerFeatures = offerCard.querySelector(`.popup__features`);
//   offerFeatures.innerHTML = ``;

//   if (!features || features.length === 0) {
//     offerFeatures.classList.add(`hidden`);
//   }

//   const fragment = document.createDocumentFragment();

//   features.forEach((feature) => {
//     const featureItem = document.createElement(`li`);
//     featureItem.classList.add(`popup__feature`, `popup__feature--${feature}`);
//     fragment.appendChild(featureItem);
//   });

//   offerFeatures.appendChild(fragment);
// };

// const renderOfferPhotos = (offerCard, photos) => {
//   const offerPhotos = offerCard.querySelector(`.popup__photos`);
//   const offerPhoto = offerPhotos.querySelector(`img`);
//   offerPhotos.innerHTML = ``;

//   if (!photos || photos.length === 0) {
//     offerPhotos.classList.add(`hidden`);
//   }

//   const fragment = document.createDocumentFragment();

//   photos.forEach((photo) => {
//     const offerCardPhoto = offerPhoto.cloneNode();
//     offerCardPhoto.src = photo;
//     fragment.appendChild(offerCardPhoto);
//   });

//   return offerPhotos.appendChild(fragment);
// };

// const createOfferCard = (offer) => {
//   const cardTemplate = document.querySelector(`#card`).content;
//   const mapCard = cardTemplate.querySelector(`.map__card`);
//   const offerCard = mapCard.cloneNode(true);
//   const offerTitle = offerCard.querySelector(`.popup__title`);
//   const offerAddress = offerCard.querySelector(`.popup__text--address`);
//   const offerPrice = offerCard.querySelector(`.popup__text--price`);
//   const offerHouseType = offerCard.querySelector(`.popup__type`);
//   const offerRoomsAndGuests = offerCard.querySelector(`.popup__text--capacity`);
//   const offerTimes = offerCard.querySelector(`.popup__text--time`);
//   const offerDescription = offerCard.querySelector(`.popup__description`);
//   const offerAvatar = offerCard.querySelector(`.popup__avatar`);

//   offerTitle.textContent = offer.offer.title;
//   offerAddress.textContent = offer.offer.address;
//   offerPrice.textContent = `${offer.offer.price}₽/ночь`;
//   offerHouseType.textContent = offer.offer.type;
//   offerRoomsAndGuests.textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей.`;
//   offerTimes.textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}.`;
//   renderOfferFeatures(offerCard, offer.offer.features);
//   offerDescription.textContent = offer.offer.description;
//   renderOfferPhotos(offerCard, offer.offer.photos);
//   offerAvatar.src = `${offer.author.avatar}`;

//   pinBlock.append(offerCard);
// };

// Module4-task1

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

// Устанавливать цвет поля в случае неуспеха

const setUnsuccessColor = (field) => {
  field.style = `border-color: orange; box-shadow: 0 0 2px 2px orange;`;
};

// Устанавливать цвет поля в случае успеха

const setSuccessColor = (field) => {
  field.style = `border-color: #ffaa99; box-shadow: 0 0 2px 2px #ff6547;`;
};

// Валидация заголовка объявления

const validateTitleField = () => {
  const titleValue = adFormTitleField.value;

  if (titleValue.length >= FORM_TITLE_LENGTH.min && titleValue.length <= FORM_TITLE_LENGTH.max) {
    setSuccessColor(adFormTitleField);
    adFormTitleField.setCustomValidity(``);
  } else if (titleValue.length === 0) {
    setUnsuccessColor(adFormTitleField);
    adFormTitleField.setCustomValidity(`Пожалуйста, заполните это поле`);
  } else {
    setUnsuccessColor(adFormTitleField);
    adFormTitleField.setCustomValidity(`должно быть от ${FORM_TITLE_LENGTH.min} до ${FORM_TITLE_LENGTH.max} символов`);
  }
};

// Устанавливать адрес объявления

const setAddressField = (pointX, pointY) => {
  pointX = mapPinMain.offsetLeft + Math.round(mapPinMain.offsetWidth / 2);
  pointY = mapPinMain.offsetTop + mapPinMain.offsetHeight + HEIGHT_MAPPINMAIN_AFTER;
  adFormAddressField.value = `${pointX}, ${pointY}`;
};

// Устанавливать минимальную и максимальную цену по типу жилья

const setPriceByHouseType = (minPrice, maxPrice) => {
  minPrice = PRICE_BY_HOUSE_TYPE[adFormTypeField.value].min;
  maxPrice = PRICE_BY_HOUSE_TYPE[adFormTypeField.value].max;
  adFormPriceField.placeholder = minPrice;
  adFormPriceField.min = minPrice;
  adFormPriceField.max = maxPrice;
  return {
    min: minPrice,
    max: maxPrice
  };
};

// Валидация цены за ночь

const validatePriceField = (minValue, maxValue) => {
  minValue = setPriceByHouseType().min;
  maxValue = setPriceByHouseType().max;

  const priceValue = adFormPriceField.value;
  if (priceValue >= minValue && priceValue <= maxValue) {
    setSuccessColor(adFormPriceField);
    adFormPriceField.setCustomValidity(``);
  } else if (priceValue.length === 0) {
    setUnsuccessColor(adFormPriceField);
    adFormPriceField.setCustomValidity(`введите значение от ${minValue} до ${maxValue}`);
  } else if (priceValue > maxValue) {
    setUnsuccessColor(adFormPriceField);
    adFormPriceField.setCustomValidity(`Цена данной тип жилья максимум до ${maxValue} руб.`);
  } else {
    setUnsuccessColor(adFormPriceField);
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

  if (guestsValue !== 0 && roomsValue === 100) {
    target.setCustomValidity(`Не для гостей. Пожалуйста, выберите другой вариант.`);
  } else if (guestsValue === 0 && roomsValue !== 100) {
    target.setCustomValidity(`Для выбора (не для гостей). Пожалуйста, выберите максимальное количество комнат.`);
  } else if (guestsValue > roomsValue) {
    target.setCustomValidity(`Слишком много гостей для данного выбора комнат. Пожалуйста, выберите больше комнат.`);
  } else {
    target.setCustomValidity(``);
  }
};

// Валидация формы

const validateAdForm = () => {
  adFormTitleField.addEventListener(`input`, () => {
    validateTitleField();
  });

  adFormAddressField.addEventListener(`input`, () => {
    setAddressField();
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
    validateGuestsAndRooms(adFormRoomsField);
  });
};

deactivateBookingPage();
const offers = generateOffers();
setAddressField();
validateAdForm();

// renderPins(offers);
// createOfferCard(offers[0]);
