'use strict';

const NUMBER_OF_POSTS = 8;
const MIM_NUMBER_OF_USERS = 1;
// const POST_TITLES = [
//   `Дворец`,
//   `Квартира`,
//   `Дом`,
//   `Бунгало`
// ];
const STATIC_POINT_X = 600;
const STATIC_POINT_Y = 350;
const PRICE_FROM = 500;
const PRICE_TO = 10000;
const NOT_FOR_GUESTS = 0;
const NUMBER_OF_GUESTS = 4;

// The value is no lower min and is less than (but not equal to) max.
const getRandomInt = (min = 0, max = 100) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
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

const createPost = (quantity = NUMBER_OF_POSTS) => {
  const postsArray = [];

  for (let i = 0; i < quantity; i++) {
    postsArray.push({
      author: {
        avatar: `img/avatars/user0${getRandomInt(MIM_NUMBER_OF_USERS, NUMBER_OF_POSTS)}.png`
      },
      offer: {
        title: ``,
        address: ``,
        price: getRandomInt(PRICE_FROM, PRICE_TO),
        type: ``,
        rooms: ``,
        guests: getRandomInt(NOT_FOR_GUESTS, NUMBER_OF_GUESTS),
        checkin: ``,
        checkout: ``,
        features: ``,
        description: ``,
        photos: ``
      },
      location: {
        x: getLocationX(),
        y: getLocationY()
      }
    });
  }

  return postsArray;
};

createPost();

const mapClass = document.querySelector(`.map`);
mapClass.classList.remove(`map--faded`);
