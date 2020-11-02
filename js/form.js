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
  // const setUnsuccessColor = (field) => {
  //   field.style = `border-color: red; box-shadow: 0 0 2px 2px red;`;
  // };

  // // Устанавливать цвет поля в случае успеха
  // const setSuccessColor = (field) => {
  //   field.style = `border-color: none; box-shadow: none`;
  // };

  // Валидация заголовка объявления
  const validateTitleField = () => {
    const titleValue = adFormTitleField.value;

    if (titleValue.length >= window.constants.FORM_TITLE_LENGTH.min && titleValue.length <= window.constants.FORM_TITLE_LENGTH.max) {
      // setSuccessColor(adFormTitleField);
      adFormTitleField.setCustomValidity(``);
    } else if (titleValue.length === 0) {
      // setUnsuccessColor(adFormTitleField);
      adFormTitleField.setCustomValidity(`Пожалуйста, заполните это поле`);
    } else {
      // setUnsuccessColor(adFormTitleField);
      adFormTitleField.setCustomValidity(`должно быть от ${window.constants.FORM_TITLE_LENGTH.min} до ${window.constants.FORM_TITLE_LENGTH.max} символов`);
    }
  };

  // Устанавливать адрес объявления
  const setAddressField = () => {
    const pointX = mapPinMain.offsetLeft + window.map.halfMainPin.width - window.map.shiftRightPinImg;

    const pointY = mapPinMain.offsetTop + window.map.halfMainPin.height;

    adFormAddressField.value = `${pointX}, ${pointY}`;
  };

  // Устанавливать минимальную и максимальную цену по типу жилья
  const setPriceByHouseType = (minPrice, maxPrice) => {
    minPrice = window.constants.PRICE_BY_HOUSE_TYPE[adFormTypeField.value].min;
    maxPrice = window.constants.PRICE_BY_HOUSE_TYPE[adFormTypeField.value].max;
    adFormPriceField.placeholder = minPrice;
    adFormPriceField.min = minPrice;
    adFormPriceField.max = maxPrice;
    return {
      min: minPrice,
      max: maxPrice
    };
  };

  // установить минимальное значение поля (price field), когда поле пустое
  adFormPriceField.min = setPriceByHouseType().min;

  // Валидация цены за ночь
  const validatePriceField = (minValue, maxValue) => {
    minValue = setPriceByHouseType().min;
    maxValue = setPriceByHouseType().max;

    const priceValue = adFormPriceField.value;
    if (priceValue >= minValue && priceValue <= maxValue) {
      // setSuccessColor(adFormPriceField);
      adFormPriceField.setCustomValidity(``);
    } else if (priceValue.length === 0) {
      // setUnsuccessColor(adFormPriceField);
      adFormPriceField.setCustomValidity(`введите значение от ${minValue} до ${maxValue}`);
    } else if (priceValue > maxValue) {
      // setUnsuccessColor(adFormPriceField);
      adFormPriceField.setCustomValidity(`Цена данной тип жилья максимум до ${maxValue} руб.`);
    } else {
      // setUnsuccessColor(adFormPriceField);
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

    target.setCustomValidity(``);

    if (guestsValue !== 0 && roomsValue === 100) {
      target.setCustomValidity(`Не для гостей. Пожалуйста, выберите другой вариант.`);
    }

    if (guestsValue === 0 && roomsValue !== 100) {
      target.setCustomValidity(`Для выбора (не для гостей). Пожалуйста, выберите максимальное количество комнат.`);
    }

    if (guestsValue > roomsValue) {
      target.setCustomValidity(`Слишком много гостей для данного выбора комнат. Пожалуйста, выберите больше комнат.`);
    }
  };

  // Валидация формы

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
    validateGuestsAndRooms(adFormGuestsField);
  });

  // отправка формы
  const submitAdForm = (evt) => {
    evt.preventDefault();

    const onSuccessDialog = window.dialog.onSuccessUploadDialog;
    const onErrorDialog = window.dialog.onErrorUploadDialog;

    window.load.uploadData(new FormData(adForm), onSuccessDialog, onErrorDialog);
  };

  adForm.addEventListener(`submit`, submitAdForm);

  // Сбросить форму
  // Техническое задание
  // 2.8. Нажатие на кнопку .ad-form__reset сбрасывает страницу в исходное неактивное состояние без перезагрузки, а также:
  // все заполненные поля возвращаются в изначальное состояние, в том числе фильтры;
  // метки похожих объявлений и карточка активного объявления удаляются;
  // метка адреса возвращается в исходное положение;
  // значение поля адреса корректируется соответственно положению метки;
  const resetAdForm = () => {
    // при вызове функции window.main.deactivateBookingPage(),
    // помимо сбрасывания страницы в исходное неактивное состояние,
    // так же удаляется карточку объявления.
    // Следовательно, нет необходимости вызывать функцию window.popup.removeCard().

    adForm.reset();
    // document.querySelector(`.ad-form`).reset();
    window.main.deactivateBookingPage();
  };

  adForm.addEventListener(`reset`, resetAdForm);

  window.form = {
    setAddressField,
    adFormAddressField,
    resetAdForm
  };
})();
