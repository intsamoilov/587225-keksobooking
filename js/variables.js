'use strict';
(function () {
  var LOAD_SERVER_URL = 'https://js.dump.academy/keksobooking/data';
  var UPLOAD_SERVER_URL = 'https://js.dump.academy/keksobooking';
  var successMessage = 'Ваше объявление отправлено!';
  var errorMessage = 'Ошибка загрузки. Код ошибки: ';
  var PIN_MIN_Y = 130;
  var PIN_MAX_Y = 630;
  var PIN_MIN_X = 300;
  var PIN_MAX_X = 1200;
  var AD_COUNT = 5;
  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };
  var mapTypeToValues = {
    palace: {
      name: 'Дворец',
      price: 10000
    },
    flat: {
      name: 'Квартира',
      price: 1000
    },
    house: {
      name: 'Дом',
      price: 5000
    },
    bungalo: {
      name: 'Бунгало',
      price: 0
    }
  };
  var adForm = document.querySelector('.ad-form');
  var filter = document.querySelector('.map__filters');

  window.variables = {
    PIN_MIN_Y: PIN_MIN_Y,
    PIN_MAX_Y: PIN_MAX_Y,
    PIN_MIN_X: PIN_MIN_X,
    PIN_MAX_X: PIN_MAX_X,
    KeyCode: KeyCode,
    mapTypeToValues: mapTypeToValues,
    LOAD_SERVER_URL: LOAD_SERVER_URL,
    UPLOAD_SERVER_URL: UPLOAD_SERVER_URL,
    adForm: adForm,
    filter: filter,
    successMessage: successMessage,
    errorMessage: errorMessage,
    AD_COUNT: AD_COUNT
  };
})();
