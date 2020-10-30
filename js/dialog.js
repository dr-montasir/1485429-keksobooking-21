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

    // window.console.log(`форма отправлено`);
    // window.console.log(successDialogTemplate);
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
