'use strict';

(() => {
  const onSuccess = () => {
    window.console.log(`форма отправлено`);
  };

  window.success = {
    onSuccess
  };
})();
