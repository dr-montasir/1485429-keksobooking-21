'use strict';

(() => {
  // onErrorDownloadDialog
  const onErrorDownloadDialog = (errorMessage) => {
    const node = document.createElement(`div`);

    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
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
  };

  // onErrorUploadDialog
  const onErrorUploadDialog = () => {
    window.console.log(`ошибка при отправки формы`);
  };

  window.dialog = {
    onErrorDownloadDialog,
    onSuccessUploadDialog,
    onErrorUploadDialog
  };
})();
