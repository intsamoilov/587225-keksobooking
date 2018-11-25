'use strict';
//----------------------------------------------------------------------------
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_IMG_WIDTH = 40;
var PIN_IMG_HEIGHT = 40;
var PIN_MIN_Y = 200;
var PIN_MAX_Y = 630;
var PIN_MIN_X = 300;
var PIN_MAX_X = 900;
var PIN_ALT = 'Метка объявления';
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var MAX_ROOMS = 5;
var OFFER_IMAGE_WIDTH = 45;
var OFFER_IMAGE_HEIGHT = 40;
var OFFER_IMAGE_ALT = 'Фотография жилья';
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
//----------------------------------------------------------------------------
var getRandomNum = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
//----------------------------------------------------------------------------
var getFeatures = function (array) {
  var cutArray = [];
  var sortArrey = getRandomArray(array);
  var index = getRandomNum(0, array.length-1);
  for (var i = 0; i <= index; i++) {
    cutArray[i] = sortArrey[i];
  }
  return cutArray;
}
//----------------------------------------------------------------------------
var getRandomArray = function (array) {
  var randomArray = [];
  for (var i = 0; i < array.length; i++) {
  var index = getRandomNum(1, array.length);
  randomArray[i] = array[index-1];
    for (var j = 0; j < i; j++) {
      if (randomArray[j] === randomArray[i]) {
        delete randomArray[i];
        i--;
      }
    }
  }
  return randomArray;
};
//----------------------------------------------------------------------------
var renderFeatures = function (card, element) {
  while(element.querySelector('.popup__feature')) {
    element.querySelector('.popup__feature').remove();
  }
  for (var i = 0; i < card.offer.features.length; i++) {
    var li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--' + card.offer.features[i]);
    element.querySelector('.popup__features').appendChild(li);
  }
};
//----------------------------------------------------------------------------
var renderPhotos = function (card, element) {
  while(element.querySelector('.popup__photo')) {
    element.querySelector('.popup__photo').remove();
  }
  for (var i = 0; i < card.offer.photos.length; i++) {
    var img = document.createElement('img');
    img.classList.add('.popup__photo');
    img.src = card.offer.photos[i];
    img.width = OFFER_IMAGE_WIDTH;
    img.height = OFFER_IMAGE_HEIGHT;
    img.alt = OFFER_IMAGE_ALT;
    element.querySelector('.popup__photos').appendChild(img);
  }
};
//----------------------------------------------------------------------------
var renderCard = function (card) {
  var cardTemplate = document.querySelector('#card').content.cloneNode(true);
  cardTemplate.querySelector('.popup__title').textContent = card.offer.title;
  cardTemplate.querySelector('.popup__text--address').textContent = card.offer.address;
  cardTemplate.querySelector('.popup__text--price').textContent = card.offer.price;
  cardTemplate.querySelector('.popup__type').textContent = card.offer.type;
  cardTemplate.querySelector('.popup__text--capacity').textContent =
    card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardTemplate.querySelector('.popup__text--time').textContent =
    'Заезд после ' + card.offer.checkin + ' выезд до ' + card.offer.checkout;
  renderFeatures(card, cardTemplate);
  cardTemplate.querySelector('.popup__description').textContent = card.offer.description;
  renderPhotos(card, cardTemplate);
  cardTemplate.querySelector('.popup__avatar').src = card.author.image;
  document.querySelector('.map').insertBefore(cardTemplate,
    document.querySelector('.map__filters-container'));

};
//----------------------------------------------------------------------------
var renderPins = function (cards) {
  var fragment = document.createDocumentFragment();
  var pin = document.querySelector('.map__pins');
  for (var i = 0; i < cards.length; i ++) {
    var div = document.createElement('div');
    var img = document.createElement('img');
    div.classList.add('map__pin');
    div.style.left = cards[i].location.x + 'px';
    div.style.top = cards[i].location.y + 'px';
    img.classList.add('rounded');
    img.src = cards[i].author.image;
    img.alt = PIN_ALT;
    img.width = PIN_IMG_WIDTH;
    img.height = PIN_IMG_HEIGHT;
    div.appendChild(img);
    fragment.appendChild(div);
  }
  pin.appendChild(fragment);
};
//----------------------------------------------------------------------------
  var getDataArray = function (count) {
  var result = [];
  var randomTitles = [];

  randomTitles = getRandomArray(OFFER_TITLES);
  for (var i = 1; i <= count; i++) {
    var posX = getRandomNum(PIN_MIN_X, PIN_MAX_X) - Math.round(PIN_WIDTH / 2);
    var posY = getRandomNum(PIN_MIN_Y, PIN_MAX_Y) - PIN_HEIGHT;
    result.push({
      author: {
        image: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title: randomTitles[i-1],
        address: posX + ', ' + posY,
        price: getRandomNum(PRICE_MIN, PRICE_MAX) + ' ₽/ночь',
        type: OFFER_TYPES[getRandomNum(1, OFFER_TYPES.length) - 1],
        rooms: getRandomNum(1, MAX_ROOMS),
        guests: getRandomNum(1, 15),
        checkin: OFFER_TIMES[getRandomNum(1, OFFER_TIMES.length) - 1],
        checkout: OFFER_TIMES[getRandomNum(1, OFFER_TIMES.length) - 1],
        features: getFeatures(OFFER_FEATURES),
        description: '',
        photos: getRandomArray(OFFER_PHOTOS)
      },
      location: {
        x: posX,
        y: posY
      }
    });
  }
  return result;
};
//----------------------------------------------------------------------------
var initiate = function () {
  var adCount = 8;
  var adCards = [];
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
  adCards = getDataArray(adCount);
  renderPins(adCards);
  renderCard(adCards[0]);
};
//----------------------------------------------------------------------------
initiate();
//----------------------------------------------------------------------------
