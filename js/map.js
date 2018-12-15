'use strict';
(function () {
  var PIN_MAIN_WIDTH = 50;
  var PIN_MAIN_HEIGHT = 70;
  // ----------------------------------------------------------------------------
  var map = document.querySelector('.map');
  // ----------------------------------------------------------------------------
  var setSiteNonActive = function () {
    map.classList.add('map--faded');
    window.popup.hideCard();
    window.pins.removePins();
    window.pointer.setToStart();
    window.variables.adForm.reset();
    window.variables.adForm.classList.add('ad-form--disabled');
    window.form.setFormElementsNonActive(true);
    window.form.setAddressToForm(window.pointer.mainPin, PIN_MAIN_WIDTH / 2, PIN_MAIN_HEIGHT / 2);
    window.pointer.mainPin.addEventListener('mousedown', window.pointer.onMainPinMousedown);
    window.pointer.init(setSiteActive, checkCoord);
  };
  // ----------------------------------------------------------------------------
  var setSiteActive = function () {
    window.form.setAddressToForm(window.pointer.mainPin, PIN_MAIN_WIDTH / 2, PIN_MAIN_HEIGHT);
    if (map.classList.contains('map--faded')) {
      window.data.getDataArray();
      window.form.setFormElementsNonActive(false);
      map.classList.remove('map--faded');
      window.variables.adForm.classList.remove('ad-form--disabled');
      window.form.addFormListeners();
      window.form.resetAction(setSiteNonActive);
    }
  };
  // ----------------------------------------------------------------------------
  var checkCoord = function (endCoord) {
    if (endCoord.x > window.variables.PIN_MAX_X - PIN_MAIN_WIDTH / 2) {
      endCoord.x = window.variables.PIN_MAX_X - PIN_MAIN_WIDTH / 2;
    } else if (endCoord.x < window.variables.PIN_MIN_X - PIN_MAIN_WIDTH / 2) {
      endCoord.x = window.variables.PIN_MIN_X - PIN_MAIN_WIDTH / 2;
    }
    if (endCoord.y > window.variables.PIN_MAX_Y - PIN_MAIN_HEIGHT) {
      endCoord.y = window.variables.PIN_MAX_Y - PIN_MAIN_HEIGHT;
    } else if (endCoord.y < window.variables.PIN_MIN_Y - PIN_MAIN_HEIGHT) {
      endCoord.y = window.variables.PIN_MIN_Y - PIN_MAIN_HEIGHT;
    }
    return endCoord;
  };
  // ----------------------------------------------------------------------------
  setSiteNonActive();
})();
