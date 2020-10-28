'use strict';

(() => {
  const receiveOffersData = (receiveData, catchError) => {

    receiveData = window.load.downloadData;
    catchError = window.errors.errorHandler;

    const offers = [];

    receiveData((response) => {

      response.map((object) => {
        offers.push(object);
      });

    }, catchError);

    return offers;
  };

  window.data = {
    receiveOffersData
  };
})();
