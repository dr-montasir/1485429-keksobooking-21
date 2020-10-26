'use strict';

(() => {
  const generateOffers = (quantity = window.consts.NUMBER_OF_OFFERS) => {
    const offers = [];

    for (let i = 0; i < quantity; i++) {
      const house = window.consts.HOUSES[window.utils.getRandomInt(window.utils.minIndex, window.utils.getMaxIndex(window.consts.HOUSES))];
      const locationXY = window.map.getlocationXY()[window.utils.getRandomInt(window.utils.minIndex, window.utils.getMaxIndex(window.map.getlocationXY()))];

      const generateOffer = () => {
        return {
          author: {
            avatar: `img/avatars/user0${window.utils.getRandomInt(window.consts.MIM_NUMBER_OF_USERS, window.consts.NUMBER_OF_OFFERS)}.png`
          },
          offer: {
            title: house.title,
            address: `${locationXY.x}, ${locationXY.y}`,
            price: window.utils.getRandomInt(window.consts.PRICE_FROM, window.consts.PRICE_TO),
            type: house.type,
            rooms: window.consts.NUMBER_OF_ROOMS[window.utils.getRandomInt(window.utils.minIndex, window.utils.getMaxIndex(window.consts.NUMBER_OF_ROOMS))],
            guests: window.consts.NUMBER_OF_GUESTS[window.utils.getRandomInt(window.utils.minIndex, window.utils.getMaxIndex(window.consts.NUMBER_OF_GUESTS))],
            checkin: window.consts.CHECKINS[window.utils.getRandomInt(window.utils.minIndex, window.utils.getMaxIndex(window.consts.CHECKINS))],
            checkout: window.consts.CHECKOUTS[window.utils.getRandomInt(window.utils.minIndex, window.utils.getMaxIndex(window.consts.CHECKOUTS))],
            features: window.utils.getRandomArray(window.consts.FEATURES),
            description: `Описание`,
            photos: window.utils.getRandomArray(window.consts.PHOTOS)
          },
          location: locationXY
        };
      };

      offers.push(generateOffer());
    }

    return offers;
  };

  window.data = {generateOffers};
})();
