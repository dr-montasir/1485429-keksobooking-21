'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const adForm = document.querySelector(`.ad-form`);
const adFormAvatarInput = adForm.querySelector(`.ad-form-header__input`);
const adFormAvatarPreview = adForm.querySelector(`.ad-form-header__preview img`);
const adFormPhotoInput = adForm.querySelector(`#images`);
const adFormPhoto = adForm.querySelector(`.ad-form__photo`);

const resetPhotosUpload = () => {
  const defaultAvatarPreviewSrc = `img/muffin-grey.svg`;
  const img = adFormPhoto.querySelector(`img`);

  if (adFormAvatarPreview.src !== defaultAvatarPreviewSrc) {
    adFormAvatarPreview.src = defaultAvatarPreviewSrc;
    adFormAvatarInput.value = ``;
  }

  if (img) {
    adFormPhoto.removeChild(img);
    adFormPhotoInput.value = ``;
  }
};

const onAvatarUpload = (evt) => {
  const file = evt.target.files[0];

  const isImage = FILE_TYPES.some((ending) => {
    return file.name.toLowerCase().endsWith(ending);
  });

  if (isImage) {
    const reader = new FileReader();
    reader.addEventListener(`load`, () => {
      adFormAvatarPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

const onPhotoUpload = (evt) => {
  const file = evt.target.files[0];

  const isImage = FILE_TYPES.some((ending) => {
    return file.name.toLowerCase().endsWith(ending);
  });

  if (isImage) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      const photoPreview = document.createElement(`img`);

      photoPreview.src = reader.result;
      adFormPhoto.innerHTML = ``;
      adFormPhoto.style.display = `flex`;
      photoPreview.style.margin = `auto`;
      photoPreview.style.maxWidth = `70px`;
      photoPreview.style.maxHeight = `70px`;
      adFormPhoto.append(photoPreview);
    });

    reader.readAsDataURL(file);
  }
};

adFormAvatarInput.addEventListener(`change`, onAvatarUpload);

adFormPhotoInput.addEventListener(`change`, onPhotoUpload);

window.photos = {
  resetPhotosUpload
};
