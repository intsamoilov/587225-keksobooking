'use strict';
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PIN_IMG_WIDTH = 40;
  var PIN_IMG_HEIGHT = 40;
  var PIN_ALT = 'Метка объявления';
  // --------------------------------------------------------------------------
  var addPinClickHandler = function (pin, card) {
    pin.addEventListener('click', function () {
      window.popup.renderCard(card);
    });
  };
  // --------------------------------------------------------------------------
  var addPinKeyHandler = function (pin, card) {
    pin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.map.KeyCode.ENTER) {
        window.popup.renderCard(card);
      }
    });
  };
  // --------------------------------------------------------------------------
  var createPin = function (card, fragment) {
    var div = document.createElement('div');
    var img = document.createElement('img');
    div.classList.add('map__pin');
    div.style.left = card.location.x + 'px';
    div.style.top = card.location.y + 'px';
    div.tabIndex = 0;
    img.classList.add('rounded');
    img.src = card.author.image;
    img.alt = PIN_ALT;
    img.width = PIN_IMG_WIDTH;
    img.height = PIN_IMG_HEIGHT;
    div.appendChild(img);
    fragment.appendChild(div);
    addPinClickHandler(div, card);
    addPinKeyHandler(div, card);
    return fragment;
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
        fragment = createPin(cards[i], fragment);
      }
      pin.appendChild(fragment);
    }
  };
})();
