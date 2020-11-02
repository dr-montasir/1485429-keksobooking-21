'use strict';

(() => {
  // onErrorDownloadDialog
  const onErrorDownloadDialog = (errorMessage) => {
    const node = document.createElement(`div`);

    // node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;

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
    const mainBlock = document.querySelector(`main`);

    const createSuccessDialogTemplate = () => {
      const successDialogTemplate = document.querySelector(`#success`).content;
      const successDialogFragment = document.createDocumentFragment();

      const clonedSuccessDialog = successDialogTemplate.cloneNode(true);
      successDialogFragment.appendChild(clonedSuccessDialog);

      return successDialogFragment;
    };

    const successDialogTemplate = createSuccessDialogTemplate();

    mainBlock.insertBefore(successDialogTemplate, window.map.mapBlock);

    const successDialogContainer = document.querySelector(`.success`);
    const successDialog = document.querySelector(`.success__message`);

    const onSuccessMouseClose = successDialogContainer.addEventListener(`click`, (evt) => {
      if (evt.target === successDialogContainer || evt.target === successDialog) {
        successDialogContainer.remove();
        document.removeEventListener(`mousedown`, onSuccessMouseClose);
      }
    });

    const onSuccessEscClose = (evt) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        successDialogContainer.remove();
        document.removeEventListener(`keydown`, onSuccessEscClose);
      }
    };

    document.addEventListener(`keydown`, onSuccessEscClose);

    // Задача module6-task2
    // 2. После успешной передачи данных на сервер верните страницу в неактивное состояние и сбросьте форму.

    // document.querySelector(`.ad-form`).reset();
    // window.main.deactivateBookingPage();
    // Или
    window.form.resetAdForm();
  };

  // onSuccessUploadDialog
  const onErrorUploadDialog = () => {
    const mainBlock = document.querySelector(`main`);

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
