'use strict';

(() => {
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
    const createErrorDialogTemplate = () => {
      const errorDialogTemplate = document.querySelector(`#error`).content;
      const errorDialogFragment = document.createDocumentFragment();

      const clonedErrorDialog = errorDialogTemplate.cloneNode(true);
      errorDialogFragment.appendChild(clonedErrorDialog);

      return errorDialogFragment;
    };

    const errorDialogTemplate = createErrorDialogTemplate();

    mainBlock.insertBefore(errorDialogTemplate, window.map.mapBlock);

    const errorDialogContainer = document.querySelector(`.error`);
    const errorDialog = document.querySelector(`.error__message`);
    const errorButton = document.querySelector(`.error__button`);

    const onErrorMouseClose = errorDialogContainer.addEventListener(`click`, (evt) => {
      if (evt.target === errorDialogContainer || evt.target === errorDialog || evt.target === errorButton) {
        errorDialogContainer.remove();
        document.removeEventListener(`mousedown`, onErrorMouseClose);
      }
    });

    const onErrorEscClose = (evt) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        errorDialogContainer.remove();
        document.removeEventListener(`keydown`, onErrorEscClose);
      }
    };

    document.addEventListener(`keydown`, onErrorEscClose);
  };

  window.dialog = {
    onErrorDownloadDialog,
    onSuccessUploadDialog,
    onErrorUploadDialog
  };
})();
