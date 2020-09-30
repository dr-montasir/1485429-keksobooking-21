'use strict';

const NUMBER_OF_OFFERS = 8;
const MIM_NUMBER_OF_USERS = 1;
const POST_TITLES = [`Дворец`, `Квартира`, `Дом`, `Бунгало`];
const STATIC_POINT_X = 570;
const STATIC_POINT_Y = 375;
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
    const locationX = getRandomInt(-5, 3) * getRandomInt() + STATIC_POINT_X;
    const locationY = getRandomInt(-3, 2) * getRandomInt() + STATIC_POINT_Y;
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
          features: FEATURES[getRandomInt(minIndex, getMaxIndex(FEATURES))],
          description: `Описание`,
          photos: PHOTOS[getRandomInt(minIndex, getMaxIndex(PHOTOS))]
        },
        location: locationXY
      };
    };

    offers.push(generateOffer());
  }

  return offers;
};

const mapBlock = document.querySelector(`.map`);
mapBlock.classList.remove(`map--faded`);

const pinBlock = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content;
const pin = document.querySelector(`.map__pin`);

const getXaxisOffset = () => {
  return pin.offsetWidth / 2;
};

const getYaxisOffset = () => {
  return pin.offsetHeight;
};

const renderPins = () => {
  const offers = generateOffers();
  const xOffset = getXaxisOffset();
  const yOffset = getYaxisOffset();

  for (let i = 0; i < offers.length; i++) {
    const createPin = pinTemplate.cloneNode(true);
    const createPinImage = createPin.querySelector(`img`);
    const createPinButton = createPin.querySelector(`button`);
    createPinButton.style = `left:${offers[i].location.x + xOffset}px;
                            top:${offers[i].location.y + yOffset}px;`;
    createPinImage.src = `${offers[i].author.avatar}`;
    createPinImage.alt = `${offers[i].offer.title}`;
    pinBlock.appendChild(createPin);
  }
};

renderPins();
