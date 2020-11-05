'use strict';

(() => {
  const mapFilters = document.querySelector(`.map__filters`);
  const housingType = mapFilters.querySelector(`#housing-type`);
  const housingPrice = mapFilters.querySelector(`#housing-price`);

  // сбросить фильтры
  const resetFilters = () => {
    return mapFilters.reset();
  };

  // Фильтровать предложения (offers)
  // фильтр по типу (жилья) предложения
  const filterByOfferType = (oneOffer) => {
    if (oneOffer.offer.type !== housingType.value) {
      return false;
    }

    return true;
  };

  // Фильтр по цене предложения
  const filterByOfferPrice = (oneOffer) => {
    // Диапазон ценового фильтра
    const priceRange = window.constants.PRICE_FILTER_RANGE;

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
