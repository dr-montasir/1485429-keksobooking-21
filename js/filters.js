'use strict';

(() => {
  const mapFilters = document.querySelector(`.map__filters`);
  // const mapFilter = mapFilters.querySelectorAll(`.map__filter`);
  const housingType = mapFilters.querySelector(`#housing-type`);
  // const housingPrice = mapFilters.querySelector(`#housing-price`);

  // Диапазон ценового фильтра
  let priceRange = window.constants.PRICE_FILTER_RANGE;

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
    if (oneOffer.offer.price >= priceRange.any.min && oneOffer.offer.price <= priceRange.any.max) {
      return `any`;
    }

    if (oneOffer.offer.price >= priceRange.middle.min && oneOffer.offer.price <= priceRange.middle.max) {
      return `middle`;
    }

    if (oneOffer.offer.price >= priceRange.low.min && oneOffer.offer.price <= priceRange.low.max) {
      return `low`;
    }

    if (oneOffer.offer.price >= priceRange.high.min && oneOffer.offer.price <= priceRange.high.max) {
      return `high`;
    }

    return false;
  };

  filterByOfferPrice();

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
      // if (housingPrice.value !== `any`) {

      // }

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
})();
