'use strict';
(function () {
  var PIN_IMG_WIDTH = 40;
  var PIN_IMG_HEIGHT = 40;
  var PIN_ALT = 'Метка объявления';

  window.pin = {
    createPin: function (card, fragment) {
      var div = document.createElement('div');
      var img = document.createElement('img');
      div.classList.add('map__pin');
      div.style.left = (card.location.x - Math.round(window.pins.PIN_WIDTH / 2)) + 'px';
      div.style.top = (card.location.y - window.pins.PIN_HEIGHT) + 'px';
      div.tabIndex = 0;
      img.classList.add('rounded');
      img.src = card.author.avatar;
      img.alt = PIN_ALT;
      img.width = PIN_IMG_WIDTH;
      img.height = PIN_IMG_HEIGHT;
      div.appendChild(img);
      fragment.appendChild(div);
      window.pins.addPinClickHandler(div, card);
      window.pins.addPinKeyHandler(div, card);
      return fragment;
    }
  };
})();
