'use strict';
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  // --------------------------------------------------------------------------
  var addPinClickHandler = function (pin, card) {
    pin.addEventListener('click', function () {
      window.popup.renderCard(card);
    });
  };
  // --------------------------------------------------------------------------
  var addPinKeyHandler = function (pin, card) {
    pin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.variables.KeyCode.ENTER) {
        window.popup.renderCard(card);
      }
    });
  };
  // --------------------------------------------------------------------------
  window.pins = {
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    // ------------------------------------------------------------------------
    renderPins: function (cards) {
      var fragment = document.createDocumentFragment();
      var pin = document.querySelector('.map__pins');
      for (var i = 0; i < cards.length; i++) {
        fragment = window.pin.createPin(cards[i], fragment);
      }
      pin.appendChild(fragment);
    },
    // ------------------------------------------------------------------------
    removePins: function () {
      var pinsArr = document.querySelectorAll('.map__pin');
      pinsArr.forEach(function (item) {
        if (!item.classList.contains('map__pin--main')) {
          item.remove();
        }
      });
    },
    // ------------------------------------------------------------------------
    addPinClickHandler: addPinClickHandler,
    addPinKeyHandler: addPinKeyHandler
  };
})();
