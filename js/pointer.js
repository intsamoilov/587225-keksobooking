'use strict';
(function () {
  var PIN_MAIN_WIDTH = 50;
  var PIN_MAIN_HEIGHT = 70;
  var endCoord = {};
  var shift = {};
  var startCoord = {};
  var mainPin = document.querySelector('.map__pin--main');
  var adress = document.querySelector('#address');
  // --------------------------------------------------------------------------
  var onMouseMove = function (moveEvt) {
    shift.x = startCoord.x - moveEvt.clientX;
    shift.y = startCoord.y - moveEvt.clientY;
    startCoord.x = moveEvt.clientX;
    startCoord.y = moveEvt.clientY;
    endCoord.x = mainPin.offsetLeft - shift.x;
    endCoord.y = mainPin.offsetTop - shift.y;
    if (endCoord.x > window.map.PIN_MAX_X - PIN_MAIN_WIDTH / 2) {
      endCoord.x = window.map.PIN_MAX_X - PIN_MAIN_WIDTH / 2;
    } else if (endCoord.x < window.map.PIN_MIN_X - PIN_MAIN_WIDTH / 2) {
      endCoord.x = window.map.PIN_MIN_X - PIN_MAIN_WIDTH / 2;
    }
    if (endCoord.y > window.map.PIN_MAX_Y - PIN_MAIN_HEIGHT) {
      endCoord.y = window.map.PIN_MAX_Y - PIN_MAIN_HEIGHT;
    } else if (endCoord.y < window.map.PIN_MIN_Y - PIN_MAIN_HEIGHT) {
      endCoord.y = window.map.PIN_MIN_Y - PIN_MAIN_HEIGHT;
    }
    mainPin.style.left = endCoord.x + 'px';
    mainPin.style.top = endCoord.y + 'px';
  };
  // --------------------------------------------------------------------------
  var onMouseUp = function () {
    window.map.setSiteActive();
    window.pointer.setAddressToForm(PIN_MAIN_WIDTH / 2, PIN_MAIN_HEIGHT);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  // --------------------------------------------------------------------------
  var getMainPinCoordinates = function (offsetX, offsetY) {
    var x = mainPin.offsetLeft + offsetX;
    var y = mainPin.offsetTop + offsetY;
    return x + ', ' + y;
  };
  // --------------------------------------------------------------------------
  window.pointer = {
    onMainPinMousedown: function (evt) {
      startCoord.x = evt.clientX;
      startCoord.y = evt.clientY;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    setAddressToForm: function (offsetX, offsetY) {
      adress.value = getMainPinCoordinates(offsetX, offsetY);
      adress.disabled = true;
    },
    mainPin: mainPin,
    PIN_MAIN_WIDTH: PIN_MAIN_WIDTH,
    PIN_MAIN_HEIGHT: PIN_MAIN_HEIGHT
    // ------------------------------------------------------------------------
  };
})();
