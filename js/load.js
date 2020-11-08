'use strict';

const RECEIVER_URL = `https://21.javascript.pages.academy/keksobooking/data`;
const SENDER_URL = `https://21.javascript.pages.academy/keksobooking`;

const TIMEOUT_IN_MS = 10000;

const StatusCode = {
  OK: 200
};

const createXhr = (method, url, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + ` мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;
  xhr.open(method, url);
  return xhr;
};

const downloadData = (onSuccess, onError) => {
  createXhr(`GET`, RECEIVER_URL, onSuccess, onError).send();
};

const uploadData = (data, onSuccess, onError) => {
  createXhr(`POST`, SENDER_URL, onSuccess, onError).send(data);
};

window.load = {
  downloadData,
  uploadData
};
