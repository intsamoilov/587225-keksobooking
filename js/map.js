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
  // ----------------------------------------------------------------------------
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  // ----------------------------------------------------------------------------
  var setFormElementsNonActive = function (option) {
    var formElements = document.querySelectorAll('.ad-form fieldset');
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = option;
    }
  };
  // ----------------------------------------------------------------------------
  var setSiteNonActive = function () {
    setFormElementsNonActive(true);
    window.pointer.setAddressToForm(window.pointer.PIN_MAIN_WIDTH / 2, window.pointer.PIN_MAIN_HEIGHT / 2);
    window.pointer.mainPin.addEventListener('mousedown', window.pointer.onMainPinMousedown);
  };
  // ----------------------------------------------------------------------------
  window.map = {
    PIN_MIN_Y: PIN_MIN_Y,
    PIN_MAX_Y: PIN_MAX_Y,
    PIN_MIN_X: PIN_MIN_X,
    PIN_MAX_X: PIN_MAX_X,
    KeyCode: KeyCode,
    // ------------------------------------------------------------------------
    mapTypeToValues: mapTypeToValues,
    // ------------------------------------------------------------------------
    setSiteActive: function () {
      if (map.classList.contains('map--faded')) {
        var adCards = window.data.getDataArray();
        setFormElementsNonActive(false);
        map.classList.remove('map--faded');
        adForm.classList.remove('ad-form--disabled');
        window.pins.renderPins(adCards);
        window.form.addFormListeners();
      }
    }
  };
  // ----------------------------------------------------------------------------
  setSiteNonActive();
})();
