'use strict';

(() => {
  const onErrorDownloadBlock = (errorMessage) => {
    const node = document.createElement(`div`);

    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const onSuccessUploadBlock = () => {
    window.console.log(`форма отправлено`);
  };

  const onErrorUploadBlock = () => {
    window.console.log(`ошибка при отправки формы`);
  };

  window.dialog = {
    onErrorDownloadBlock,
    onSuccessUploadBlock,
    onErrorUploadBlock
  };
})();
