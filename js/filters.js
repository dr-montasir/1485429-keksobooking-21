'use strict';

(() => {
  const mapFilters = document.querySelector(`.map__filters`);
  const housingType = mapFilters.querySelector(`#housing-type`);
  const housingPrice = mapFilters.querySelector(`#housing-price`);
  const housingRooms = mapFilters.querySelector(`#housing-rooms`);
  const housingGuests = mapFilters.querySelector(`#housing-guests`);

  // сбросить фильтры
  const resetFilters = () => {
    return mapFilters.reset();
  };

  // фильтровать предложения (offers)
  // фильтровать по типу (жилья) предложения
  const filterByOfferType = (oneOffer) => {
    if (oneOffer.offer.type !== housingType.value) {
      return false;
    }

    return true;
  };

  // фильтровать по цене предложения
  const filterByOfferPrice = (oneOffer) => {
    // диапазон ценового фильтра
    const priceRange = window.constants.PRICE_RANGE_FILTER;

    let offerPriceRange = null;

    if (oneOffer.offer.price >= priceRange.middle.min && oneOffer.offer.price <= priceRange.middle.max) {
      offerPriceRange = `middle`;
    }

    if (oneOffer.offer.price >= priceRange.low.min && oneOffer.offer.price <= priceRange.low.max) {
      offerPriceRange = `low`;
    }

    if (oneOffer.offer.price >= priceRange.high.min && oneOffer.offer.price < priceRange.high.max) {
      offerPriceRange = `high`;
    }

    if (housingPrice.value === offerPriceRange) {
      return true;
    }

    return false;
  };

  // фильтровать по количеству комнат
  const filterByOfferRooms = (oneOffer) => {
    const rommsQuantity = window.constants.ROMS_QUANTITY_FILTER;

    let offerRommsQuantity = null;

    // if (oneOffer.offer.rooms === rommsQuantity.one) {
    //   offerRommsQuantity = `1`;
    // }

    // if (oneOffer.offer.rooms === rommsQuantity.two) {
    //   offerRommsQuantity = `2`;
    // }

    // if (oneOffer.offer.rooms === rommsQuantity.three) {
    //   offerRommsQuantity = `3`;
    // }

    for (let i = 0; i < rommsQuantity.length; i++) {
      if (oneOffer.offer.rooms === rommsQuantity[i]) {
        offerRommsQuantity = rommsQuantity[i].toString();
      }
    }

    if (housingRooms.value === offerRommsQuantity) {
      return true;
    }

    return false;
  };

  // фильтровать по количеству гостей
  const filterByOfferGuests = (oneOffer) => {
    const guestsQuantity = window.constants.GUESTS_QUANTITY_FILTER;

    let offerGuestsQuantity = null;

    for (let i = 0; i < guestsQuantity.length; i++) {
      if (oneOffer.offer.guests === guestsQuantity[i]) {
        offerGuestsQuantity = guestsQuantity[i].toString();
      }
    }

    if (housingGuests.value === offerGuestsQuantity) {
      return true;
    }

    return false;
  };

  // при изменении параметров фильтрации
  const onFiltersChange = (offers) => {
    let results = [];

    for (let i = 0; i < offers.length; i++) {
      let isOfferMatch = true;

      // проверка по типу (жилья) предложения
      if (housingType.value !== `any`) {
        isOfferMatch = filterByOfferType(offers[i]);
      }

      if (isOfferMatch === false) {
        continue;
      }

      // проверка по цене предложения
      if (housingPrice.value !== `any`) {
        isOfferMatch = filterByOfferPrice(offers[i]);

        if (isOfferMatch === false) {
          continue;
        }
      }

      // проверка по количеству комнат
      if (housingRooms.value !== `any`) {
        isOfferMatch = filterByOfferRooms(offers[i]);

        if (isOfferMatch === false) {
          continue;
        }
      }

      // проверка по количеству гостей
      if (housingGuests.value !== `any`) {
        isOfferMatch = filterByOfferGuests(offers[i]);

        if (isOfferMatch === false) {
          continue;
        }
      }

      // применяем все филтеры к offers[i]
      results.push(offers[i]);

      if (results.length >= window.constants.PINS_NUMBER) {
        break;
      }
    }

    return results;
  };

  mapFilters.addEventListener(`change`, () => {
    // почистить карту от пинов
    // закрыть карту если она открыта
    window.popup.removeCard();
    window.pin.renderPins(onFiltersChange(window.array));
  });

  window.filters = {
    resetFilters
  };
})();
