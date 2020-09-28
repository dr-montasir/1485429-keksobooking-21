'use strict';

const NUMBER_OF_MOCKS = 8;
// const MIN_NUMBER_OF_USERS = 1;

// The value is no lower min and is less than (but not equal to) max.
const getRandomInt = (min = 0, max = 100) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

getRandomInt();

const createMock = (quantity = NUMBER_OF_MOCKS) => {
  const mocksArray = [];

  for (let i = 0; i < quantity; i++) {
    mocksArray.push({
      author: {
        avatar: ``
      },
      offer: {
        title: ``,
        address: ``,
        price: ``,
        type: ``,
        rooms: ``,
        guests: ``,
        checkin: ``,
        checkout: ``,
        features: ``,
        description: ``,
        photos: ``
      },
      location: {
        x: ``,
        y: ``
      }
    });
  }

  return mocksArray;
};

createMock();

const mapClass = document.querySelector(`.map`);
mapClass.classList.remove(`map--faded`);
