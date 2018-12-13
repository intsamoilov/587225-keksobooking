'use strict';
(function () {
  var PIN_MIN_Y = 130;
  var PIN_MAX_Y = 630;
  var PIN_MIN_X = 300;
  var PIN_MAX_X = 900;
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
  window.variables = {
    PIN_MIN_Y: PIN_MIN_Y,
    PIN_MAX_Y: PIN_MAX_Y,
    PIN_MIN_X: PIN_MIN_X,
    PIN_MAX_X: PIN_MAX_X,
    KeyCode: KeyCode,
    mapTypeToValues: mapTypeToValues
  };
})();
