'use strict';

const mainBlock = document.querySelector(`main`);

// onErrorDownloadDialog
const onErrorDownloadDialog = (errorMessage) => {
  const node = document.createElement(`div`);

  node.style.zIndex = 100;
  node.style.margin = `0 auto`;
  node.style.textAlign = `center`;
  node.style.backgroundColor = `red`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `30px`;

  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

// onSuccessUploadDialog
const onSuccessUploadDialog = () => {
  const successDialogTemplate = document.querySelector(`#success`).content;
  const clonedSuccessDialog = successDialogTemplate.cloneNode(true);

  mainBlock.insertBefore(clonedSuccessDialog, window.map.mapBlock);

  const successDialogContainer = mainBlock.querySelector(`.success`);
  const successDialog = mainBlock.querySelector(`.success__message`);

  const onSuccessMouseClose = (evt) => {
    if (evt.target === successDialogContainer || evt.target === successDialog) {
      successDialogContainer.remove();
      successDialogContainer.removeEventListener(`click`, onSuccessMouseClose);
      document.removeEventListener(`keydown`, onSuccessEscClose);
    }
  };

  const onSuccessEscClose = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      successDialogContainer.remove();
      successDialogContainer.removeEventListener(`click`, onSuccessMouseClose);
      document.removeEventListener(`keydown`, onSuccessEscClose);
    }
  };

  successDialogContainer.addEventListener(`click`, onSuccessMouseClose);
  document.addEventListener(`keydown`, onSuccessEscClose);
  window.form.resetAdForm();
};

// onErrorUploadDialog
const onErrorUploadDialog = () => {
  const errorDialogTemplate = document.querySelector(`#error`).content;
  const clonedErrorDialog = errorDialogTemplate.cloneNode(true);

  mainBlock.insertBefore(clonedErrorDialog, window.map.mapBlock);

  const errorDialogContainer = mainBlock.querySelector(`.error`);
  const errorDialog = mainBlock.querySelector(`.error__message`);
  const errorButton = mainBlock.querySelector(`.error__button`);

  const onErrorMouseClose = (evt) => {
    if (evt.target === errorDialogContainer || evt.target === errorDialog || evt.target === errorButton) {
      errorDialogContainer.remove();
      errorDialogContainer.removeEventListener(`click`, onErrorMouseClose);
      document.removeEventListener(`keydown`, onErrorEscClose);
    }
  };

  const onErrorEscClose = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      errorDialogContainer.remove();
      errorDialogContainer.removeEventListener(`click`, onErrorMouseClose);
      document.removeEventListener(`keydown`, onErrorEscClose);
    }
  };

  errorDialogContainer.addEventListener(`click`, onErrorMouseClose);
  document.addEventListener(`keydown`, onErrorEscClose);
};

window.dialog = {
  onErrorDownloadDialog,
  onSuccessUploadDialog,
  onErrorUploadDialog
};
