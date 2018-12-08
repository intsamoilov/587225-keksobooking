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
var KeyCode = {
  ESC: 27,
  ENTER: 13
};
var OFFER_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'];
var mapTypeToValues = {
  palace: {
    name: 'Дворец',
    price: 10000
  },
  flat: {
    name: 'Квартира',
    price: 1000
  },
  house: {
    name: 'Дом',
    price: 5000
  },
  bungalo: {
    name: 'Бунгало',
    price: 0
  }
};
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TIMES = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
// ----------------------------------------------------------------------------
var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adress = document.querySelector('#address');
var roomCapacity = document.getElementById('capacity');
var roomNumber = document.getElementById('room_number');
var type = document.getElementById('type');
var price = document.getElementById('price');
var timeIn = document.getElementById('timein');
var timeOut = document.getElementById('timeout');
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
  var card = document.querySelector('.map__card');
  if (card) {
    card.querySelector('.popup__close').removeEventListener('click', onPopupCloseClick);
    document.removeEventListener('keydown', onEscKeyDown);
    card.remove();
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
  cardTemplate.querySelector('.popup__type').textContent = mapTypeToValues[card.offer.type].name;
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
var onEscKeyDown = function (evt) {
  if (evt.keyCode === KeyCode.ESC) {
    hideCard();
  }
};
// ----------------------------------------------------------------------------
var showCard = function (cardContent) {
  document.querySelector('.map').insertBefore(cardContent,
      document.querySelector('.map__filters-container'));
  var card = document.querySelector('.map__card');
  var popupCloseBtn = card.querySelector('.popup__close');
  popupCloseBtn.addEventListener('click', onPopupCloseClick);
  document.addEventListener('keydown', onEscKeyDown);
};
// ----------------------------------------------------------------------------
var renderCard = function (card) {
  hideCard();
  showCard(createCard(card));
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
    if (evt.keyCode === KeyCode.ENTER) {
      renderCard(card);
    }
  });
};
// ----------------------------------------------------------------------------
var getMainPinCoordinates = function (offsetX, offsetY) {
  var x = mainPin.offsetLeft + offsetX;
  var y = mainPin.offsetTop + offsetY;
  return x + ', ' + y;
};
// ----------------------------------------------------------------------------
var setAddressToForm = function (offsetX, offsetY) {
  adress.value = getMainPinCoordinates(offsetX, offsetY);
  adress.disabled = true;
};
// ----------------------------------------------------------------------------
var setSiteActive = function () {
  if (map.classList.contains('map--faded')) {
    var adCards = getDataArray();
    setFormElementsNonActive(false);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    renderPins(adCards);
    addFormListeners();
  }
};
// ----------------------------------------------------------------------------
var endCoord = {};
var shift = {};
var startCoord = {};
// ----------------------------------------------------------------------------
var onMouseMove = function (moveEvt) {
  shift.x = startCoord.x - moveEvt.clientX;
  shift.y = startCoord.y - moveEvt.clientY;
  startCoord.x = moveEvt.clientX;
  startCoord.y = moveEvt.clientY;
  endCoord.x = mainPin.offsetLeft - shift.x;
  endCoord.y = mainPin.offsetTop - shift.y;
  if (endCoord.x > PIN_MAX_X - PIN_MAIN_WIDTH / 2) {
    endCoord.x = PIN_MAX_X - PIN_MAIN_WIDTH / 2;
  } else if (endCoord.x < PIN_MIN_X - PIN_MAIN_WIDTH / 2) {
    endCoord.x = PIN_MIN_X - PIN_MAIN_WIDTH / 2;
  }
  if (endCoord.y > PIN_MAX_Y - PIN_MAIN_HEIGHT) {
    endCoord.y = PIN_MAX_Y - PIN_MAIN_HEIGHT;
  } else if (endCoord.y < PIN_MIN_Y - PIN_MAIN_HEIGHT) {
    endCoord.y = PIN_MIN_Y - PIN_MAIN_HEIGHT;
  }
  mainPin.style.left = endCoord.x + 'px';
  mainPin.style.top = endCoord.y + 'px';
};
// ----------------------------------------------------------------------------
var onMouseUp = function () {
  setSiteActive();
  setAddressToForm(PIN_MAIN_WIDTH / 2, PIN_MAIN_HEIGHT);
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
};
// ----------------------------------------------------------------------------
var onMainPinMousedown = function (evt) {
  startCoord.x = evt.clientX;
  startCoord.y = evt.clientY;
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};
// ----------------------------------------------------------------------------
var setSiteNonActive = function () {
  setFormElementsNonActive(true);
  setAddressToForm(PIN_MAIN_WIDTH / 2, PIN_MAIN_HEIGHT / 2);
  mainPin.addEventListener('mousedown', onMainPinMousedown);
};
// ----------------------------------------------------------------------------
var setPriceByType = function (evt) {
  price.min = mapTypeToValues[evt.value].price;
  price.placeholder = mapTypeToValues[evt.value].price;
};
// ----------------------------------------------------------------------------
var setTimeInOut = function (evt) {
  if (evt === timeIn) {
    timeOut.value = timeIn.value;
  } else {
    timeIn.value = timeOut.value;
  }
};
// ----------------------------------------------------------------------------
var setGuestsValidityByRooms = function (evt) {
  var options = roomCapacity.querySelectorAll('option');
  options.forEach(function (item) {
    item.disabled = true;
  });
  if (evt.value === '100') {
    options[0].disabled = false;
  } else {
    for (var i = evt.value; i > 0; i--) {
      options[i].disabled = false;
    }
  }
  checkCapasity();
};
// ----------------------------------------------------------------------------
var checkCapasity = function () {
  if (roomCapacity.value > roomNumber.value) {
    roomCapacity.setCustomValidity('Укажите правильное количество гостей');
  } else if (roomCapacity.value === '0' && roomNumber.value !== '100') {
    roomCapacity.setCustomValidity('Добавьте гостей');
  } else if (roomNumber.value === '100' && roomCapacity.value !== '0') {
    roomCapacity.setCustomValidity('Уберите гостей');
  } else {
    roomCapacity.setCustomValidity('');
    roomCapacity.style = '';
  }
};
// ----------------------------------------------------------------------------
var formElementsInvalidHandler = function (evt) {
  evt.target.style.border = '3px solid red';
};
// ----------------------------------------------------------------------------
var formElementsChangeHandler = function (evt) {
  if (evt.target.validity.valid) {
    evt.target.style = '';
  }
  switch (evt.target) {
    case timeIn:
      setTimeInOut(evt.target);
      break;
    case timeOut:
      setTimeInOut(evt.target);
      break;
    case type:
      setPriceByType(evt.target);
      break;
    case roomNumber:
      setGuestsValidityByRooms(evt.target);
      break;
    case roomCapacity:
      checkCapasity();
      break;
  }
};
// ----------------------------------------------------------------------------
var addFormListeners = function () {
  var form = document.querySelector('.ad-form');
  form.addEventListener('change', formElementsChangeHandler, true);
  form.addEventListener('invalid', formElementsInvalidHandler, true);
};
// ----------------------------------------------------------------------------
setSiteNonActive();
// ----------------------------------------------------------------------------
