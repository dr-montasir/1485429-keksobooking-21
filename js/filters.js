'use strict';

(() => {
  // диапазон ценового фильтра
  const PRICE_RANGE = {
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

  const mapFilters = document.querySelector(`.map__filters`);
  const housingType = mapFilters.querySelector(`#housing-type`);
  const housingPrice = mapFilters.querySelector(`#housing-price`);
  const housingRooms = mapFilters.querySelector(`#housing-rooms`);
  const housingGuests = mapFilters.querySelector(`#housing-guests`);
  const housingFeatures = Array.from(mapFilters.querySelectorAll(`.map__checkbox`));

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
    let offerPriceRange = null;

    if (oneOffer.offer.price >= PRICE_RANGE.middle.min && oneOffer.offer.price <= PRICE_RANGE.middle.max) {
      offerPriceRange = `middle`;
    }

    if (oneOffer.offer.price >= PRICE_RANGE.low.min && oneOffer.offer.price <= PRICE_RANGE.low.max) {
      offerPriceRange = `low`;
    }

    if (oneOffer.offer.price >= PRICE_RANGE.high.min && oneOffer.offer.price < PRICE_RANGE.high.max) {
      offerPriceRange = `high`;
    }

    if (housingPrice.value === offerPriceRange) {
      return true;
    }

    return false;
  };

  // фильтровать по количеству комнат
  const filterByOfferRooms = (oneOffer) => {
    if (housingRooms.value === oneOffer.offer.rooms.toString()) {
      return true;
    }

    return false;
  };

  // фильтровать по количеству гостей
  const filterByOfferGuests = (oneOffer) => {
    if (housingGuests.value === oneOffer.offer.guests.toString()) {
      return true;
    }

    return false;
  };

  // фильтровать по удобствам предложения
  const filterByOfferFeatures = (oneOffer) => {
    const filterSelectedFeatures = housingFeatures.filter((item) => {
      return item.checked;
    });

    if (filterSelectedFeatures.length > 0) {
      const offerFeatures = oneOffer.offer.features;
      return filterSelectedFeatures.every((item) => {
        return offerFeatures.indexOf(item.value) !== -1;
      });
    }

    return true;
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

      // проверка по удобствам предложения
      isOfferMatch = filterByOfferFeatures(offers[i]);

      if (isOfferMatch === false) {
        continue;
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
    // устранить дребезг (debounce)
    window.debounce(window.pin.renderPins(onFiltersChange(window.array)));
  });

  window.filters = {
    resetFilters
  };
})();
