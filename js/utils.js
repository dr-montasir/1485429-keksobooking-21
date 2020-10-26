'use strict';

(() => {
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

  window.utils = {
    getRandomInt,
    getMaxIndex,
    minIndex,
    shuffle,
    getRandomArray
  };
})();
