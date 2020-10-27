'use strict';

(() => {
  const adForm = document.querySelector(`.ad-form`);
  const adFormTitleField = adForm.querySelector(`#title`);
  const adFormAddressField = adForm.querySelector(`#address`);
  const adFormTypeField = adForm.querySelector(`#type`);
  const adFormPriceField = adForm.querySelector(`#price`);
  const adFormCheckinField = adForm.querySelector(`#timein`);
  const adFormCheckoutField = adForm.querySelector(`#timeout`);
  const adFormGuestsField = adForm.querySelector(`#capacity`);
  const adFormRoomsField = adForm.querySelector(`#room_number`);
  const mapPinMain = document.querySelector(`.map__pin--main`);

  // Устанавливать цвет поля в случае неуспеха
  const setUnsuccessColor = (field) => {
    field.style = `border-color: orange; box-shadow: 0 0 2px 2px orange;`;
  };

  // Устанавливать цвет поля в случае успеха
  const setSuccessColor = (field) => {
    field.style = `border-color: #ffaa99; box-shadow: 0 0 2px 2px #ff6547;`;
  };

  // Валидация заголовка объявления
  const validateTitleField = () => {
    const titleValue = adFormTitleField.value;

    if (titleValue.length >= window.consts.FORM_TITLE_LENGTH.min && titleValue.length <= window.consts.FORM_TITLE_LENGTH.max) {
      setSuccessColor(adFormTitleField);
      adFormTitleField.setCustomValidity(``);
    } else if (titleValue.length === 0) {
      setUnsuccessColor(adFormTitleField);
      adFormTitleField.setCustomValidity(`Пожалуйста, заполните это поле`);
    } else {
      setUnsuccessColor(adFormTitleField);
      adFormTitleField.setCustomValidity(`должно быть от ${window.consts.FORM_TITLE_LENGTH.min} до ${window.consts.FORM_TITLE_LENGTH.max} символов`);
    }
  };

  // Устанавливать адрес объявления
  const setAddressField = (pointX, pointY) => {
    pointX = mapPinMain.offsetLeft + window.map.halfMainPin.width - window.map.shiftRightPinImg;

    pointY = mapPinMain.offsetTop + window.map.halfMainPin.height;

    adFormAddressField.value = `${pointX}, ${pointY}`;
  };

  // Устанавливать минимальную и максимальную цену по типу жилья
  const setPriceByHouseType = (minPrice, maxPrice) => {
    minPrice = window.consts.PRICE_BY_HOUSE_TYPE[adFormTypeField.value].min;
    maxPrice = window.consts.PRICE_BY_HOUSE_TYPE[adFormTypeField.value].max;
    adFormPriceField.placeholder = minPrice;
    adFormPriceField.min = minPrice;
    adFormPriceField.max = maxPrice;
    return {
      min: minPrice,
      max: maxPrice
    };
  };

  // Валидация цены за ночь
  const validatePriceField = (minValue, maxValue) => {
    minValue = setPriceByHouseType().min;
    maxValue = setPriceByHouseType().max;

    const priceValue = adFormPriceField.value;
    if (priceValue >= minValue && priceValue <= maxValue) {
      setSuccessColor(adFormPriceField);
      adFormPriceField.setCustomValidity(``);
    } else if (priceValue.length === 0) {
      setUnsuccessColor(adFormPriceField);
      adFormPriceField.setCustomValidity(`введите значение от ${minValue} до ${maxValue}`);
    } else if (priceValue > maxValue) {
      setUnsuccessColor(adFormPriceField);
      adFormPriceField.setCustomValidity(`Цена данной тип жилья максимум до ${maxValue} руб.`);
    } else {
      setUnsuccessColor(adFormPriceField);
      adFormPriceField.setCustomValidity(`введите значение от ${minValue} до ${maxValue}`);
    }
  };

  // Валидация Time CheckIn
  const validateTimeCheckIn = () => {
    adFormCheckoutField.value = adFormCheckinField.value;
  };

  // Валидация Time CheckOut
  const validateTimeCheckOut = () => {
    adFormCheckinField.value = adFormCheckoutField.value;
  };

  // Валидация Guests And Rooms
  const validateGuestsAndRooms = (target) => {
    const guestsValue = Number(adFormGuestsField.value);
    const roomsValue = Number(adFormRoomsField.value);

    if (guestsValue !== 0 && roomsValue === 100) {
      target.setCustomValidity(`Не для гостей. Пожалуйста, выберите другой вариант.`);
    } else if (guestsValue === 0 && roomsValue !== 100) {
      target.setCustomValidity(`Для выбора (не для гостей). Пожалуйста, выберите максимальное количество комнат.`);
    } else if (guestsValue > roomsValue) {
      target.setCustomValidity(`Слишком много гостей для данного выбора комнат. Пожалуйста, выберите больше комнат.`);
    } else {
      target.setCustomValidity(``);
    }
  };

  // Валидация формы
  const validateAdForm = () => {
    adFormTitleField.addEventListener(`input`, () => {
      validateTitleField();
    });

    adFormTypeField.addEventListener(`input`, () => {
      setPriceByHouseType();
    });

    adFormPriceField.addEventListener(`input`, () => {
      validatePriceField();
    });

    adFormCheckinField.addEventListener(`change`, () => {
      validateTimeCheckIn();
    });

    adFormCheckoutField.addEventListener(`change`, () => {
      validateTimeCheckOut();
    });

    adFormGuestsField.addEventListener(`change`, () => {
      validateGuestsAndRooms(adFormGuestsField);
    });

    adFormRoomsField.addEventListener(`change`, () => {
      validateGuestsAndRooms(adFormRoomsField);
    });
  };

  window.form = {
    setUnsuccessColor,
    setSuccessColor,
    validateTitleField,
    setAddressField,
    setPriceByHouseType,
    validatePriceField,
    validateTimeCheckIn,
    validateTimeCheckOut,
    validateGuestsAndRooms,
    validateAdForm,
    adFormAddressField
  };
})();
