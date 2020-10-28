'use strict';

(() => {
  const NUMBER_OF_OFFERS = 8;
  const STATIC_POINTS = Object.freeze({x1: 0, x2: 1200, y1: 130, y2: 630});
  const XY_OFFSET = Object.freeze({x: 25, y: 50});
  const FORM_TITLE_LENGTH = Object.freeze({min: 30, max: 100});
  const PRICE_BY_HOUSE_TYPE = {
    bungalo: {min: 0, max: 500},
    flat: {min: 1000, max: 2000},
    house: {min: 5000, max: 10000},
    palace: {min: 10000, max: 20000}
  };
  const HIGHT_MAINPIN_TAIL = 15;

  window.consts = {
    NUMBER_OF_OFFERS,
    STATIC_POINTS,
    XY_OFFSET,
    FORM_TITLE_LENGTH,
    PRICE_BY_HOUSE_TYPE,
    HIGHT_MAINPIN_TAIL
  };
})();
