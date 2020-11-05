'use strict';

(() => {
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
  const PRICE_RANGE_FILTER = {
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
  // const ROMS_QUANTITY_FILTER  = {
  //   one: 1,
  //   two: 2,
  //   three: 3
  // };
  const ROMS_QUANTITY_FILTER = [1, 2, 3];
  const HIGHT_MAINPIN_TAIL = 15;
  const PINS_NUMBER = 5;

  window.constants = {
    XY_OFFSET,
    FORM_TITLE_LENGTH,
    PRICE_BY_HOUSE_TYPE,
    OFFER_TYPE_VALUE,
    HIGHT_MAINPIN_TAIL,
    PINS_NUMBER,
    PRICE_RANGE_FILTER,
    ROMS_QUANTITY_FILTER
  };
})();
