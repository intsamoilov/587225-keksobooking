'use strict';
// ----------------------------------------------------------------------------
var AD_COUNT = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_IMG_WIDTH = 40;
var PIN_IMG_HEIGHT = 40;
var PIN_MAIN_WIDTH = 50;
var PIN_MAIN_HEIGHT = 70;
var PIN_MIN_Y = 130;
var PIN_MAX_Y = 630;
var PIN_MIN_X = 300;
var PIN_MAX_X = 900;
var PIN_ALT = 'Метка объявления';
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var MAX_ROOMS = 5;
var MAX_GUESTS = 15;
var OFFER_IMAGE_WIDTH = 45;
var OFFER_IMAGE_HEIGHT = 40;
var OFFER_IMAGE_ALT = 'Фотография жилья';
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var OFFER_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'];
var mapTypeToName = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'};
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TIMES = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
// ----------------------------------------------------------------------------
var getRandomNum = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
// ----------------------------------------------------------------------------
var getFeatures = function (array) {
  var cutArray = [];
  var sortArrey = getShuffleArray(array);
  var index = getRandomNum(0, array.length - 1);
  for (var i = 0; i <= index; i++) {
    cutArray[i] = sortArrey[i];
  }
  return cutArray;
};
// ----------------------------------------------------------------------------
var getShuffleArray = function (array) {
  var randomArray = [];
  for (var i = 0; i < array.length; i++) {
    var index = getRandomNum(1, array.length);
    randomArray[i] = array[index - 1];
    for (var j = 0; j < i; j++) {
      if (randomArray[j] === randomArray[i]) {
        delete randomArray[i];
        i--;
      }
    }
  }
  return randomArray;
};
// ----------------------------------------------------------------------------
var renderFeatures = function (card, element) {
  element.querySelector('.popup__features').innerHTML = '';
  for (var i = 0; i < card.offer.features.length; i++) {
    var li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--' + card.offer.features[i]);
    element.querySelector('.popup__features').appendChild(li);
  }
};
// ----------------------------------------------------------------------------
var renderPhotos = function (card, element) {
  element.querySelector('.popup__photos').innerHTML = '';
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
// ----------------------------------------------------------------------------
var hideCard = function () {
  var domElement = document.querySelector('.map__card');
  if (domElement) {
    domElement.querySelector('.popup__close').removeEventListener('click', onPopupCloseClick);
    domElement.remove();
  }
};
// ----------------------------------------------------------------------------
var onPopupCloseClick = function () {
  hideCard();
};
// ----------------------------------------------------------------------------
var createCard = function (card) {
  var cardTemplate = document.querySelector('#card').content.cloneNode(true);
  cardTemplate.querySelector('.popup__title').textContent = card.offer.title;
  cardTemplate.querySelector('.popup__text--address').textContent = card.offer.address;
  cardTemplate.querySelector('.popup__text--price').textContent = card.offer.price;
  cardTemplate.querySelector('.popup__type').textContent = mapTypeToName[card.offer.type];
  cardTemplate.querySelector('.popup__text--capacity').textContent =
    card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardTemplate.querySelector('.popup__text--time').textContent =
    'Заезд после ' + card.offer.checkin + ' выезд до ' + card.offer.checkout;
  renderFeatures(card, cardTemplate);
  cardTemplate.querySelector('.popup__description').textContent = card.offer.description;
  renderPhotos(card, cardTemplate);
  cardTemplate.querySelector('.popup__avatar').src = card.author.image;
  return cardTemplate;
};
// ----------------------------------------------------------------------------
var showCard = function (cardContent) {
  document.querySelector('.map').insertBefore(cardContent,
      document.querySelector('.map__filters-container'));
  var element = document.querySelector('.map__card');
  var popupCloseBtn = element.querySelector('.popup__close');
  popupCloseBtn.addEventListener('click', onPopupCloseClick);
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      hideCard();
    }
  });
};
// ----------------------------------------------------------------------------
var renderCard = function (card) {
  hideCard();
  var cardContent = createCard(card);
  showCard(cardContent);
};
// ----------------------------------------------------------------------------
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
// ----------------------------------------------------------------------------
var renderPins = function (cards) {
  var fragment = document.createDocumentFragment();
  var pin = document.querySelector('.map__pins');
  for (var i = 0; i < cards.length; i++) {
    fragment = createPin(cards[i], fragment);
  }
  pin.appendChild(fragment);
};
// ----------------------------------------------------------------------------
var getDataArray = function () {
  var result = [];
  var authors = [];
  for (var j = 0; j < AD_COUNT; j++) {
    authors[j] = 'img/avatars/user0' + (j + 1) + '.png';
  }
  authors = getShuffleArray(authors);
  var randomTitles = getShuffleArray(OFFER_TITLES);
  for (var i = 0; i < AD_COUNT; i++) {
    var posX = getRandomNum(PIN_MIN_X, PIN_MAX_X) - Math.round(PIN_WIDTH / 2);
    var posY = getRandomNum(PIN_MIN_Y, PIN_MAX_Y) - PIN_HEIGHT;
    result.push({
      author: {
        image: authors[i]
      },
      offer: {
        title: randomTitles[i],
        address: posX + ', ' + posY,
        price: getRandomNum(PRICE_MIN, PRICE_MAX) + ' ₽/ночь',
        type: OFFER_TYPES[getRandomNum(0, OFFER_TYPES.length - 1)],
        rooms: getRandomNum(1, MAX_ROOMS),
        guests: getRandomNum(1, MAX_GUESTS),
        checkin: OFFER_TIMES[getRandomNum(0, OFFER_TIMES.length - 1)],
        checkout: OFFER_TIMES[getRandomNum(0, OFFER_TIMES.length - 1)],
        features: getFeatures(OFFER_FEATURES),
        description: '',
        photos: getShuffleArray(OFFER_PHOTOS)
      },
      location: {
        x: posX,
        y: posY
      }
    });
  }
  return result;
};
// ----------------------------------------------------------------------------
var setFormElementsNonActive = function (option) {
  var formElements = document.querySelectorAll('.ad-form fieldset');
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].disabled = option;
  }
};
// ----------------------------------------------------------------------------
var addPinClickHandler = function (pin, card) {
  pin.addEventListener('click', function () {
    renderCard(card);
  });
};
// ----------------------------------------------------------------------------
var addPinKeyHandler = function (pin, card) {
  pin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      renderCard(card);
    }
  });
};
// ----------------------------------------------------------------------------
var getMainPinCoordinates = function (offsetX, offsetY) {
  var mainPin = document.querySelector('.map__pin--main');
  var x = mainPin.offsetLeft + offsetX;
  var y = mainPin.offsetTop + offsetY;
  return x + ', ' + y;
};
// ----------------------------------------------------------------------------
var setAddressToForm = function (offsetX, offsetY) {
  var adress = document.querySelector('#address');
  adress.value = getMainPinCoordinates(offsetX, offsetY);
  adress.disabled = true;
};
// ----------------------------------------------------------------------------
var setSiteActive = function () {
  var map = document.querySelector('.map');
  var adCards = getDataArray();
  var adForm = document.querySelector('.ad-form');
  setFormElementsNonActive(false);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  renderPins(adCards);
};
// ----------------------------------------------------------------------------
var onMainPinMouseup = function () {
  setAddressToForm(PIN_MAIN_WIDTH / 2, PIN_MAIN_HEIGHT);
};
// ----------------------------------------------------------------------------
var onMainPinClick = function (evt) {
  setSiteActive();
  evt.currentTarget.removeEventListener('click', onMainPinClick);
};
// ----------------------------------------------------------------------------
var setSiteNonActive = function () {
  var mainPin = document.querySelector('.map__pin--main');
  setFormElementsNonActive(true);
  setAddressToForm(PIN_MAIN_WIDTH / 2, PIN_MAIN_HEIGHT / 2);
  mainPin.addEventListener('mouseup', onMainPinMouseup);
  mainPin.addEventListener('click', onMainPinClick);
};
// ----------------------------------------------------------------------------
setSiteNonActive();
// ----------------------------------------------------------------------------
