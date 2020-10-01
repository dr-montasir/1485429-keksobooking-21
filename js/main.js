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
const START_POINT_X = 0;
const END_POINT_X = 1200;
const START_POINT_Y = 130;
const END_POINT_Y = 630;
const X_OFFSET = 25;
const Y_OFFSET = 50;

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
    const locationX = getRandomInt(START_POINT_X, END_POINT_X);
    const locationY = getRandomInt(START_POINT_Y, END_POINT_Y);
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

const mapBlock = document.querySelector(`.map`);
mapBlock.classList.remove(`map--faded`);

const pinBlock = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content;

const renderPins = () => {
  const offers = generateOffers();

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < offers.length; i++) {
    const pin = pinTemplate.cloneNode(true);
    const pinImage = pin.querySelector(`img`);
    const pinButton = pin.querySelector(`button`);
    pinButton.style = `left:${offers[i].location.x - X_OFFSET}px;
                       top:${offers[i].location.y - Y_OFFSET}px;`;
    pinImage.src = `${offers[i].author.avatar}`;
    pinImage.alt = `${offers[i].offer.title}`;
    fragment.appendChild(pin);
  }

  return fragment;
};

pinBlock.appendChild(renderPins());
