'use strict';

(() => {
  const mapBlock = document.querySelector(`.map`);
  const mapPinMain = document.querySelector(`.map__pin--main`);

  const formFilters = document.querySelector(`.map__filters`);
  const allFiltersSelect = formFilters.querySelectorAll(`select`);
  const allFiltersInput = formFilters.querySelectorAll(`input`);

  const adForm = document.querySelector(`.ad-form`);
  const adFormAllFieldset = adForm.querySelectorAll(`fieldset`);

  const startPointX = mapPinMain.offsetLeft;
  const startPointY = mapPinMain.offsetTop;

  const onSuccessDownloadData = (response) => {
    const offers = [];

    response.forEach((object) => {
      offers.push(object);
    });

    window.pin.renderPins(offers);
  };

  const onErrorDownloadData = window.dialog.onErrorDownloadBlock;

  const activateBookingPage = () => {
    window.load.downloadData(onSuccessDownloadData, onErrorDownloadData);

    mapBlock.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);

    allFiltersSelect.forEach((element) => {
      element.disabled = false;
    });

    allFiltersInput.forEach((element) => {
      element.disabled = false;
    });

    adFormAllFieldset.forEach((element) => {
      element.disabled = false;
    });

    mapPinMain.removeEventListener(`mousedown`, onMainPinMousedown);
    mapPinMain.removeEventListener(`keydown`, onMainPinKeydown);

    mapPinMain.style.left = startPointX + `px`;
    mapPinMain.style.top = startPointY + `px`;

    window.form.setAddressField();
  };

  const deactivateBookingPage = () => {
    mapBlock.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);

    allFiltersSelect.forEach((element) => {
      element.disabled = true;
    });

    allFiltersInput.forEach((element) => {
      element.disabled = true;
    });

    adFormAllFieldset.forEach((element) => {
      element.disabled = true;
    });

    mapPinMain.addEventListener(`mousedown`, onMainPinMousedown);
    mapPinMain.addEventListener(`keydown`, onMainPinKeydown);
  };

  const onMainPinMousedown = (evt) => {
    if (evt.button === 0) {
      if (mapBlock.classList.contains(`map--faded`)) {
        activateBookingPage();
      }
    }
  };

  const onMainPinKeydown = (evt) => {
    if (evt.key === `Enter`) {
      if (mapBlock.classList.contains(`map--faded`)) {
        activateBookingPage();
      }
    }
  };

  deactivateBookingPage();

  // window.status = {
  //   // activateBookingPage,
  //   // deactivateBookingPage,
  //   // onMainPinMousedown,
  //   // onMainPinKeydown
  // };
})();
