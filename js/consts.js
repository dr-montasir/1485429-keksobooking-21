'use strict';

(() => {
  const NUMBER_OF_OFFERS = 8;
  const MIM_NUMBER_OF_USERS = 1;
  const PRICE_FROM = 0;
  const PRICE_TO = 20000;
  const NUMBER_OF_ROOMS = [1, 2, 3, 100];
  const NUMBER_OF_GUESTS = [3, 2, 1, 0];
  const CHECKINS = [`12:00`, `13:00`, `14:00`];
  const CHECKOUTS = [`12:00`, `13:00`, `14:00`];
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
  const STATIC_POINTS = Object.freeze({x1: 0, x2: 1200, y1: 130, y2: 630});
  const XY_OFFSET = Object.freeze({x: 25, y: 50});
  const FORM_TITLE_LENGTH = Object.freeze({min: 30, max: 100});
  const HOUSES = [
    {type: `Дворец`, title: `Великолепный дворец`},
    {type: `Квартира`, title: `Квартира известного писателя Харуки Мураками`},
    {type: `Дом`, title: `Дом известного писателя Дзюнъитиро Танидзаки`},
    {type: `Бунгало`, title: `Бунгало, все необходимое и подарки`}
  ];
  const PRICE_BY_HOUSE_TYPE = {
    bungalo: {min: 0, max: 500},
    flat: {min: 1000, max: 2000},
    house: {min: 5000, max: 10000},
    palace: {min: 10000, max: 20000}
  };
  // 65 / 2 = 32.5 px
  const HALF_WIDTH_MAPPINMAIN = 32;
  const HEIGHT_MAPPINMAIN_AFTER = 22;

  window.consts = {
    NUMBER_OF_OFFERS,
    MIM_NUMBER_OF_USERS,
    PRICE_FROM,
    PRICE_TO,
    NUMBER_OF_ROOMS,
    NUMBER_OF_GUESTS,
    CHECKINS,
    CHECKOUTS,
    FEATURES,
    PHOTOS,
    STATIC_POINTS,
    XY_OFFSET,
    FORM_TITLE_LENGTH,
    HOUSES,
    PRICE_BY_HOUSE_TYPE,
    HALF_WIDTH_MAPPINMAIN,
    HEIGHT_MAPPINMAIN_AFTER
  };
})();
