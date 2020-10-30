'use strict';

(() => {
  const onSuccess = () => {
    window.console.log(`форма отправлено`);
  };

  // const onError = () => {
  //   window.console.log(`ошибка при отправки формы`);
  // };

  window.dialog = {
    onSuccess,
    // onError
  };
})();
