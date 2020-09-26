'use strict';

// const NUMBER_OF_MOCKS = 8;

// The value is no lower min and is less than (but not equal to) max.
const getRandomInt = (min = 0, max = 100) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

getRandomInt();

// const createMock = () => ({

// });
