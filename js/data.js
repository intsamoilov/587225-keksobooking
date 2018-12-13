'use strict';
(function () {
  var AD_COUNT = 8;
  var MAX_ROOMS = 5;
  var MAX_GUESTS = 15;
  var PRICE_MIN = 1000;
  var PRICE_MAX = 1000000;
  var OFFER_TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'];
  var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var OFFER_TIMES = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  // --------------------------------------------------------------------------
  window.data = {
    getDataArray: function () {
      var result = [];
      var authors = [];
      for (var j = 0; j < AD_COUNT; j++) {
        authors[j] = 'img/avatars/user0' + (j + 1) + '.png';
      }
      authors = window.service.getShuffleArray(authors);
      var randomTitles = window.service.getShuffleArray(OFFER_TITLES);
      for (var i = 0; i < AD_COUNT; i++) {
        var posX = window.service.getRandomNum(window.variables.PIN_MIN_X, window.variables.PIN_MAX_X)
          - Math.round(window.pins.PIN_WIDTH / 2);
        var posY = window.service.getRandomNum(window.variables.PIN_MIN_Y, window.variables.PIN_MAX_Y)
          - window.pins.PIN_HEIGHT;
        result.push({
          author: {
            image: authors[i]
          },
          offer: {
            title: randomTitles[i],
            address: posX + ', ' + posY,
            price: window.service.getRandomNum(PRICE_MIN, PRICE_MAX) + ' ₽/ночь',
            type: OFFER_TYPES[window.service.getRandomNum(0, OFFER_TYPES.length - 1)],
            rooms: window.service.getRandomNum(1, MAX_ROOMS),
            guests: window.service.getRandomNum(1, MAX_GUESTS),
            checkin: OFFER_TIMES[window.service.getRandomNum(0, OFFER_TIMES.length - 1)],
            checkout: OFFER_TIMES[window.service.getRandomNum(0, OFFER_TIMES.length - 1)],
            features: window.service.getCutArray(OFFER_FEATURES),
            description: '',
            photos: window.service.getShuffleArray(OFFER_PHOTOS)
          },
          location: {
            x: posX,
            y: posY
          }
        });
      }
      return result;
    }
  };
})();
