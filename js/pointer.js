'use strict';
(function () {
  var MAIN_PIN_START_LEFT = '570px';
  var MAIN_PIN_START_TOP = '375px';
  var endCoord = {};
  var shift = {};
  var startCoord = {};
  var callbackSite;
  var callbackCoord;
  var mainPin = document.querySelector('.map__pin--main');
  // --------------------------------------------------------------------------
  var onMouseMove = function (moveEvt) {
    shift.x = startCoord.x - moveEvt.clientX;
    shift.y = startCoord.y - moveEvt.clientY;
    startCoord.x = moveEvt.clientX;
    startCoord.y = moveEvt.clientY;
    endCoord.x = mainPin.offsetLeft - shift.x;
    endCoord.y = mainPin.offsetTop - shift.y;
    endCoord = callbackCoord(endCoord);
    mainPin.style.left = endCoord.x + 'px';
    mainPin.style.top = endCoord.y + 'px';
  };
  // --------------------------------------------------------------------------
  var onMouseUp = function () {
    callbackSite();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  // --------------------------------------------------------------------------
  window.pointer = {
    mainPin: mainPin,
    onMainPinMousedown: function (evt) {
      startCoord.x = evt.clientX;
      startCoord.y = evt.clientY;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    // ------------------------------------------------------------------------
    setToStart: function () {
      mainPin.style.left = MAIN_PIN_START_LEFT;
      mainPin.style.top = MAIN_PIN_START_TOP;
    },
    // ------------------------------------------------------------------------
    init: function (setSiteActive, checkCoord) {
      callbackSite = setSiteActive;
      callbackCoord = checkCoord;
    }
    // ------------------------------------------------------------------------
  };
})();
