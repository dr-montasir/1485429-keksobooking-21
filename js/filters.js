'use strict';

(() => {
  const mapFilters = document.querySelector(`.map__filters`);
  // const mapFilter = mapFilters.querySelectorAll(`.map__filter`);
  const housingType = mapFilters.querySelector(`#housing-type`);
  // const housingPrice = mapFilters.querySelector(`#housing-price`);

  // Фильтровать предложения (offers)
  // фильтр по типу (жилья) предложения
  const filterByOfferType = (oneOffer) => {
    if (oneOffer.offer.type !== housingType.value) {
      return false;
    }

    return true;
  };

  // Фильтр по цене предложения
  // const filterByOfferPrice

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
