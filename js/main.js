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

  window.array = [];

  const onSuccessDownloadData = (response) => {
    let offers = [];

    response.forEach((object) => {
      offers.push(object);
    });

    window.pin.renderPins(offers);

    window.array = offers;
  };

  const onErrorDownloadData = window.dialog.onErrorDownloadDialog;

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

    window.form.setAddressField();
  };

  const deactivateBookingPage = () => {
    const mapPins = mapBlock.querySelectorAll(`.map__pin:not(.map__pin--main)`);
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

    mapPins.forEach((element) => {
      element.remove();
    });

    // Удалите карту, если она открыта
    window.popup.removeCard();

    mapPinMain.style.left = startPointX + `px`;
    mapPinMain.style.top = startPointY + `px`;

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

  window.main = {
    onSuccessDownloadData,
    deactivateBookingPage
  };
})();
