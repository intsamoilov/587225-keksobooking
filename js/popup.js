'use strict';
(function () {
  var OFFER_IMAGE_WIDTH = 45;
  var OFFER_IMAGE_HEIGHT = 40;
  var OFFER_IMAGE_ALT = 'Фотография жилья';
  // --------------------------------------------------------------------------
  var onEscKeyDown = function (evt) {
    if (evt.keyCode === window.variables.KeyCode.ESC) {
      window.popup.hideCard();
    }
  };
  // --------------------------------------------------------------------------
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
  // --------------------------------------------------------------------------
  var renderFeatures = function (card, element) {
    element.querySelector('.popup__features').innerHTML = '';
    for (var i = 0; i < card.offer.features.length; i++) {
      var li = document.createElement('li');
      li.classList.add('popup__feature');
      li.classList.add('popup__feature--' + card.offer.features[i]);
      element.querySelector('.popup__features').appendChild(li);
    }
  };
  // --------------------------------------------------------------------------
  var createCard = function (card) {
    var cardTemplate = document.querySelector('#card').content.cloneNode(true);
    if (card.offer.title) {
      cardTemplate.querySelector('.popup__title').textContent = card.offer.title;
    } else {
      cardTemplate.querySelector('.popup__title').remove();
    }
    if (card.offer.address) {
      cardTemplate.querySelector('.popup__text--address').textContent = card.offer.address;
    } else {
      cardTemplate.querySelector('.popup__text--address').remove();
    }
    if (card.offer.price) {
      cardTemplate.querySelector('.popup__text--price').textContent = card.offer.price;
    } else {
      cardTemplate.querySelector('.popup__text--price').remove();
    }
    if (card.offer.type) {
      cardTemplate.querySelector('.popup__type').textContent = window.variables.MapTypeToValues[card.offer.type].name;
    } else {
      cardTemplate.querySelector('.popup__type').remove();
    }
    if (card.offer.rooms && card.offer.guests) {
      cardTemplate.querySelector('.popup__text--capacity').textContent =
        card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    } else {
      cardTemplate.querySelector('.popup__text--capacity').remove();
    }
    if (card.offer.checkin && card.offer.checkout) {
      cardTemplate.querySelector('.popup__text--time').textContent =
        'Заезд после ' + card.offer.checkin + ' выезд до ' + card.offer.checkout;
    } else {
      cardTemplate.querySelector('.popup__text--time').remove();
    }
    if (card.offer.features) {
      renderFeatures(card, cardTemplate);
    } else {
      cardTemplate.querySelector('.popup__features').remove();
    }
    if (card.offer.description) {
      cardTemplate.querySelector('.popup__description').textContent = card.offer.description;
    } else {
      cardTemplate.querySelector('.popup__description').remove();
    }
    if (card.offer.photos) {
      renderPhotos(card, cardTemplate);
    } else {
      cardTemplate.querySelector('.popup__photos').remove();
    }
    if (card.author.avatar) {
      cardTemplate.querySelector('.popup__avatar').src = card.author.avatar;
    } else {
      cardTemplate.querySelector('.popup__avatar').remove();
    }
    return cardTemplate;
  };
  // --------------------------------------------------------------------------
  var showCard = function (cardContent) {
    document.querySelector('.map').insertBefore(cardContent,
        document.querySelector('.map__filters-container'));
    var card = document.querySelector('.map__card');
    var popupCloseBtn = card.querySelector('.popup__close');
    popupCloseBtn.addEventListener('click', onPopupCloseClick);
    document.addEventListener('keydown', onEscKeyDown);
  };
  // --------------------------------------------------------------------------
  var onPopupCloseClick = function () {
    window.popup.hideCard();
  };
  // --------------------------------------------------------------------------
  window.popup = {
    renderCard: function (card) {
      window.popup.hideCard();
      showCard(createCard(card));
    },
    // ------------------------------------------------------------------------
    hideCard: function () {
      var card = document.querySelector('.map__card');
      if (card) {
        card.querySelector('.popup__close').removeEventListener('click', onPopupCloseClick);
        document.removeEventListener('keydown', onEscKeyDown);
        card.remove();
      }
    }
  };
})();
