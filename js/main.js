'use strict';

const NUMBER_OF_POSTS = 8;
const MIM_NUMBER_OF_USERS = 1;
const POST_TITLES = [`Дворец`, `Квартира`, `Дом`, `Бунгало`];
const STATIC_POINT_X = 600;
const STATIC_POINT_Y = 350;
const PRICE_FROM = 500;
const PRICE_TO = 10000;
const TYPE_OF_HOUSE = [`palace`, `flat`, `house`, `bungalow`];
const NUMBER_OF_ROOMS = [1, 2, 3, 100];
const NUMBER_OF_GUESTS = 3;
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
  const maxIndex = arr.length - 1;

  return maxIndex;
};

const minIndex = 0;

const getTitleAndType = (arr1, arr2) => {
  const arr = [];
  arr1 = POST_TITLES;
  arr2 = TYPE_OF_HOUSE;

  for (let i = 0; i < 4; i++) {
    arr.push({title: arr1[i], type: arr2[i]});
  }

  return arr;
};

const getLocationX = (x) => {
  const realNumber = getRandomInt(-6, 6) * getRandomInt();
  x = STATIC_POINT_X;
  const LOCATION_X = x + realNumber;

  return LOCATION_X;
};

const getLocationY = (y) => {
  const realNumber = getRandomInt(-3, 3) * getRandomInt();
  y = STATIC_POINT_Y;
  const LOCATION_Y = y + realNumber;

  return LOCATION_Y;
};

const locationXY = {x: getLocationX(), y: getLocationY()};

const createNumberOfGuests = (quantity = NUMBER_OF_GUESTS) => {
  const arr = [];

  for (let i = quantity; i >= 0; i--) {
    arr.push(i);
  }

  return arr;
};

const notForGuests = createNumberOfGuests().slice(-1).pop();
const guestsQuantity = getMaxIndex(createNumberOfGuests());

const createPost = (quantity = NUMBER_OF_POSTS) => {
  const postsArray = [];

  for (let i = 0; i < quantity; i++) {
    const titleAndType = getTitleAndType()[getRandomInt(minIndex, getMaxIndex(getTitleAndType()))];

    postsArray.push({
      author: {
        avatar: `img/avatars/user0${getRandomInt(MIM_NUMBER_OF_USERS, NUMBER_OF_POSTS)}.png`
      },
      offer: {
        title: titleAndType.title,
        address: `${locationXY.x}, ${locationXY.y}`,
        price: getRandomInt(PRICE_FROM, PRICE_TO),
        type: titleAndType.type,
        rooms: NUMBER_OF_ROOMS[getRandomInt(minIndex, getMaxIndex(NUMBER_OF_ROOMS))],
        guests: getRandomInt(notForGuests, guestsQuantity),
        checkin: CHECKIN[getRandomInt(minIndex, getMaxIndex(CHECKIN))],
        checkout: CHECKOUT[getRandomInt(minIndex, getMaxIndex(CHECKOUT))],
        features: FEATURES[getRandomInt(minIndex, getMaxIndex(FEATURES))],
        description: `Описание`,
        photos: PHOTOS[getRandomInt(minIndex, getMaxIndex(PHOTOS))]
      },
      location: locationXY
    });
  }

  return postsArray;
};

createPost();

const mapClass = document.querySelector(`.map`);
mapClass.classList.remove(`map--faded`);
