'use strict';

const NUMBER_OF_OFFERS = 8;
const MIM_NUMBER_OF_USERS = 1;
const POST_TITLES = [`Дворец`, `Квартира`, `Дом`, `Бунгало`];
const PRICE_FROM = 500;
const PRICE_TO = 10000;
const TYPE_OF_HOUSE = [`palace`, `flat`, `house`, `bungalow`];
const NUMBER_OF_ROOMS = [1, 2, 3, 100];
const NUMBER_OF_GUESTS = [3, 2, 1, 0];
const CHECKIN = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];
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

const mapBlock = document.querySelector(`.map`);
mapBlock.classList.remove(`map--faded`);
const pinBlock = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content;
const fragment = document.createDocumentFragment();

const cardTemplate = document.querySelector(`#card`).content;
const mapCard = cardTemplate.querySelector(`.map__card`);
const offerCard = mapCard.cloneNode(true);
const offerTitle = offerCard.querySelector(`.popup__title`);
const offerAddress = offerCard.querySelector(`.popup__text--address`);
const offerPrice = offerCard.querySelector(`.popup__text--price`);
const offerHouseType = offerCard.querySelector(`.popup__type`);
const offerRoomsAndGuests = offerCard.querySelector(`.popup__text--capacity`);
const offerTimes = offerCard.querySelector(`.popup__text--time`);
const offerFeatures = offerCard.querySelector(`.popup__feature`);
const offerDescription = offerCard.querySelector(`.popup__description`);
const offerPhotos = offerCard.querySelector(`.popup__photos`);
const offerPhoto = offerPhotos.querySelector(`img`);
const offerAvatar = offerCard.querySelector(`.popup__avatar`);

// The value is no lower min and is less than (but not equal to) max.
const getRandomInt = (min = 0, max = 100) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getMaxIndex = (arr) => {
  return arr.length - 1;
};

const minIndex = 0;

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

const getRandomArray = (arr) => {
  const newArray = arr.slice();
  shuffle(newArray);

  return newArray.slice(0, getRandomInt(1, newArray.length));
};

const getTitleAndType = (arr1, arr2) => {
  const arr = [];
  arr1 = POST_TITLES;
  arr2 = TYPE_OF_HOUSE;

  for (let i = 0; i < arr1.length; i++) {
    arr.push({title: arr1[i], type: arr2[i]});
  }

  return arr;
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
          checkin: CHECKIN[getRandomInt(minIndex, getMaxIndex(CHECKIN))],
          checkout: CHECKOUT[getRandomInt(minIndex, getMaxIndex(CHECKOUT))],
          features: getRandomArray(FEATURES),
          description: `Описание`,
          photos: getRandomArray(PHOTOS)
        },
        location: locationXY
      };
    };

    offers.push(generateOffer());
  }

  return offers;
};

const renderPins = () => {
  const offers = generateOffers();

  for (let i = 0; i < offers.length; i++) {
    const pin = pinTemplate.cloneNode(true);
    const pinImage = pin.querySelector(`img`);
    const pinButton = pin.querySelector(`button`);
    pinButton.style = `left:${offers[i].location.x - XY_OFFSET.x}px;
                       top:${offers[i].location.y - XY_OFFSET.y}px;`;
    pinImage.src = `${offers[i].author.avatar}`;
    pinImage.alt = `${offers[i].offer.title}`;
    fragment.appendChild(pin);
  }

  return fragment;
};

pinBlock.appendChild(renderPins());

const renderOfferPhotos = (photos) => {
  offerPhotos.innerHTML = ``;

  if (!photos || photos.length === 0) {
    offerPhotos.hidden = true;
  }

  photos.forEach((photo) => {
    let offerCardPhoto = offerPhoto.cloneNode();
    offerCardPhoto.src = photo;
    fragment.appendChild(offerCardPhoto);
  });

  return offerPhotos.appendChild(fragment);
};

const createOfferCard = (index = 0) => {
  offerTitle.textContent = generateOffers()[index].offer.title;
  offerAddress.textContent = generateOffers()[index].offer.address;
  offerPrice.textContent = `${generateOffers()[index].offer.price}₽/ночь`;
  offerHouseType.textContent = generateOffers()[index].offer.type;
  offerRoomsAndGuests.textContent = `${generateOffers()[index].offer.rooms} комнаты для ${generateOffers()[index].offer.guests} гостей.`;
  offerTimes.textContent = `Заезд после ${generateOffers()[index].offer.checkin}, выезд до ${generateOffers()[index].offer.checkout}.`;
  offerFeatures.classList = `popup__feature popup__feature--${generateOffers()[index].offer.features[0]}`;
  offerDescription.textContent = generateOffers()[index].offer.description;
  offerPhotos.src = `${generateOffers()[index].offer.photos[0]}`;
  renderOfferPhotos(generateOffers()[index].offer.photos);
  offerAvatar.src = `${generateOffers()[index].author.avatar}`;

  return offerCard;
};

fragment.append(createOfferCard());
pinBlock.append(fragment);
