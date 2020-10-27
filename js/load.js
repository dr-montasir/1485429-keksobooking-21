'use strict';

(() => {
  const receiverURL = `https://21.javascript.pages.academy/keksobooking/data`;

  const StatusCode = {
    OK: 200
  };

  const downloadData = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.open(`GET`, receiverURL);

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Произошла ошибка при загрузке данных`);
      }
    });

    xhr.send();
  };

  window.load = {
    downloadData
  };
})();
