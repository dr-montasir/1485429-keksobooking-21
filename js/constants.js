'use strict';

(() => {
  const XY_OFFSET = Object.freeze({x: 25, y: 50});
  const FORM_TITLE_LENGTH = Object.freeze({min: 30, max: 100});
  const PRICE_BY_HOUSE_TYPE = {
    bungalo: {min: 0, max: 1000000},
    flat: {min: 1000, max: 1000000},
    house: {min: 5000, max: 1000000},
    palace: {min: 10000, max: 1000000}
  };
  const HIGHT_MAINPIN_TAIL = 15;

  window.constants = {
    XY_OFFSET,
    FORM_TITLE_LENGTH,
    PRICE_BY_HOUSE_TYPE,
    HIGHT_MAINPIN_TAIL
  };
})();
