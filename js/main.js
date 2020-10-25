'use strict';

const mapBlock = document.querySelector(`.map`);
const mapPinMain = document.querySelector(`.map__pin--main`);
// const pinBlock = mapBlock.querySelector(`.map__pins`);  //
const formFilters = document.querySelector(`.map__filters`);
const allFiltersSelect = formFilters.querySelectorAll(`select`);
const allFiltersInput = formFilters.querySelectorAll(`input`);

const adForm = document.querySelector(`.ad-form`);
const adFormAllFieldset = adForm.querySelectorAll(`fieldset`);

// Здесь я пишу код активации cтраницы Кексобукинга (форма и карта)
const activateBookingPage = () => {
  mapBlock.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  window.pin.renderPins(offers);

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
};

// Здесь я пишу код деактивации cтраницы Кексобукинга (форма и карта)
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

// конец закомментированой части в модуле 4 задача 1//

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
const offers = window.data.generateOffers();
window.form.setAddressField();
window.form.validateAdForm();
