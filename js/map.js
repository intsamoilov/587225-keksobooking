'use strict';
(function () {
  var map = document.querySelector('.map');

  var setSiteNonActive = function () {
    map.classList.add('map--faded');
    window.popup.hideCard();
    window.pins.removePins();
    window.pointer.setToStart();
    window.variables.adForm.reset();
    window.variables.filter.reset();
    window.variables.adForm.classList.add('ad-form--disabled');
    window.form.setFormElementsNonActive(true);
    window.form.setAddressToForm(window.pointer.mainPin, window.pointer.PIN_MAIN_WIDTH / 2, window.pointer.PIN_MAIN_HEIGHT / 2);
    window.pointer.mainPin.addEventListener('mousedown', window.pointer.onMainPinMousedown);
    window.pointer.init(setSiteActive, checkCoord);
  };

  var setSiteActive = function () {
    window.form.setAddressToForm(window.pointer.mainPin, window.pointer.PIN_MAIN_WIDTH / 2, window.pointer.PIN_MAIN_HEIGHT);
    if (map.classList.contains('map--faded')) {
      window.data.getDataArray();
      window.form.setFormElementsNonActive(false);
      map.classList.remove('map--faded');
      window.variables.adForm.classList.remove('ad-form--disabled');
      window.filter.addFilterListeners();
      window.form.addFormListeners();
      window.form.resetAction(setSiteNonActive);
    }
  };

  var checkCoord = function (endCoord) {
    if (endCoord.x > window.variables.PIN_MAX_X - window.pointer.PIN_MAIN_WIDTH) {
      endCoord.x = window.variables.PIN_MAX_X - window.pointer.PIN_MAIN_WIDTH;
    } else if (endCoord.x < window.variables.PIN_MIN_X) {
      endCoord.x = window.variables.PIN_MIN_X;
    }
    if (endCoord.y > window.variables.PIN_MAX_Y - window.pointer.PIN_MAIN_HEIGHT) {
      endCoord.y = window.variables.PIN_MAX_Y - window.pointer.PIN_MAIN_HEIGHT;
    } else if (endCoord.y < window.variables.PIN_MIN_Y - window.pointer.PIN_MAIN_HEIGHT) {
      endCoord.y = window.variables.PIN_MIN_Y - window.pointer.PIN_MAIN_HEIGHT;
    }
    return endCoord;
  };

  setSiteNonActive();
})();
